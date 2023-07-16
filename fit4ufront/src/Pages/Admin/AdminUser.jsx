import React from 'react'
import UserDetails from '../../Components/Admin/UserDetails/UserDetails'
import AdminNavbar from '../../Components/Admin/Navbar/AdminNavbar'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'

function AdminUser() {
  return (
    <div style={{background:"white"}}>
      <AdminNavbar/>
      <div className="grid grid-cols-[1fr_7fr] md:grid-cols-[1.5fr_8.5fr] w-full">
        <Sidebar />
        <div className="container mx-auto mt-6">
        <UserDetails/>
        </div>
        </div>
    </div>
  )
}

export default AdminUser

