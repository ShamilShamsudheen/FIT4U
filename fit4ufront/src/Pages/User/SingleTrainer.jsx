import React from 'react'
import Header from '../../Components/User/Header/Header'
import heroImage from '../../assets/h1_hero.png'
import { useParams } from 'react-router-dom';
import SingleTrainer from '../../Components/User/SingleTrainer/SingleTrainer';

function SingleTrainerPage() {
    const {trainerId} = useParams()
  const style = {
    backgroundImage: `url(${heroImage})`,
    width: '98.9vw',
    height: '100vh',
    backgroundSize: 'cover'
  };
  return (
    <div className="SingleTrainerPage" style={style}>
      <Header/>
      <div className="flex justify-center h-72 items-center main-slide">
        <h3 className="slide-text animate-slide-top">Trainer Details</h3>
      </div>
      <div className="trainer-list bg-black">
        <div className=" mx-auto">
      <SingleTrainer trainerId={trainerId}/>
      </div>
      </div>
    </div>
  )
}

export default SingleTrainerPage