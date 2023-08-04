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
      <TrainerProfilePage/>
    </div>
  )
}

export default TrainerProfile
