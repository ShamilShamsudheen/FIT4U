import Blogs from '../../Components/Trainer/BlogsComponet/Blogs';
import BlogForm from '../../Components/Trainer/TrainerBlog/BlogForm';
import TrainerHeader from '../../Components/Trainer/TrainerHeader/TrainerHeader';
import heroImage from '../../assets/h1_hero.png'
import React from 'react'

function TrainerBlog() {
  const style = {
    backgroundImage: `url(${heroImage})`,
    width: '98.8vw',
    height: '100vh',
    backgroundSize: 'cover'
  };
  return (
    <div style={style}>
      <TrainerHeader />
      <div className='trainer-list bg-black mt-80 '>
        <div className='text-red-900 mx-auto'>
          <div className="flex justify-center w-full mt-4">
            <h2 className="uppercase font-semibold text-2xl text-center">
              <span className=" text-lg tracking-wide font-Mogra font-extrabold">
                Top Blogs
              </span>
            </h2>
          </div>
          <Blogs />
          <BlogForm />
        </div>
      </div>
    </div>
  )
}

export default TrainerBlog
