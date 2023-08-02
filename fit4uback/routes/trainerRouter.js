const express = require('express');
const trainerRouter = express.Router();
const trainerController = require('../controllers/trainerController')
// const config = require('../config/config')
const isLogged = require('../middleware/jwtMiddleware')

trainerRouter.post('/trainer/signUp',trainerController.signUp)
trainerRouter.post('/trainer/login',trainerController.login)
trainerRouter.get('/postLogin',isLogged,trainerController.postLogin)
trainerRouter.get('/blogs',isLogged,trainerController.blogList)
trainerRouter.get('/singleBlog/:blogId',trainerController.singleBlog)
trainerRouter.post('/trainer/profileImgUpload',trainerController.profileImageUpload)
trainerRouter.post('/addBlog',isLogged,trainerController.addBlog)
trainerRouter.post('/addWorkout',isLogged,trainerController.addWorkout)
trainerRouter.post('/deleteBlog',isLogged,trainerController.deleteBlog)



module.exports = trainerRouter;