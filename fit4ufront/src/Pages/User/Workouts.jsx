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
      <Header />
      <div className='trainer-list bg-black mt-80 flex justify-center'>
        <div className='w-full'>
          <div className="flex justify-center w-full mt-4">
            <h2 className="uppercase font-semibold text-2xl text-center text-red-900 ">
              <span className=" text-lg tracking-wide font-Mogra font-extrabold">
                Workouts
              </span>
            </h2>
          </div>
          <Workouts />
        </div>
      </div>
    </div>
  )
}

export default WorkoutPage
