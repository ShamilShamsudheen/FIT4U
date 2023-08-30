import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react'
import AdminDashboard from '../Pages/Admin/AdminDashboard';
import AdminLoginPage from '../Pages/Admin/AdminLogin';
import AdminUser from '../Pages/Admin/AdminUser';
import AdminTrainer from '../Pages/Admin/AdminTrainer';
import AdminPayment from '../Pages/Admin/AdminPayment';
import AdminBlog from '../Pages/Admin/AdminBlog';
import AdminWorkout from '../Pages/Admin/AdminWorkout';
import { Authorization } from '../Authentication/AdminAuth/postLogin';
import { HomeVerification } from '../Authentication/AdminAuth/preLogin';

function AdminRoutes() {
  return (
    <Routes>
      <Route exact path={"/login"} element={

        <Authorization accessBy={'non-Authorized'}>
          <AdminLoginPage />
        </Authorization>

      } />
      <Route exact path={"/"} element={
        <HomeVerification>

        <AdminDashboard />
        </HomeVerification>

      } />
      <Route exact path={"/userDetails"} element={
        <HomeVerification accessBy={'Authorized'}>

        <AdminUser />
        </HomeVerification>

      } />
      <Route exact path={"/trainerDetails"} element={
        <HomeVerification accessBy={'Authorized'}>

        <AdminTrainer />
        </HomeVerification>

      } />
      <Route exact path={"/paymentDetails"} element={
        <HomeVerification accessBy={'Authorized'}>

        <AdminPayment />
        </HomeVerification>

      } />
      <Route exact path={"/blogDetails"} element={
        <HomeVerification accessBy={'Authorized'}>

        <AdminBlog />
        </HomeVerification>

      } />
      <Route exact path={"/workoutDetails"} element={
        <HomeVerification accessBy={'Authorized'}>

        <AdminWorkout />
        </HomeVerification>

      } />

    </Routes>
  )
}

export default AdminRoutes
