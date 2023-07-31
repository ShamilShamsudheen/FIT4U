import React, { useEffect, useState } from 'react'
import { userAxiosInstance } from '../../axios/axios'
import { useParams } from 'react-router-dom'

function SingleBlogComponent() {
    const [singleBlog, setSingleBlog] = useState([])
    const { blogId } = useParams()
    useEffect(() => {
        console.log(blogId)
        if (blogId) {
            trainerAxiosInstance
                .get(`/singleBlog/${blogId}`)
                .then((res) => {
                    setSingleBlog(res.data.blogData)
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [])
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    console.log(singleBlog)
    return (
        <div className='w-full h-full bg-white mt-10 backdrop-filter backdrop-blur-lg'>
            <div className="flex flex-col items-center justify-center min-h-screen w-1/3 mx-auto mt-10">
                <h2 className="text-xl font-bold mt-2 mb-3 ">{singleBlog.blog_title}</h2>
                <img src={singleBlog.blog_template} alt="Blog" className="mb-2" />
                <p className="text-blue-500 text-sm">Published on {formatDate(singleBlog.blog_date)}</p>
                <p className="text-blue-500 text-sm"><span>{singleBlog.blog_category}</span> | created by  <span className='text-red-900 font-bold uppercase ml-2'>  {singleBlog.blog_writer}</span></p>
                <p className="mt-4 text-grey">
                    {singleBlog.blog_content}
                </p>
            </div>
            
        </div>

    )
}

export default SingleBlogComponent
