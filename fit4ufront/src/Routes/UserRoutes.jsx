import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Home from '../Pages/User/Home'
import Selection from '../Pages/User/Selection';
import UserReg from '../Pages/User/UserReg';
import UserLoginPage from '../Pages/User/UserLogin';
import Trainers from '../Pages/User/Trainers';
import Profile from '../Pages/User/Profile';
import BlogsPage from '../Pages/User/Blogs';
import SingleBlog from '../Pages/User/SingleBlog.jsx';
import WorkoutPage from '../Pages/User/Workouts';
import SingleTrainerPage from '../Pages/User/SingleTrainer';
import chatPage from '../Pages/User/chatPage'
import ChatPage from '../Pages/User/chatPage';

const UserRoutes = () => {
    return (
        <Routes>
          <Route exact path={"/"} element={<Home/>} />
          <Route path="/signUp" element={<UserReg/>} />
          <Route path="/selectUser" element={<Selection/>} />
          <Route path="/login" element={<UserLoginPage/>} />
          <Route exact path={"/trainerList"} element={<Trainers/>} />
          <Route exact path={"/profile"} element={<Profile/>} />
          <Route exact path={"/blogs"} element={<BlogsPage/>} />
          <Route exact path={"/workouts"} element={<WorkoutPage/>} />
          <Route exact path={"/singleBlogs/:blogId"} element={<SingleBlog/>} />
          <Route exact path={"/singleTrainer/:trainerId"} element={<SingleTrainerPage/>} />
          <Route exact path={"/chat"} element={<ChatPage/>} />
         
        </Routes>
    );
  }
  
  export default UserRoutes;
  