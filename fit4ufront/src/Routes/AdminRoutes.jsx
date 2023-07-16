import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react'
import AdminDashboard from '../Pages/Admin/AdminDashboard';
import AdminLoginPage from '../Pages/Admin/AdminLogin';
import AdminUser from '../Pages/Admin/AdminUser';

function AdminRoutes() {
  return (
    <Routes>
      <Route exact path={"/login"} element={<AdminLoginPage />} />
      <Route exact path={"/dashboard"} element={<AdminDashboard />} />
      <Route exact path={"/userDetails"} element={<AdminUser />} />
      <Route exact path={"/trainerDetails"} element={<AdminUser />} />

    </Routes>
  )
}

export default AdminRoutes
