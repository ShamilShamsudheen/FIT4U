const express = require('express');
const trainerRouter = express.Router();
const trainerController = require('../controllers/trainerController')
// const config = require('../config/config')
const isLogged = require('../middleware/jwtMiddleware')

trainerRouter.post('/trainer/signUp',trainerController.signUp)
trainerRouter.post('/trainer/login',trainerController.login)
trainerRouter.get('/postLogin',isLogged,trainerController.postLogin)
trainerRouter.post('/trainer/profileImgUpload',trainerController.profileImageUpload)
trainerRouter.post('/addBlog',isLogged,trainerController.addBlog)



module.exports = trainerRouter;