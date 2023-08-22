import React, { useEffect, useState } from 'react';
import { userAxiosInstance } from '../../../axios/axios';

function LBlog() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    userAxiosInstance.get('/blogs').then((res) => {
      setBlogs(res.data.blogData);
      console.log(res.data.blogData);
    });
  }, []);

  return (
    <div className="bg-black flex flex-col items-center min-h-screen py-8" id="blogs">
      <div className="blog-slide mx-auto top-0 mb-2">
        <h3 className="text-3xl font-bold animate-slide-top">Blog</h3>
      </div>
      {blogs && (
        <div className="flex overflow-x-auto space-x-4 ">
          {blogs.map((blog) => (
            <div key={blog.id} className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={blog.blog_template} alt="Blog" className="w-full h-32 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{blog.blog_title}</h2>
                <p className="text-gray-500">{blog.blog_writer}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
}

export default LBlog;
