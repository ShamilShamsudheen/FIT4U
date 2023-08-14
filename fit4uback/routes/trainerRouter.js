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
// trainerRouter.get('/profile',isLogged,trainerController.profileUpdate)
trainerRouter.post('/profileImgUpload',isLogged,trainerController.profileImageUpload)
trainerRouter.get('/workouts',isLogged,trainerController.workoutList)
trainerRouter.post('/addBlog',isLogged,trainerController.addBlog)
trainerRouter.post('/editBlog/:blogId',isLogged,trainerController.editBlog)
trainerRouter.post('/addWorkout',isLogged,trainerController.addWorkout)
trainerRouter.post('/deleteBlog',isLogged,trainerController.deleteBlog)
trainerRouter.post('/deleteWorkout',isLogged,trainerController.deleteWorkout)
trainerRouter.get('/payedUser',isLogged,trainerController.personalUser)
trainerRouter.post('/createMessage',isLogged,trainerController.chat)
trainerRouter.get('/getChat',isLogged,trainerController.getChat)
trainerRouter.get('/chatMessage/:chatId',isLogged,trainerController.chatMessage)

module.exports = trainerRouter;