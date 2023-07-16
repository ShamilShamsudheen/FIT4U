const User = require('../models/user/userModel')
const Trainer = require('../models/trainer/trainerModel')

module.exports ={
    logIn:async(req,res) =>{
        try {
            const emailAdmin = 'admin@gmail.com';
            const passAdmin = 'admin'
            if(emailAdmin === req.body.values.email && passAdmin ===req.body.values.pass){
                res.json({status:true,message:'Login Successfully'})
            }else{
                res.json({status:false,message:'Login Failed'})
            }

        } catch (error) {
            cosnole.log(error.message)
        }
    },
    userData:async (req,res) =>{
        try {
            console.log('userData');
            const userDetails = await User.find()
            res.json({userDetails});
        } catch (error) {
            console.log(error.message)
        }
    },
    trainerData:async (req,res) =>{
        try {
            const trainerDetails = await Trainer.find()
            res.json({trainerDetails});
        } catch (error) {
            console.log(error.message)
        }
    },

}