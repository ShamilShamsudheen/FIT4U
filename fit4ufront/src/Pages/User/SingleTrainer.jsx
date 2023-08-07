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
      <SingleTrainer trainerId={trainerId}/>
    </div>
  )
}

export default SingleTrainerPage