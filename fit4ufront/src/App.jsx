import React ,{ useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import UserRoutes from './Routes/UserRoutes';
import TrainerRoutes from './Routes/TrainerRoutes';
import {Toaster} from 'react-hot-toast'
import AdminRoutes from './Routes/AdminRoutes';



function App() {
  
  return (
    <>
        <Toaster/>

     <Router>
      <Routes>
        <Route path={"/*"} element={<UserRoutes />} />
        <Route path={"/trainer/*"} element={<TrainerRoutes />} />
        <Route path={"/admin/*"} element={<AdminRoutes />} />
        
      </Routes>
     </Router>
    </>
  )
}

export default App
