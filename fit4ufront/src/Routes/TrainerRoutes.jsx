import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TrainerReg from '../Pages/Trainer/TrainerReg';
import TrainerLogIn from '../Pages/Trainer/TrainerLogin';
import TrainerHome from '../Pages/Trainer/TrainerHome';
import TrainerProfile from '../Pages/Trainer/TrainerProfile';
import TrainerWorkout from '../Pages/Trainer/TrainerWorkout';
import TrainerBlog from '../Pages/Trainer/TrainerBlog';
import TrainerEditBlog from '../Pages/Trainer/TrainerEditBlog';
import TrainerEditWorkout from '../Pages/Trainer/TrainerEditWorkout';

function TrainerRoutes() {
  return (
    <Routes>
      <Route exact path={"/"} element={<TrainerHome />} />
      <Route exact path={"/signUp"} element={<TrainerReg />} />
      <Route exact path={"/login"} element={<TrainerLogIn />} />
      <Route exact path={"/profile"} element={<TrainerProfile />} />
      <Route exact path={"/workout"} element={<TrainerWorkout />} />
      <Route exact path={"/blog"} element={<TrainerBlog />} />
      <Route exact path={"/editBlog/:blogId"} element={<TrainerEditBlog />} />
      <Route exact path={"/editWorkout/:workoutId"} element={<TrainerEditWorkout />} />

    </Routes>
  )
}
export default TrainerRoutes
