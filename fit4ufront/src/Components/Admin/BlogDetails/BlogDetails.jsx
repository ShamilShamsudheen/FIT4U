import React, { useEffect, useState } from 'react'
import { FiEye } from 'react-icons/fi';
import { adminAxiosInstance } from '../../../axios/axios';

function BlogDetails() {
    const [blogData ,setBlogData] = useState([])
    useEffect(()=>{
        adminAxiosInstance.get('/blogDetails').then((res)=>{
            setBlogData(res.data.blogDetails)
        })
    },[])
  return (
    <div className=''>
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
            <td className="px-6 py-4">
              <FiEye />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default BlogDetails
