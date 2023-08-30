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
import TrainerChat from '../Pages/Trainer/TrianerChat';
import { HomeVerification } from '../Authentication/TrainerAuth/preLogin';
import { Authorization } from '../Authentication/TrainerAuth/postLogin';

function TrainerRoutes() {
  return (
    <Routes>
      <Route exact path={"/"} element={
        <HomeVerification>
          <TrainerHome />
        </HomeVerification>

      } />
      <Route exact path={"/signUp"} element={
        <Authorization accessBy={'non-Authorized'}>
          <TrainerReg />
        </Authorization>

      } />
      <Route exact path={"/login"} element={
        <Authorization accessBy={'non-Authorized'}>
          <TrainerLogIn />
        </Authorization>

      } />
      <Route exact path={"/profile"} element={
        <HomeVerification accessBy={'Authorized'}>

          <TrainerProfile />
        </HomeVerification>

      } />
      <Route exact path={"/workout"} element={
        <HomeVerification accessBy={'Authorized'}>

          <TrainerWorkout />
        </HomeVerification>

      } />
      <Route exact path={"/blog"} element={
        <HomeVerification accessBy={'Authorized'}>

          <TrainerBlog />
        </HomeVerification>

      } />
      <Route exact path={"/editBlog/:blogId"} element={
        <HomeVerification accessBy={'Authorized'}>

          <TrainerEditBlog />
        </HomeVerification>

      } />
      <Route exact path={"/editWorkout/:workoutId"} element={
        <HomeVerification accessBy={'Authorized'}>

          <TrainerEditWorkout />
        </HomeVerification>

      } />
      <Route exact path={"/chat"} element={
        <HomeVerification accessBy={'Authorized'}>

          <TrainerChat />
        </HomeVerification>

      } />

    </Routes>
  )
}
export default TrainerRoutes
