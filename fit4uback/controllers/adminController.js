require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user/userModel')
const Trainer = require('../models/trainer/trainerModel')
const Purchase = require('../models/purchase/purchaseModel')
const Blog = require('../models/blog/blogModel')
const Workout = require('../models/workout/workout');

module.exports = {
    logIn: async (req, res) => {
        try {
            const emailAdmin = 'admin@gmail.com';
            const passAdmin = process.env.ADMIN_PASSWORD
            const username = 'admin'
            if (emailAdmin === req.body.values.email && passAdmin === req.body.values.pass) {
                let token = jwt.sign(
                    { id: process.env.ADMIN_ID ,username},
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
                res.json({ status: false, message: 'Login Failed' })
            }

        } catch (error) {
            console.log(error.message)
        }
    },
    userData: async (req, res) => {
        try {
            const userDetails = await User.find()
            res.json({ userDetails });
        } catch (error) {
            console.log(error.message)
        }
    },
    userBlock: async (req, res) => {
        try {
            const userId = req.body.userId;
            const user = await User.findById(userId);
            user.isBlocked = !user.isBlocked;
            await user.save()
            if (user.isBlocked) {

                res.status(200).json({ status: true, message: 'Trainer Approved Successfully' })
            } else {
                res.status(200).json({ status: false, message: 'Trainer Approval Cancelled' })
            }
        } catch (error) {
            console.log(error.message)
        }
    },
    trainerData: async (req, res) => {
        try {
            const trainerDetails = await Trainer.find()
            res.json({ trainerDetails });
        } catch (error) {
            console.log(error.message)
        }
    },
    trainerApproval: async (req, res) => {
        try {
            console.log(req.body.trainerId);
            const trainerId = req.body.trainerId;
            const trainer = await Trainer.findById(trainerId);
            trainer.isApproved = !trainer.isApproved;
            await trainer.save()
            if (trainer.isApproved) {

                res.status(200).json({ status: true, message: 'Trainer Approved Successfully' })
            } else {
                res.status(200).json({ status: false, message: 'Trainer Approval Cancelled' })
            }
        } catch (error) {
            console.log(error.message);
        }
    },
    paymentData: async (req, res) => {
        try {
            console.log('object')
            const paymentDetails = await Purchase.find()
            console.log(paymentDetails)

            res.json({ paymentDetails});
        } catch (error) {
            console.log("payment error", error.message)
        }
    },
    blogData: async (req, res) => {
        try {
            const blogDetails = await Blog.find()
            res.json({ blogDetails })
        } catch (error) {
            console.log("Error", error.message)
        }
    },
    workoutData: async (req, res) => {
        try {
            const workoutDetails = await Workout.find()
            res.status(200).json({ workoutDetails })
        } catch (error) {
            console.log("Error", error.message)
        }
    },
    userName: async(req,res)=>{
        try {
            const {id} = req.params
            const user = await User.findOne({_id:id})
            res.json({name:user.name})
        } catch (error) {
            console.log(error.message)
        }
    },
    trainerName: async(req,res)=>{
        try {
            const {id} = req.params
            const trainer = await Trainer.findOne({_id:id})
            res.json({name:trainer.name})
        } catch (error) {
            console.log(error.message)
        }
    },
    singleBlog: async(req,res) =>{
        console.log(req.params,'blog')
        try {
            const {id} = req.params
            const blogData = await Blog.findOne({_id:id})
            res.json({blog:blogData})
            
        } catch (error) {
            console.log(error.message)
        }
    },
    singleWorkout: async(req,res)=>{
        console.log(req.params,'workout')
        try {
            const {id} = req.params
            const workoutData = await Workout.findOne({_id:id})
            res.json({workout:workoutData})
            
        } catch (error) {
            console.log(error.message)
        }
    }
}