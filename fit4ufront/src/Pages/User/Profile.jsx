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
      <Header />
      <div className='trainer-list bg-black mt-80'>
        <div className=''>
          <div className="flex text-red-900 justify-center w-full mt-4">
            <h2 className="uppercase font-semibold text-2xl text-center">
              <span className=" text-lg tracking-wide font-Mogra font-extrabold">
                Profile
              </span>
            </h2>
          </div>
          <UserProfile />
        </div>
      </div>
    </div>
  )
}

export default Profile
