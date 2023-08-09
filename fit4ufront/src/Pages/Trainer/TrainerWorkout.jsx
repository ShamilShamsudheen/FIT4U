import React from 'react'
import heroImage from '../../assets/h1_hero.png'
import TrainerHeader from '../../Components/Trainer/TrainerHeader/TrainerHeader';
import WorkoutForm from '../../Components/Trainer/TrainerWorkout/WorkoutForm';
import Workouts from '../../Components/Trainer/Workouts/Workouts';


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
      <div className='trainer-list bg-black mt-80 '>
        <div className='text-red-900 mx-auto'>
          <div className="flex justify-center w-full mt-4">
            <h2 className="uppercase font-semibold text-2xl text-center">
              <span className=" text-lg tracking-wide font-Mogra font-extrabold">
                Workouts
              </span>
            </h2>
          </div>
          <Workouts />
          <WorkoutForm />
        </div>
      </div>
    </div>
  )
}

export default TrainerWorkout
