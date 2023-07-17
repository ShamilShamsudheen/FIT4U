import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react'
import AdminDashboard from '../Pages/Admin/AdminDashboard';
import AdminLoginPage from '../Pages/Admin/AdminLogin';
import AdminUser from '../Pages/Admin/AdminUser';
import AdminTrainer from '../Pages/Admin/AdminTrainer';

function AdminRoutes() {
  return (
    <Routes>
      <Route exact path={"/login"} element={<AdminLoginPage />} />
      <Route exact path={"/dashboard"} element={<AdminDashboard />} />
      <Route exact path={"/userDetails"} element={<AdminUser />} />
      <Route exact path={"/trainerDetails"} element={<AdminTrainer />} />

    </Routes>
  )
}

export default AdminRoutes
