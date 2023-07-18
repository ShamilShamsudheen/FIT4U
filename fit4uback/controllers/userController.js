require('dotenv').config()
const bcrypt = require('bcrypt');
const User = require('../models/user/userModel')
const jwt = require('jsonwebtoken')
const Trainer = require('../models/trainer/trainerModel')


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
    logIn: async (req,res)=> {
        try {
            console.log('login')
            console.log(req.body)
            let userData = await User.findOne({email:req.body.values.email})
            console.log(userData+"userData")
            if(userData.isBlocked){

                const passMatch = await bcrypt.compare(req.body.values.pass,userData.password)
                if(passMatch){
                    const username = userData.name;
                    let token = jwt.sign(
                        {id: userData._id , role:userData.role},
                        process.env.JWT_SECRET_KEY,
                        {expiresIn:"1d"}
                    );
                    res.json({
                        message:'Login Successfully',
                        status:true,
                        token,
                        username
                    })
                }else{
                    res.json({status:false,message:'Password incorrect'})
                }
            }else{
                console.log('not login');
                res.json({status:false,message:'Email Blocked'})
            }
        } catch (error) {
            console.log(error.message)
        }
    },
    postLogin:async (req,res) =>{
        try {
            console.log(req.body.userJwtToken)
            userToken = req.body.userJwtToken
            if(userToken){
                jwt.verify(userToken,process.env.JWT_SECRET_KEY,async (err,decoded)=>{
                    if(err) {
                        console.log('Token verification failed:', err.message);
                    }else {
                        console.log('Decoded token:', decoded);
                            const userData = await User.findById(decoded.id).exec(); 
                            console.log(userData);
                            res.json({userData})
                    }
                })
            }
        } catch (error) {
            console.log(error.message)
        }
    },
    trainersList:async (req,res)=>{
        try {
            const approvedTrainer = await Trainer.find({isApproved:true})
            console.log(approvedTrainer);
            if(approvedTrainer){
                res.json({status:true,approvedTrainer})
            }else{
                res.json({status:false})
            }
        } catch (error) {
            console.log(error.message)
        }
    },
    

}