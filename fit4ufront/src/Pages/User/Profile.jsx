import React from 'react'
import Header from '../../Components/User/Header/Header'
import UserProfile from '../../Components/User/UserProfile/UserProfile';
import heroImage from '../../assets/h1_hero.png'


function Profile() {
    const style = {
        backgroundImage: `url(${heroImage})`,
        width: '98.8vw',
        height: '100vh',
        backgroundSize: 'cover'
      
    };
  return (
    <div className='object-cover' style={style}>
      <Header/>
      <UserProfile/>
    </div>
  )
}

export default Profile
