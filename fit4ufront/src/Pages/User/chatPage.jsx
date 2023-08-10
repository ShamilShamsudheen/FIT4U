import React from 'react'
import Header from '../../Components/User/Header/Header'
import bg from '../../assets/img/gallery/section_bg01.png'
import Chat from '../../Components/User/Chat/Chat';

function ChatPage() {
    const style = {
        backgroundImage: `url(${bg})`,
        width: '98.8vw',
        height: '100vh',
        backgroundSize: 'cover'
      
    };
  return (
    <div className='chat-page' style={style}>
      <Header/>
      <Chat/>
    </div>
  )
}

export default ChatPage
