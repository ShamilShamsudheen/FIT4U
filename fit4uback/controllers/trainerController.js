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
            const trainerData = await Trainer.findById(req.user.id).exec();
            res.json({ trainerData })
        } catch (error) {
            console.log(error.message)
        }
    },
    profileImageUpload: async (req, res) => {
        try {
            const trainerId = req.user.id
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
            const trainer = await Trainer.findOne({ _id: req.user.id }, { name: 1, _id: 0 })
            const writer_name = trainer.name;
            const { blog_title, content, category } = req.body.values
            const blog = new Blog({
                blog_template: req.body.templateImg,
                blog_title: blog_title,
                blog_content: content,
                blog_writer: writer_name,
                blog_writer_id: req.user.id,
                blog_date: Date.now(),
                blog_category: category
            })
            await blog.save()
            res.json({ message: 'blog created ....' })
        } catch (error) {
            console.log('error', error.message)
        }
    },
    addWorkout: async (req, res) => {
        try {
            console.log(req.user, req.body);

            const trainer = await Trainer.findOne({ _id: req.user.id }, { name: 1, _id: 0 });
            const trainer_name = trainer.name;
            const { id } = req.user;

            const workoutItems = req.body.workoutItems.map((item) => ({
                item_name: item.item_name,
                item_instruction: item.item_instruction,
                item_instruction_refer: item.item_instruction_video,
            }));

            const newWorkout = new Workout({
                trainer_id: id,
                trainer_name: trainer_name,
                workout_name: req.body.workout_name,
                workout_items: workoutItems,
            });

            await newWorkout.save();
            res.json({ message: 'ok' });
        } catch (error) {
            console.log('Error:', error.message);
            res.status(500).json({ error: 'An error occurred while saving the workout.' });
        }
    },
    blogList: async (req, res) => {
        try {
            const blogData = await Blog.find({ blog_writer_id: req.user.id })
            // console.log(blogData)
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
    deleteBlog: async (req, res) => {
        try {
            const blogId = req.body.blogId;

            if (!blogId) {
                return res.status(400).json({ message: 'Invalid blog ID' });
            }

            const deletedBlog = await Blog.findByIdAndDelete(blogId);

            if (!deletedBlog) {
                return res.status(404).json({ message: 'Blog not found' });
            }

            res.json({ message: 'Successfully deleted the blog' });
        } catch (error) {
            console.log('Error:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    editBlog: async (req, res) => {
        const { blogId } = req.params;
        const { blog_title, blog_category, blog_content } = req.body.values;
        const { id } = req.user
        const blog_template = req.body.templateImg
        const trainer = await Trainer.findById(id);
        const blog_writer = trainer.name;
        const blog_date = Date.now()

        try {
            const updatedBlog = await Blog.findByIdAndUpdate(
                blogId,
                {
                    blog_title,
                    blog_content,
                    blog_category,
                    blog_writer,
                    blog_template,
                    blog_date,
                },
                { new: true } 
            );

            if (!updatedBlog) {
                return res.status(404).json({ message: 'Blog not found' });
            }

            res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    },
    workoutList: async(req,res)=>{
        try {
            const trainer_id = req.user.id;
        
            const workouts = await Workout.find({ trainer_id },);
            console.log(workouts)
            res.json({workouts})
          } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
          }
    },
    deleteWorkout: async(req,res)=>{
        try {
            const {workout_id} = req.body;
            if (!workout_id) {
                return res.status(400).json({ message: 'Invalid workout ID' });
            }

            const deletedBlog = await Workout.deleteOne({_id:workout_id});

            if (!deletedBlog) {
                return res.status(404).json({ message: 'workout not found' });
            }

            res.json({ message: 'Successfully deleted the workout' });
        } catch (error) {
            console.log('Error:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}