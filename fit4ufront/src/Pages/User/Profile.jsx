import React from 'react'
import Header from '../../Components/User/Header/Header'
import UserProfile from '../../Components/User/UserProfile/UserProfile';
import bg from '../../assets/img/gallery/section_bg01.png'


function Profile() {
    const style = {
        backgroundImage: `url(${bg})`,
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
