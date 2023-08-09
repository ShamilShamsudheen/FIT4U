import React from 'react'
import Header from '../../Components/User/Header/Header'
import bg from '../../assets/img/gallery/section_bg01.png'

function chatPage() {
    const style = {
        backgroundImage: `url(${bg})`,
        width: '98.8vw',
        height: '100vh',
        backgroundSize: 'cover'
      
    };
  return (
    <div className='chat-page' style={style}>
      <Header/>
    </div>
  )
}

export default chatPage
