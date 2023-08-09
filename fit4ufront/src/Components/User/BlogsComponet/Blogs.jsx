import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userAxiosInstance } from '../../../axios/axios'

function Blogs() {
    const navigate = useNavigate()
    const [blogDetails, setBlogDetails] = useState([])
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                await userAxiosInstance.get('/blogs').then((res) => {
                    setBlogDetails(res.data.blogData)
                })
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchBlog()
    }, [])
    const handleBlog = async (blogId) => {
        navigate(`/singleBlogs/${blogId}`);
    }
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    return (
        <div className="w-2/3 mx-auto">
                {blogDetails.map((blog) => (
                        <div className="w-full rounded overflow-hidden shadow-lg">
                            <img
                                className="object-cover w-full"
                                src={blog.blog_template}
                                alt="Blog"
                            />
                        <div className="px-6 py-4 bg-trainsparent text-gray-50 border-rounded-4">
                            <div className="font-bold text-xl mb-2 uppercase cursor-pointer hover:text-blue-500" onClick={() => handleBlog(blog._id)}>{blog.blog_title}</div>
                            <p className="text-sm">
                                <span>{blog.blog_category}</span> | <span className=''>{blog.blog_writer}</span>
                            </p>
                            <p className="text-blue-500 text-sm">Published on {formatDate(blog.blog_date)}</p>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default Blogs;
