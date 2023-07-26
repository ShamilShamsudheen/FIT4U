import React from 'react'
import heroImage from '../../assets/h1_hero.png'
import TrainerHeader from '../../Components/Trainer/TrainerHeader/TrainerHeader';
import WorkoutForm from '../../Components/Trainer/TrainerWorkout/WorkoutForm';


function TrainerWorkout() {
    const style = {
        backgroundImage: `url(${heroImage})`,
        width: '98.8vw',
        height: '100vh',
        backgroundSize: 'cover'
      };
  return (
    <div style={style}>
      <TrainerHeader />
      <WorkoutForm/>
    </div>
  )
}

export default TrainerWorkout
