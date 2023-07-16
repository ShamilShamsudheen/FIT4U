const express = require('express');
const trainerRouter = express.Router();
const trainerController = require('../controllers/trainerController')
const config = require('../config/config')


trainerRouter.post('/trainer/signUp',trainerController.signUp)
trainerRouter.post('/trainer/login',trainerController.login)

module.exports = trainerRouter;