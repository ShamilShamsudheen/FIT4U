import React from 'react'
import bg from '../../assets/img/gallery/section_bg01.png'
import TrainerHeader from '../../Components/Trainer/TrainerHeader/TrainerHeader';
import Chat from '../../Components/Trainer/TrainerChat/TrainerChat';

function TrainerChat() {
    const style = {
        backgroundImage: `url(${bg})`,
        width: '98.8vw',
        height: '100vh',
        backgroundSize: 'cover'
      
    };
  return (
    <div className='chat-page' style={style}>
      <TrainerHeader/>
      <Chat/>
    </div>
  )
}

export default TrainerChat