import React from 'react'
import heroImage from '../../assets/h1_hero.png'
import Header from '../../Components/User/Header/Header'
import TrainerMain from '../../Components/User/TrainerMain/TrainerMain';

function Trainers() {
    const style = {
        backgroundImage: `url(${heroImage})`,
        width: '98.9vw',
        height: '100vh',
        backgroundSize: 'cover'
    };
    return (
        <div className='' style={style}>
            <Header />
            <TrainerMain/>
        </div>  
    )
}

export default Trainers
