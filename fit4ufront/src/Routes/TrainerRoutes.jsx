import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TrainerReg from '../Pages/Trainer/TrainerReg';
import TrainerLogIn from '../Pages/Trainer/TrainerLogin';
import TrainerHome from '../Pages/Trainer/TrainerHome';

function TrainerRoutes() {
  return (
    <Routes>
      <Route exact path={"/"} element={<TrainerHome />} />
      <Route exact path={"/signUp"} element={<TrainerReg />} />
      <Route exact path={"/login"} element={<TrainerLogIn />} />

    </Routes>
  )
}
export default TrainerRoutes
