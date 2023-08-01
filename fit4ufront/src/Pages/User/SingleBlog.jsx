import React from 'react'
import Header from '../../Components/User/Header/Header'
import heroImage from '../../assets/h1_hero.png'
import SingleBlogComponent from '../../Components/User/SingleBlog/SingleBlogComponent';
import { useParams } from 'react-router-dom';

function SingleBlogPage() {
    const {blogId} = useParams()
  const style = {
    backgroundImage: `url(${heroImage})`,
    width: '98.9vw',
    height: '100vh',
    backgroundSize: 'cover'
  };
  return (
    <div className="SingleBlogPage" style={style}>
      <Header/>
      <SingleBlogComponent blogId={blogId}/>
    </div>
  )
}

export default SingleBlogPage