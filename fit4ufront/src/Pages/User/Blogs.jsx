import React from 'react'
import Header from '../../Components/User/Header/Header'
import heroImage from '../../assets/h1_hero.png'
import Blogs from '../../Components/User/BlogsComponet/Blogs';

function BlogsPage() {
  const style = {
    backgroundImage: `url(${heroImage})`,
    width: '98.9vw',
    height: '100vh',
    backgroundSize: 'cover'
  };
  return (
    <div className="BlogsPage" style={style}>
      <Header />
      <div className="flex justify-center h-72 items-center main-slide">
        <h3 className="slide-text animate-slide-top">Top blogs</h3>
      </div>
      <div className="trainer-list bg-black flex justify-center">
        <div className="w-full flex justify-center">
              <Blogs />
        </div>
      </div>
    </div>
  )
}

export default BlogsPage
