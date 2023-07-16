const express = require('express');
const userRouter = express.Router();
const userController  = require('../controllers/userController')

// console.log('router reached');

// user routes
userRouter.post('/signUp',userController.signUp)
userRouter.post('/login',userController.logIn)


//export userRouter
module.exports = userRouter;