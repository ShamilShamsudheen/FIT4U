import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TrainerReg from '../Pages/Trainer/TrainerReg';
import TrainerLogIn from '../Pages/Trainer/TrainerLogin';
import TrainerHome from '../Pages/Trainer/TrainerHome';
import TrainerProfile from '../Pages/Trainer/TrainerProfile';

function TrainerRoutes() {
  return (
    <Routes>
      <Route exact path={"/"} element={<TrainerHome />} />
      <Route exact path={"/signUp"} element={<TrainerReg />} />
      <Route exact path={"/login"} element={<TrainerLogIn />} />
      <Route exact path={"/profile"} element={<TrainerProfile />} />

    </Routes>
  )
}
export default TrainerRoutes
