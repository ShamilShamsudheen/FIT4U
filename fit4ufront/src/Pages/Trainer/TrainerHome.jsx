import React from 'react'
import TrainerHeader from '../../Components/Trainer/TrainerHeader/TrainerHeader'
import TrainerMain from '../../Components/Trainer/TrainerMain/TrainerMain'
import heroImage from '../../assets/h1_hero.png'
import LBlog from '../../Components/User/LandBlog/LBlog'
import LTrainer from '../../Components/User/landTrainer/LTrainer'
import Footer from '../../Components/User/Footer/footer'

function TrainerHome() {
  const style = {
    backgroundImage: `url(${heroImage})`,
    width: '98.9vw',
    height: '100vh',
    backgroundSize: 'cover'
  };
  return (
    <div className="trainer-home" style={style}>
      <TrainerHeader />
      <TrainerMain />
    </div>
  )
}

export default TrainerHome

