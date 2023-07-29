import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react'
import AdminDashboard from '../Pages/Admin/AdminDashboard';
import AdminLoginPage from '../Pages/Admin/AdminLogin';
import AdminUser from '../Pages/Admin/AdminUser';
import AdminTrainer from '../Pages/Admin/AdminTrainer';
import AdminPayment from '../Pages/Admin/AdminPayment';
import AdminBlog from '../Pages/Admin/AdminBlog';
import AdminWorkout from '../Pages/Admin/AdminWorkout';

function AdminRoutes() {
  return (
    <Routes>
      <Route exact path={"/login"} element={<AdminLoginPage />} />
      <Route exact path={"/"} element={<AdminDashboard />} />
      <Route exact path={"/userDetails"} element={<AdminUser />} />
      <Route exact path={"/trainerDetails"} element={<AdminTrainer />} />
      <Route exact path={"/paymentDetails"} element={<AdminPayment />} />
      <Route exact path={"/blogDetails"} element={<AdminBlog />} />
      <Route exact path={"/workoutDetails"} element={<AdminWorkout />} />

    </Routes>
  )
}

export default AdminRoutes
