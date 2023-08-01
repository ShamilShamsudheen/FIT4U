import React from 'react'
import Header from '../../Components/User/Header/Header'
import heroImage from '../../assets/h1_hero.png'
import Workouts from '../../Components/User/workouts/Workouts';

function WorkoutPage() {
    const style = {
      backgroundImage: `url(${heroImage})`,
      width: '98.9vw',
      height: '100vh',
      backgroundSize: 'cover'
    };
  return (
    <div className="WorkoutPage" style={style}>
      <Header/>
      <Workouts/>
    </div>
  )
}

export default WorkoutPage
