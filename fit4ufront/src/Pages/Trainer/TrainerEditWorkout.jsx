import React from 'react'
import TrainerHeader from '../../Components/Trainer/TrainerHeader/TrainerHeader'
import heroImage from '../../assets/h1_hero.png'
import EditWorkout from '../../Components/Trainer/EditWorkout/EditWorkout';

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
            <EditWorkout/>
        </div>
    )
}

export default TrainerEditWorkout
