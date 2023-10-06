import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { userAxiosInstance } from '../../../axios/axios'

function SingleBlogComponent() {
    const [singleBlog, setSingleBlog] = useState([])
    const { blogId } = useParams()
    useEffect(() => {
        console.log(blogId)
        if (blogId) {
            userAxiosInstance
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
        <>
            <div className='bg-slate-950 w-full flex justify-center'>
                <div className='mt-4 mb-4 flex justify-center'>
                    <div className='flex flex-col sm:flex-row w-3/4 space-x-0 sm:space-x-4 space-y-4'>
                        <div className='w-full sm:w-1/2 my-auto '>

                            <h1 className='text-2xl text-slate-300 uppercase font-bold'>{singleBlog.blog_title}</h1>
                            <img src={singleBlog.blog_template} alt="" className='w-full rounded-2xl' />
                            <p className="text-blue-500 text-xs mt-2">Published on {formatDate(singleBlog.blog_date)}</p>
                            <p className="text-blue-500 text-x mt-2"><span>{singleBlog.blog_category}</span>
                                | created by
                                <span className='text-slate-700 text-xl font-bold uppercase ml-2'>  {singleBlog.blog_writer}</span>
                            </p>
                        </div>
                        <div className='w-full sm:w-1/2 items-start mt-4 sm:mt-0 my-auto'>
                            <h1 className='text-2xl text-slate-300 uppercase font-bold'>To read :</h1>
                            <p className='text-md text-slate-500 mt-4'>{singleBlog.blog_content}</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SingleBlogComponent
