const express = require('express');
const userRouter = express.Router();
const userController  = require('../controllers/userController')

const isLogged = require('../middleware/jwtMiddleware')


// user routes
userRouter.post('/signUp',userController.signUp)
userRouter.post('/login',userController.logIn)
userRouter.get('/postLogin',isLogged,userController.postLogin)
userRouter.get('/tokenCheck',isLogged,userController.tokenCheck)
userRouter.get('/trainers',userController.trainersList)
userRouter.get('/blogs',userController.blogList)
userRouter.get('/workouts',isLogged,userController.workouts)
userRouter.get('/singleBlog/:blogId',userController.singleBlog)
userRouter.get('/singleTrainer/:trainerId',userController.singleTrainer)
userRouter.post('/profile',isLogged,userController.profileUpdate)
userRouter.post('/profileImgUpload',isLogged,userController.profileImageUpload)
userRouter.post('/payment',isLogged,userController.payment)
userRouter.get('/payedTrainer',isLogged,userController.personalTrainer)
userRouter.post('/createMessage',isLogged,userController.chat)
userRouter.get('/getChat',isLogged,userController.getChat)
userRouter.get('/chatMessage/:chatId',isLogged,userController.chatMessage)
userRouter.get('/paymentHistory',isLogged,userController.paymentHistory)
userRouter.get('/getBlogSearch',isLogged,userController.getBlogSearch)
userRouter.get('/blogsCategory',isLogged,userController.blogsCategory)



//export userRouter
module.exports = userRouter;