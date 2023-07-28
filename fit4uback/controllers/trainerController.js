require('dotenv').config()
const Trainer = require('../models/trainer/trainerModel')
const Workout = require('../models/workout/workout')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog/blogModel')

module.exports = {
    signUp: async (req, res) => {
        const body = req.body.values
        try {
            const usedEmail = await Trainer.findOne({ email: body.email })
            if (usedEmail) {
                res.json({ status: false, message: 'Email is already registered' })
            } else {
                if (body.resumeUrl) {
                    const password = body.pass;
                    const secPass = await bcrypt.hash(password, 5)
                    const trainerData = new Trainer({
                        name: body.name,
                        email: body.email,
                        mobile: body.mob,
                        password: secPass,
                        role: body.role,
                        resume: body.resumeUrl,
                        certificate: body.certificateUrl,
                        description: body.description
                    })
                    await trainerData.save()
                    res.json({ status: true, message: 'Registration Completed Successfully' })

                } else {
                    res.json({ status: true, message: 'Email verification Processing..' })
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    },
    login: async (req, res) => {
        try {
            const trainerData = await Trainer.findOne({ email: req.body.values.email })
            // console.log(trainerData);
            if (trainerData) {
                let passMatch = await bcrypt.compare(req.body.values.pass, trainerData.password)
                if (passMatch) {
                    const username = trainerData.name;
                    let token = jwt.sign(
                        { id: trainerData._id, role: trainerData.role },
                        process.env.JWT_SECRET_KEY,
                        { expiresIn: '1d' }
                    );
                    res.json({
                        status: true,
                        message: 'Login Successfully',
                        username,
                        token
                    })
                } else {
                    res.json({ status: false, message: 'Password is incorrect' })
                }
            } else {
                res.json({ status: false, message: 'Check email or password' })
            }
        } catch (error) {
            console.log(error.message)
        }
    },
    postLogin: async (req, res) => {
        try {
            // console.log(req);
            const trainerData = await Trainer.findById(req.user.id).exec();
            res.json({ trainerData })
        } catch (error) {
            console.log(error.message)
        }
    },
    profileImageUpload: async (req, res) => {
        try {
            const trainerId = req.body.id
            updateFields = {
                profileImg: req.body.profileUrl
            }
            await Trainer.findByIdAndUpdate(trainerId, updateFields, { new: true })
                .then((updateProfile) => {
                    if (!updateProfile) {
                        // console.log('User not found');
                    } else {
                        // console.log('Updated User:', updateProfile);
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
    addBlog: async (req, res) => {
        try {
            const trainer = await Trainer.findOne({_id:req.user.id},{name:1,_id:0})
            const writer_name = trainer.name;
            const {blog_title,content,category} = req.body.values
            const blog = new Blog({
                blog_template:req.body.templateImg,
                blog_title:blog_title,
                blog_content:content,
                blog_writer:writer_name,
                blog_date:Date.now(),
                blog_category:category
            })
            await blog.save()
            res.json({message:'blog created ....'})
        } catch (error) {
            console.log('error', error.message)
        }
    },
    addWorkout: async(req,res)=>{
        console.log('adfad');
        try {
            console.log(req.user,req.body.values,req.body.instruction_video)
            const {workout_name,item_name_1,first_item_instruction,item_name_2,second_item_instruction,item_name_3,third_item_instruction,item_name_4,fourth_item_instruction} = req.body.values
            const trainer = await Trainer.findOne({_id:req.user.id},{name:1,_id:0})
            const trainer_name = trainer.name;
            const {id} = req.user
            const newWorkout = new Workout({
                trainer_id: id,
                trainer_name: trainer_name,
                workout_name: workout_name,
                workout_items: [
                    {
                        item_name: item_name_1,
                        item_instruction: first_item_instruction,
                        item_instruction_refer: req.body.instruction_video[0]
                    },
                    {
                        item_name: item_name_2,
                        item_instruction: second_item_instruction,
                        item_instruction_refer: req.body.instruction_video[1]
                    },
                    {
                        item_name: item_name_3,
                        item_instruction: third_item_instruction,
                        item_instruction_refer: req.body.instruction_video[2]
                    },
                    {
                        item_name: item_name_4,
                        item_instruction: fourth_item_instruction,
                        item_instruction_refer: req.body.instruction_video[3]
                    },
                ]
            });
            
            await newWorkout.save()
            res.json({message:'ok'})
        } catch (error) {
            console.log('Error',error.message)
        }
    }
}