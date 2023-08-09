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
      <div className='trainer-list bg-black mt-80 '>
        <div className='text-red-900 mx-auto'>
          <div className="flex justify-center w-full mt-4">
            <h2 className="uppercase font-semibold text-2xl text-center">
              <span className=" text-lg tracking-wide font-Mogra font-extrabold">
                Top Blogs
              </span>
            </h2>
          </div>
          <div className="flex mt-4">
            <div className="w-4/5">
              <Blogs />
            </div>
            <div className="w-1/5 bg-gray-100">
              {/* Content for the second column */}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default BlogsPage
