import React from 'react'
import Sidebar from '../../Components/Admin/Sidebar/Sidebar'
import AdminNavbar from '../../Components/Admin/Navbar/AdminNavbar'
import TrainerDetails from '../../Components/Admin/TrainerDetails/TrainerDetails'

function AdminTrainer() {
  return (
    <div style={{background:"white"}}>
      <AdminNavbar/>
      <div className="grid grid-cols-[1fr_7fr] md:grid-cols-[1.5fr_8.5fr] w-full">
        <Sidebar />
        <div className="container mx-auto mt-6">
        <TrainerDetails />
        </div>
        </div>
    </div>
  )
}

export default AdminTrainer
