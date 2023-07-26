const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController')

adminRouter.post('/admin/login',adminController.logIn)
adminRouter.get('/admin/userDetails',adminController.userData)
adminRouter.get('/admin/paymentDetails',adminController.paymentData)
adminRouter.post('/admin/userBlock',adminController.userBlock)
adminRouter.get('/admin/trainerDetails',adminController.trainerData)
adminRouter.post('/admin/trainerApproval',adminController.trainerApproval)

module.exports = adminRouter;