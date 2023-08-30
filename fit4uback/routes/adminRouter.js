const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController')
const isLogged = require('../middleware/jwtMiddleware')


adminRouter.post('/login',adminController.logIn)
adminRouter.get('/tokenCheck',isLogged,adminController.tokenCheck)
adminRouter.get('/userDetails',adminController.userData)
adminRouter.get('/paymentDetails',isLogged,adminController.paymentData)
adminRouter.patch('/userBlock',isLogged,adminController.userBlock)
adminRouter.get('/trainerDetails',adminController.trainerData)
adminRouter.patch('/trainerApproval',isLogged,adminController.trainerApproval)
adminRouter.get('/blogDetails',isLogged,adminController.blogData)
adminRouter.get('/workoutDetails',isLogged,adminController.workoutData)
adminRouter.get('/userName/:id',isLogged,adminController.userName)
adminRouter.get('/trainerName/:id',isLogged,adminController.trainerName)
adminRouter.get('/singleWorkout/:id',isLogged,adminController.singleWorkout)
adminRouter.get('/singleBlog/:id',isLogged,adminController.singleBlog)
adminRouter.get('/dashboard',isLogged,adminController.dashboard)
adminRouter.get('/profitAmount',isLogged,adminController.getTotalPurchaseAmount)

module.exports = adminRouter;