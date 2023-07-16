const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController')

adminRouter.post('/admin/login',adminController.logIn)
adminRouter.post('/admin/userDetails',adminController.userData)

module.exports = adminRouter;