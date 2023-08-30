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
  <div className="blog-slide mx-auto top-0 mb-6">
    <h3 className="text-3xl font-bold animate-slide-top">Blog</h3>
  </div>
  {blogs && (
    <div className="flex overflow-x-auto space-x-4">
      {/* Left side (Blogs) */}
      <div className="flex-shrink-0">
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

      {/* Right side (Heading and Paragraph) */}
      <div className="flex-shrink-0 p-4 bg-trainsparent rounded-lg">
        <h1 className="text-2xl font-semibold text-white">Blog Information</h1>
        <p className="text-gray-300 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod...
        </p>
      </div>
    </div>
  )}
  <hr className="w-5/6 my-4 bg-gray-300" />
</div>

  );
}

export default LBlog;
