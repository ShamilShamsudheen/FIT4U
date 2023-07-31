import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { trainerAxiosInstance } from '../../../axios/axios'

function Blogs() {
    const navigate = useNavigate()
    const [blogDetails,setBlogDetails] = useState([])
    useEffect(()=>{
        trainerAxiosInstance.get('/blogs').then((res)=>{
            setBlogDetails(res.data.blogData)
        })
    },[])
    const handleBlog = async(blogId)=>{
        navigate(`/singleBlogs/${blogId}`);
    }
    return (
        <div className="flex justify-center mt-10">
            <div className="grid grid-cols-3 gap-6 mt-6">
            {blogDetails.map((blog)=>(
                <div class="max-w-sm rounded overflow-hidden shadow-lg border-rounded-4">
                    <div className="flex justify-center w-full rounded overflow-hidden shadow-lg">
                        <img
                            className="object-cover w-full h-full"
                            src={blog.blog_template}
                            alt="Profile image"
                        />
                    </div>
                    <div class="px-6 py-4 bg-white text-black border-rounded-4">
                        <div class="font-bold text-xl mb-2 uppercase cursor-pointer hover:text-blue-500" onClick={()=>handleBlog(blog._id)}>{blog.blog_title}</div>
                        <p class=" text-base">
                            <span>{blog.blog_category}</span> | <span className='uppercase'>{blog.blog_writer}</span>
                        </p>
                    </div>
                </div>
            ))}
            </div>

        </div>
    )
}

export default Blogs;
