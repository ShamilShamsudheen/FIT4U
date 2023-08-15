import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import ChatPage from '../Pages/User/chatPage';
import { Authorization } from '../Authentication/UserAuth/postLogin';
import { HomeVerification } from '../Authentication/UserAuth/preLogin';

const UserRoutes = () => {


  return (
    <Routes>
      <Route path="/signUp" element={
        <Authorization accessBy={'non-Authorized'}>
          <UserReg />
        </Authorization>

      } />
      <Route path="/selectUser" element={
        <Authorization accessBy={'non-Authorized'}>
          <Selection />
        </Authorization>

      } />
      <Route path="/login" element={
        <Authorization accessBy={'non-Authorized'}>
          <UserLoginPage />
        </Authorization>
      } />
      <Route exact path={"/"} element={
        <HomeVerification>
          <Home />
        </HomeVerification>
      } />
      <Route exact path={"/trainerList"} element={
        <HomeVerification accessBy={'Authorized'}>
          <Trainers />
        </HomeVerification>
      } />
      <Route exact path={"/profile"} element={
        <HomeVerification accessBy={'Authorized'}>
          <Profile />
        </HomeVerification>
      } />
      <Route exact path={"/blogs"} element={
        <HomeVerification accessBy={'Authorized'}>
          <BlogsPage />
        </HomeVerification>
      } />
      <Route exact path={"/workouts"} element={
        <HomeVerification accessBy={'Authorized'}>
          <WorkoutPage />
        </HomeVerification>
      } />
      <Route exact path={"/singleBlogs/:blogId"} element={
        <HomeVerification accessBy={'Authorized'}>
          <SingleBlog />
        </HomeVerification>
      } />
      <Route exact path={"/singleTrainer/:trainerId"} element={
        <HomeVerification accessBy={'Authorized'}>
          <SingleTrainerPage />
        </HomeVerification>
      } />
      <Route exact path={"/chat"} element={
        <HomeVerification accessBy={'Authorized'}>
          <ChatPage />
        </HomeVerification>
      } />

    </Routes>
  );
}

export default UserRoutes;
