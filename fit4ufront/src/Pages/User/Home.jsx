import React from 'react'
import Header from '../../Components/User/Header/Header'
import Main from '../../Components/User/Main/Main'
import heroImage from '../../assets/h1_hero.png'

function Home() {
  const style = {
    backgroundImage: `url(${heroImage})`,
    width: '99vw',
    height: '100vh',
    backgroundSize: 'cover'
  };
  return (
    <div className="home" style={style}>
      <Header/>
      <Main/>
    </div>
  )
}

export default Home
