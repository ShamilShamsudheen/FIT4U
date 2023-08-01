const express = require('express');
const userRouter = express.Router();
const userController  = require('../controllers/userController')

const isLogged = require('../middleware/jwtMiddleware')


// user routes
userRouter.post('/signUp',userController.signUp)
userRouter.post('/login',userController.logIn)
userRouter.post('/postLogin',userController.postLogin)
userRouter.get('/trainers',userController.trainersList)
userRouter.get('/blogs',userController.blogList)
userRouter.get('/workouts',isLogged,userController.workouts)
userRouter.get('/singleBlog/:blogId',userController.singleBlog)
userRouter.post('/profile',userController.profile)
userRouter.post('/profileImgUpload',userController.profileImageUpload)
userRouter.post('/payment',userController.payment)
userRouter.post('/paymentConformation',isLogged,userController.paymentConformation)



//export userRouter
module.exports = userRouter;