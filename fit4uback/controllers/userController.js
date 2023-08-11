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
      const userEmail = await User.findOne({ email: body.email })
      if (userEmail) {
        res.json({ message: 'This email already exist', status: false })
      } else {
        if (req.body.otp) {

          password = body.pass
          const secPass = await bcrypt.hash(password, 5)
          const userData = new User({
            name: body.name,
            email: body.email,
            mobile: body.mob,
            password: secPass,
            role: body.role
          })
          console.log(userData)
          await userData.save();
          res.json({ message: 'Your account has been created successfully', status: true })
        } else {
          res.json({ status: true, message: 'Email verified successfully' })
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  },
  logIn: async (req, res) => {
    try {
      let userData = await User.findOne({ email: req.body.values.email })
      if (!userData.isBlocked) {

        const passMatch = await bcrypt.compare(req.body.values.pass, userData.password)
        if (passMatch) {
          const username = userData.name;
          let token = jwt.sign(
            { id: userData._id, role: userData.role },
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
  PersonalTrainer: async(req,res)=>{
    try {
      const userId = req.user.id;

    //  console.log(userId)
      const payment = await Purchase.findOne({ user_id:userId });
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
  chat: async(req,res)=>{
    try {
      console.log(req.body)
      const {trainer,message} = req.body
      const {id} = req.user
      if(!req.body.chatId) {
        // create chat 
        const newChat = new Chat({
          participants: [id,trainer],
          lastMessege:message
        })
        const chatData = await newChat.save();

        // create message
        const newMessage = new Message({
          chat:chatData._id,
          sender:id,
          receiver:trainer,
          message:message

        })
        const messageData = await newMessage.save()

        await Chat.findByIdAndUpdate(
          {_id:chatData._id},
          {$push:{messages:messageData._id}}
          )

      }else {

      }
    } catch (error) {
      console.log(error.message)
    }
  },
  getChat: async(req,res)=> {
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
          lastMessage: chat.lastMessege
        };
      }));
  
      res.json({ chatTrainerData });
    } catch (error) {
      console.error('Error retrieving chat data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

}