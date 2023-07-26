const User = require('../models/user/userModel')
const Trainer = require('../models/trainer/trainerModel')
const Purchase = require('../models/purchase/purchaseModel')

module.exports = {
    logIn: async (req, res) => {
        try {
            const emailAdmin = 'admin@gmail.com';
            const passAdmin = 'admin'
            if (emailAdmin === req.body.values.email && passAdmin === req.body.values.pass) {
                res.json({ status: true, message: 'Login Successfully' })
            } else {
                res.json({ status: false, message: 'Login Failed' })
            }

        } catch (error) {
            cosnole.log(error.message)
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
            const paymentDetails = await Purchase.find()
            res.json({ paymentDetails });
        } catch (error) {
            console.log(error.message)
        }
    },
}