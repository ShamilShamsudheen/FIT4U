const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController')
const isLogged = require('../middleware/jwtMiddleware')


adminRouter.post('/login',adminController.logIn)
adminRouter.get('/admin/userDetails',adminController.userData)
adminRouter.get('/paymentDetails',isLogged,adminController.paymentData)
adminRouter.post('/admin/userBlock',adminController.userBlock)
adminRouter.get('/admin/trainerDetails',adminController.trainerData)
adminRouter.post('/admin/trainerApproval',adminController.trainerApproval)
adminRouter.get('/blogDetails',isLogged,adminController.blogData)
adminRouter.get('/workoutDetails',isLogged,adminController.workoutData)

module.exports = adminRouter;