import React from 'react'
import TrainerHeader from '../../Components/Trainer/TrainerHeader/TrainerHeader'
import heroImage from '../../assets/h1_hero.png'
import EditBlog from '../../Components/Trainer/EditBlog/EditBlog';

function TrainerEditBlog() {
    const style = {
        backgroundImage: `url(${heroImage})`,
        width: '98.9vw',
        height: '100vh',
        backgroundSize: 'cover'
    };
    return (
        <div className="editBlog" style={style}>
            <TrainerHeader />
            <EditBlog />
        </div>
    )
}

export default TrainerEditBlog
