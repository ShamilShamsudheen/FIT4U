import BlogForm from '../../Components/Trainer/TrainerBlog/BlogForm';
import TrainerHeader from '../../Components/Trainer/TrainerHeader/TrainerHeader';
import heroImage from '../../assets/h1_hero.png'
import React from 'react'

function TrainerBlog() {
    const style = {
        backgroundImage: `url(${heroImage})`,
        width: '98.8vw',
        height: '100vh',
        backgroundSize: 'cover'
      };
  return (
    <div style={style}>
      <TrainerHeader />
      <BlogForm/>
    </div>
  )
}

export default TrainerBlog
