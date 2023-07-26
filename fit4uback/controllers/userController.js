require('dotenv').config()
const bcrypt = require('bcrypt');
const User = require('../models/user/userModel')
const jwt = require('jsonwebtoken')
const Trainer = require('../models/trainer/trainerModel')
const Purchase = require('../models/purchase/purchaseModel')
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
      console.log('login')
      console.log(req.body)
      let userData = await User.findOne({ email: req.body.values.email })
      console.log(userData + "userData")
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
      console.log(req.body.userJwtToken)
      userToken = req.body.userJwtToken
      if (userToken) {
        jwt.verify(userToken, process.env.JWT_SECRET_KEY, async (err, decoded) => {
          if (err) {
            console.log('Token verification failed:', err.message);
          } else {
            console.log('Decoded token:', decoded);
            const userData = await User.findById(decoded.id).exec();
            console.log(userData);
            res.json({ userData })
          }
        })
      }
    } catch (error) {
      console.log(error.message)
    }
  },
  trainersList: async (req, res) => {
    try {
      const approvedTrainer = await Trainer.find({ isApproved: true })
      console.log(approvedTrainer);
      if (approvedTrainer) {
        res.json({ status: true, approvedTrainer })
      } else {
        res.json({ status: false })
      }
    } catch (error) {
      console.log(error.message)
    }
  },
  profile: async (req, res) => {
    console.log(req.body)
    try {
      const userId = req.body.id
      updateFields = {
        age: req.body.values.age,
        height: req.body.values.height,
        weight: req.body.values.weight,
        goal: req.body.values.goal
      }
      await User.findByIdAndUpdate(userId, updateFields, { new: true })
        .then((updatedUser) => {
          if (!updatedUser) {
            console.log('User not found');
          } else {
            console.log('Updated User:', updatedUser);
            res.json({ updatedUser, message: 'Details updated Successfully..' })
          }
        })
        .catch((error) => {
          console.log('Error:', error.message);
        });
    } catch (error) {
      console.log(error.message)
    }
  },
  profileImageUpload: async (req, res) => {
    try {
      const userId = req.body.id
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
      // console.log(req.body.trainerId);
      const trainerId = req.body.trainerId;
      const trainerData = await Trainer.findById(trainerId);
      const priceId = trainerData.price; // Price in your currency (e.g., INR)

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
  paymentConformation: async (req, res) => {
    try {
      const { trainerId, userId, session } = req.body;
      const userData = await User.findById(userId);
      const trainerData = await Trainer.findById(trainerId);
      console.log(session)
      const currentDate = new Date();
  
      // Add one month to the current date
      const oneMonthLater = new Date(currentDate);
      oneMonthLater.setMonth(currentDate.getMonth() + 1);
  
      const purchase = new Purchase({
        purchase_id: session.id,
        purchase_amount: 1000,
        purchase_date: currentDate,
        purchase_expire: oneMonthLater,
        trainer_id: trainerId,
        user_id: userId,
      });
  
      await purchase.save();
      res.json({ message: 'Payment', status: true });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


}