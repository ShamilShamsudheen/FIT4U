import React from 'react'
import TrainerHeader from '../../Components/Trainer/TrainerHeader/TrainerHeader'
import heroImage from '../../assets/h1_hero.png'

function TrainerEditWorkout() {
    const style = {
        backgroundImage: `url(${heroImage})`,
        width: '98.9vw',
        height: '100vh',
        backgroundSize: 'cover'
    };
    return (
        <div className="editBlog" style={style}>
            <TrainerHeader />

        </div>
    )
}

export default TrainerEditWorkout
