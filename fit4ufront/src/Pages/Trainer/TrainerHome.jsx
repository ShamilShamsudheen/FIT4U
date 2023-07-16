import React from 'react'
import TrainerHeader from '../../Components/Trainer/TrainerHeader/TrainerHeader'
import TrainerMain from '../../Components/Trainer/TrainerMain/TrainerMain'
import heroImage from '../../assets/h1_hero.png'
import TrainerFooter from '../../Components/Trainer/TrainerFooter/TrainerFooter'

function TrainerHome() {
    const style = {
        backgroundImage: `url(${heroImage})`,
        width: '100vw',
        height: '100vh',
        backgroundSize: 'cover'
      };
  return (
    <div className="trainer-home" style={style}>
      <TrainerHeader />
      <TrainerMain />
      <TrainerFooter />
    </div>
  )
}

export default TrainerHome

