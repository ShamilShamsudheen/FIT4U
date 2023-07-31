import React from 'react'
import TrainerHeader from '../../Components/Trainer/TrainerHeader/TrainerHeader'
import heroImage from '../../assets/h1_hero.png'
import TrainerFooter from '../../Components/Trainer/TrainerFooter/TrainerFooter'
import SingleBlogComponent from '../../Components/Trainer/SingleBlog/SingleBlogComponent';

function TrainerSingleBlog() {
    const style = {
        backgroundImage: `url(${heroImage})`,
        width: '98.9vw',
        height: '100vh',
        backgroundSize: 'cover'
      };
  return (
    <div className="trainer-home" style={style}>
      <TrainerHeader />
      <SingleBlogComponent />
      <TrainerFooter />
    </div>
  )
}

export default TrainerSingleBlog

