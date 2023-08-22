require('dotenv').config()
const bcrypt = require('bcrypt');
const User = require('../models/user/userModel')
const jwt = require('jsonwebtoken')
const Trainer = require('../models/trainer/trainerModel')
const Purchase = require('../models/purchase/purchaseModel')
const Blog = require('../models/blog/blogModel')
const Workout = require('../models/workout/workout');
const Chat = require('../models/chat/chat');
const Message = require('../models/message/message');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


module.exports = {
  signUp: async (req, res) => {
    try {
      const body = req.body.values;
      console.log(body);
      const userEmail = await User.findOne({ email: body.email });

      if (userEmail) {
        return res.json({ message: 'This email already exists', status: false });
      } else {
        if (req.body.otp) {
          let password = body.pass; // Declare the password variable

          const secPass = await bcrypt.hash(password, 5);
          const userData = new User({
            name: body.name,
            email: body.email,
            mobile: body.mob,
            password: secPass,
            role: body.role
          });

          console.log(userData);
          await userData.save();

          return res.json({ message: 'Your account has been created successfully', status: true });
        }
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: 'An error occurred', status: false });
    }
  },

  logIn: async (req, res) => {
    try {
      if (req.body.profileObj) {
        console.log(req.body.profileObj);
        const { name, email, googleId } = req.body.profileObj;

        // Check if the user with the given email already exists in the database
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          // User exists, generate a token and send it to the frontend
          const username = existingUser.name;
          const token = jwt.sign(
            { id: existingUser._id, role: existingUser.role, username },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
          );

          return res.json({
            message: 'Login Successfully',
            status: true,
            token,
            username,
          });
        } else {
          // User doesn't exist, create a new user account

          // Hash the password (using googleId as the password in this case)
          const password = googleId;
          const secPass = await bcrypt.hash(password, 5);

          // Create a new user document
          const userData = new User({
            name,
            email,
            mobile: "9947014527",
            password: secPass,
            role: "user",
          });

          // Save the new user to the database
          await userData.save();

          // Generate a token for the newly created user and send it to the frontend
          const username = userData.name;
          const token = jwt.sign(
            { id: userData._id, role: userData.role, username },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
          );

          return res.json({
            message: 'Account created and logged in successfully',
            status: true,
            token,
            username,
          });
        }
      }
      let userData = await User.findOne({ email: req.body.values.email })
      if (!userData.isBlocked) {

        const passMatch = await bcrypt.compare(req.body.values.pass, userData.password)
        if (passMatch) {
          const username = userData.name;
          let token = jwt.sign(
            { id: userData._id, role: userData.role, username },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
          );
          res.json({
            message: 'Login Successfully',
            status: true,
            token,
            username
          })
        } else {
          res.json({ status: false, message: 'Password incorrect' })
        }
      } else {
        console.log('not login');
        res.json({ status: false, message: 'Email Blocked' })
      }
    } catch (error) {
      console.log(error.message)
    }
  },
  tokenCheck: async (req, res) => {
    try {
      res.json({ status: true })
    } catch (error) {

    }
  },
  postLogin: async (req, res) => {
    try {
      const { id } = req.user;

      const userData = await User.findById(id);

      if (!userData) {
        return res.status(404).json({ message: 'UserData not found' });
      }

      return res.status(200).json({ userData });
    } catch (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).json({ message: 'An error occurred while fetching user data' });
    }
  },
  trainersList: async (req, res) => {
    try {

      const approvedTrainer = await Trainer.find({ isApproved: true })
      // console.log(approvedTrainer);
      if (approvedTrainer) {
        console.log(approvedTrainer)
        res.json({ status: true, approvedTrainer })
      } else {
        res.json({ status: false })
      }
    } catch (error) {
      console.log(error.message)
    }
  },
  profileUpdate: async (req, res) => {
    try {
      const { age, height, weight, goal } = req.body.values;
      const { id } = req.user;

      const user = await User.findByIdAndUpdate(
        { _id: id },
        { age, height, weight, goal },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
      console.error('Error updating profile:', error);
      return res.status(500).json({ message: 'An error occurred while updating profile' });
    }
  },

  profileImageUpload: async (req, res) => {
    try {
      const userId = req.user.id
      updateFields = {
        profileImg: req.body.profileUrl
      }
      await User.findByIdAndUpdate(userId, updateFields, { new: true })
        .then((updateProfile) => {
          if (!updateProfile) {
            console.log('User not found');
          } else {
            console.log('Updated User:', updateProfile);
            res.json({ updateProfile, message: 'profile image updated..' })
          }
        })
        .catch((error) => {
          console.log('Error:', error.message);
        });
    } catch (error) {
      console.log(error.message)
    }
  },

  payment: async (req, res) => {
    try {
      const userId = req.user.id
      const trainerId = req.body.trainerId;
      const trainerData = await Trainer.findById(trainerId);
      const userData = await User.findById(userId);
      const priceId = trainerData.price;
      const username = userData.name
      const trainername = trainerData.name
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'INR', // Replace 'inr' with your desired currency code
              unit_amount: priceId * 100, // Convert price to smallest currency unit (e.g., cents)
              product_data: {
                name: 'Trainer Selection', // Replace with the name of the product or description
              },
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:5173/trainerList',
        cancel_url: 'http://localhost:5173/trainerList',
        metadata: {
          trainerId: trainerId,
          userId: userId,
          username: username,
          trainername: trainername,
        },
      });
      // console.log(session);
      if (session.url) {

      }
      res.json({ session, message: "Payment successfull" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'An error occurred while processing the payment.' });
    }
  },
  blogList: async (req, res) => {
    try {
      const blogData = await Blog.find()
      console.log(blogData)
      res.status(200).json({ blogData })
    } catch (error) {
      console.log('Error', error.message)
    }
  },
  singleBlog: async (req, res) => {
    try {
      const { blogId } = req.params
      const blogData = await Blog.findById({ _id: blogId })
      if (!blogData) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.json({ blogData });

    } catch (error) {
      console.log('Error', error.message)
      res.status(500).json({ error: 'Server error' });
    }
  },
  singleTrainer: async (req, res) => {
    try {
      const { trainerId } = req.params
      const trainerData = await Trainer.findById({ _id: trainerId })
      if (!trainerData) {
        return res.status(404).json({ error: 'Trainer not found' });
      }
      res.json({ trainerData });
    } catch (error) {
      console.log('Error', error.message)
      res.status(500).json({ error: 'Server error' });
    }
  },
  workouts: async (req, res) => {
    try {
      const { id } = req.user;
      const paymentDetails = await Purchase.findOne({ user_id: id });

      if (!paymentDetails) {
        return res.json({ message: 'You have not selected any user' });
      }

      const { trainer_id } = paymentDetails;
      const workoutDetails = await Workout.findOne({ trainer_id });

      return res.json({ workoutDetails });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  personalTrainer: async (req, res) => {
    try {
      const userId = req.user.id;

      //  console.log(userId)
      const payment = await Purchase.findOne({ user_id: userId });
      // console.log(payment)
      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
      }
      const trainerId = payment.trainer_id

      res.status(200).json({ trainerId });
    } catch (error) {
      console.error('Error finding payment:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  chat: async (req, res) => {
    try {
      console.log(req.body)
      const { trainer, message, chatId } = req.body
      const { id } = req.user
      if (!chatId) {
        // create chat 
        const newChat = new Chat({
          participants: [id, trainer],
          lastMessege: message
        })
        const chatData = await newChat.save();

        // create message
        const newMessage = new Message({
          chat: chatData._id,
          sender: id,
          receiver: trainer,
          message: message

        })
        const messageData = await newMessage.save()

        await Chat.findByIdAndUpdate(
          { _id: chatData._id },
          { $push: { messages: messageData._id } }
        )

      } else {
        // create message
        const newMessage = new Message({
          chat: chatId,
          sender: id,
          receiver: trainer,
          message: message

        })
        const messageData = await newMessage.save()
        await Chat.findByIdAndUpdate(
          chatId,
          {
            $set: { lastMessege: message },
            $push: { messages: messageData._id }
          }
        );
      }
    } catch (error) {
      console.log(error.message)
    }
  },
  getChat: async (req, res) => {
    try {
      const userId = req.user.id;

      // Find chat data involving the user
      const chatData = await Chat.find({
        participants: { $in: [userId] }
      });

      // Use Promise.all to fetch trainer data for each chat
      const chatTrainerData = await Promise.all(chatData.map(async (chat) => {
        const receiverId = chat.participants.find(memberId => memberId.toString() !== userId);
        const trainer = await Trainer.findById(receiverId);

        return {
          trainerId: trainer._id,
          trainer: {
            image: trainer.profileImg,
            email: trainer.email,
            trainerName: trainer.name
          },
          chatId: chat._id,
          lastMessage: chat.lastMessege,
          time: chat.timestamp
        };
      }));

      res.json({ chatTrainerData });
    } catch (error) {
      console.error('Error retrieving chat data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  chatMessage: async (req, res) => {
    try {
      const { chatId } = req.params;

      // Use findById to find the chat message by its ID
      const chatData = await Chat.findById(chatId);
      console.log(chatData)
      const messageData = await Promise.all(chatData.messages.map(async (messege) => {
        return (
          await Message.findById({ _id: messege })
        )
      }))
      console.log(messageData)
      if (!chatData) {
        return res.status(404).json({ error: 'Chat message not found' });
      }

      // Return the chat message
      res.json({ messageData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  paymentHistory: async (req, res) => {
    try {
      const { id } = req.user;
      const payments = await Purchase.find({ user_id: id });
      if (payments.length === 0) {
        return res.status(404).json({ message: 'No payment history found for the user.' });
      }
      return res.status(200).json({ payments, status: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  },
}