const express = require('express');
const userRouter = express.Router();
const userController  = require('../controllers/userController')

// console.log('router reached');

// user routes
userRouter.post('/signUp',userController.signUp)
userRouter.post('/login',userController.logIn)
userRouter.post('/postLogin',userController.postLogin)
userRouter.get('/trainers',userController.trainersList)
userRouter.post('/profile',userController.profile)
userRouter.post('/profileImgUpload',userController.profileImageUpload)


//export userRouter
module.exports = userRouter;