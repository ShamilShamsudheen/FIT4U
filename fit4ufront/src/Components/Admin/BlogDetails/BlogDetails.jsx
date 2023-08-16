import React, { useEffect, useState } from 'react';
import { FiEye } from 'react-icons/fi';
import { adminAxiosInstance } from '../../../axios/axios';

function BlogDetails() {
  const [blogData, setBlogData] = useState([]);
  const [singleBlog, setSingleBlog] = useState({});
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    adminAxiosInstance.get('/blogDetails').then((res) => {
      setBlogData(res.data.blogDetails);
    });
  }, []);

  const handleView = (id) => {
    try {
      adminAxiosInstance.get(`/singleBlog/${id}`).then((res) => {
        setSingleBlog(res.data.blog);
        setOpen(true);
      });
    } catch (error) {
      // Handle the error if needed
    }
  };

  return (
    <div className="relative">
      <table className="w-full text-sm text-left mt-14 text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Blog Writer
            </th>
            <th scope="col" className="px-6 py-3">
              Blog Category
            </th>
            <th scope="col" className="px-6 py-3">
              Blog Status
            </th>
            <th scope="col" className="px-6 py-3">
              Blog view
            </th>
          </tr>
        </thead>
        <tbody>
          {blogData.map((blog) => (
            <tr
              key={blog.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">{blog.blog_writer}</td>
              <td className="px-6 py-4">{blog.blog_category}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className={`h-2.5 w-2.5 rounded-full ${blog.blog_approve ? 'bg-green-500' : 'bg-red-500'} mr-2`} />
                  {blog.blog_approve ? 'Approved' : 'Not Approved'}
                </div>
              </td>
              {/* ... table row data */}
              <td className="px-6 py-4">
                <div onClick={() => handleView(blog._id)}>
                  <FiEye />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isOpen && (
        <div className="modal fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="modal-content w-full max-w-5xl bg-white rounded-lg p-6 flex h-96 overflow-hidden">
            <div className="modal-image w-1/2 pr-4">
              <img src={singleBlog.blog_template} alt="Image" className="object-cover w-full h-full rounded-l-lg" />
            </div>
            <div className="modal-text w-1/2 pl-4 overflow-y-auto">
              <h2 className="text-xl font-semibold mb-2">{singleBlog.blog_title}</h2>
              <p>Category: {singleBlog.blog_category}</p>
              <p className="mt-2">{singleBlog.blog_content}</p>
              <button onClick={() => setOpen(false)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Close</button>
            </div>
          </div>
        </div>
      )}



    </div>
  );
}


export default BlogDetails;
