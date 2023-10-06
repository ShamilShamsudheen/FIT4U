import React ,{ useEffect, useState } from "react";
import { userAxiosInstance } from "../../../axios/axios";
import { truncateString } from "../../../Constants/Constants";

function LBlog() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    userAxiosInstance.get("/blogs").then((res) => {
      setBlogs(res.data.blogData);
      console.log(res.data.blogData);
    });
  }, []);

  return (
    <div
      className="bg-slate-950  flex flex-col items-center  py-8"
      id="blogs"
    >
      <div className="blog-slide mx-auto top-0 mb-6">
        <h3 className="text-3xl font-bold relative inline-block group">
          Blogs
          <span className="absolute left-0 -bottom-0.5 mt-1 w-full h-1 bg-amber-500 transform scale-x-0 transition-transform origin-left group-hover:scale-x-100"></span>
        </h3>
      </div>

      {blogs && (
        <div className="w-full flex justify-center overflow-x-auto">
          {blogs.map((blog) => (
            <div
              className="flex w-2/3 bg-slate-50  rounded mt-2 mb-2"
              key={blog.id}
            >
              <div className="bg-yellow  w-1/2 flex justify-center">
                <img
                  src={blog.blog_template}
                  alt="blog image"
                  className="rounded"
                />
              </div>
              <div className="bg-blue w-2/3 flex justify-center">
                <div className="w-2/3">
                  <h3 className="text-xl text-slate-800">{blog.blog_title}</h3>
                  <p className="text-slate-800 text-xs">
                    {truncateString(blog.blog_content, 400)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LBlog;
