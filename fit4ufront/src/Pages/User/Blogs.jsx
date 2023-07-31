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
      <Header/>
      <Blogs/>
    </div>
  )
}

export default BlogsPage
