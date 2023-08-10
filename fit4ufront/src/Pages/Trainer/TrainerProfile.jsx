import heroImage from '../../assets/h1_hero.png'
import React from 'react'
import TrainerHeader from '../../Components/Trainer/TrainerHeader/TrainerHeader';
import TrainerProfilePage from '../../Components/Trainer/TrainerProfile/TrainerProfile';

function TrainerProfile() {
    const style = {
        backgroundImage: `url(${heroImage})`,
        width: '98.9vw',
        height: '100vh',
        backgroundSize: 'cover'
      };
  return (
    <div style={style}>
      <TrainerHeader />
      <div className='trainer-list bg-black mt-80 '>
        <div className=' mx-auto'>
          <div className="flex justify-center w-full mt-4 text-red-900">
            <h2 className="uppercase font-semibold text-2xl text-center">
              <span className=" text-lg tracking-wide font-Mogra font-extrabold">
                Profile
              </span>
            </h2>
          </div>
      <TrainerProfilePage/>
        </div>
      </div>
    </div>
  )
}

export default TrainerProfile
