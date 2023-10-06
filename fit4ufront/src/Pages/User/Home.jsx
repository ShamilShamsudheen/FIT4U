// import React from 'react'
import Header from '../../Components/User/Header/Header'
import Main from '../../Components/User/Main/Main'
import heroImage from '../../assets/h1_hero.png'
import LBlog from '../../Components/User/LandBlog/LBlog';
import LTrainer from '../../Components/User/landTrainer/LTrainer';
import Footer from '../../Components/User/Footer/footer';
import Offer from '../../Components/User/Offer/Offer';

function Home() {
  const style = {
    backgroundImage: `url(${heroImage})`,
    width: '98.9vw',
    height: '100vh',
    backgroundSize: 'cover'
  };
  return (
    <div className="home" style={style}>
      <Header/>
      <Main/>
      <Offer/>
      <LBlog/>
      <LTrainer/>
      <Footer/>
    </div>
  )
}

export default Home
