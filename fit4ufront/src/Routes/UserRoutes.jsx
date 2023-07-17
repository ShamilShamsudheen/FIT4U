import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Home from '../Pages/User/Home'
import Selection from '../Pages/User/Selection';
import UserReg from '../Pages/User/UserReg';
import UserLoginPage from '../Pages/User/UserLogin';
import Trainers from '../Pages/User/Trainers';
import Profile from '../Pages/User/Profile';

const UserRoutes = () => {
    return (
        <Routes>
          <Route exact path={"/"} element={<Home/>} />
          <Route path="/signUp" element={<UserReg/>} />
          <Route path="/selectUser" element={<Selection/>} />
          <Route path="/login" element={<UserLoginPage/>} />
          <Route exact path={"/trainerList"} element={<Trainers/>} />
          <Route exact path={"/profile"} element={<Profile/>} />
         
        </Routes>
    );
  }
  
  export default UserRoutes;
  