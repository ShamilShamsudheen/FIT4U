const express = require('express');
const userRouter = express.Router();
const userController  = require('../controllers/userController')

const isLogged = require('../middleware/jwtMiddleware')


// user routes
userRouter.post('/signUp',userController.signUp)
userRouter.post('/login',userController.logIn)
userRouter.post('/postLogin',isLogged,userController.postLogin)
userRouter.get('/trainers',userController.trainersList)
userRouter.get('/blogs',isLogged,userController.blogList)
userRouter.get('/workouts',isLogged,userController.workouts)
userRouter.get('/singleBlog/:blogId',userController.singleBlog)
userRouter.get('/singleTrainer/:trainerId',userController.singleTrainer)
userRouter.post('/profile',isLogged,userController.profileUpdate)
userRouter.post('/profileImgUpload',isLogged,userController.profileImageUpload)
userRouter.post('/payment',isLogged,userController.payment)



//export userRouter
module.exports = userRouter;