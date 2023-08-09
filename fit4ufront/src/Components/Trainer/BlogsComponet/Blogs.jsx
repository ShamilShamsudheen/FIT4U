import React, { useEffect, useState } from 'react';
import { FaUser, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { trainerAxiosInstance } from '../../../axios/axios';
import { toast } from 'react-hot-toast';

function Blogs() {
    const navigate = useNavigate();
    const [blogDetails, setBlogDetails] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

    useEffect(() => {
        trainerAxiosInstance.get('/blogs').then((res) => {
            setBlogDetails(res.data.blogData);
        });
    }, []);

    const handleBlog = async (blogId) => {
        navigate(`/singleBlogs/${blogId}`);
    };

    const formatDate = (date) => {
        const now = new Date();
        const blogDate = new Date(date);
        const diffInMilliseconds = Math.abs(now - blogDate);

        const minute = 60 * 1000;
        const hour = 60 * minute;
        const day = 24 * hour;
        const month = 30 * day;
        const year = 12 * month;

        if (diffInMilliseconds < minute) {
            return 'Just now';
        } else if (diffInMilliseconds < hour) {
            const minutesAgo = Math.floor(diffInMilliseconds / minute);
            return `${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`;
        } else if (diffInMilliseconds < day) {
            const hoursAgo = Math.floor(diffInMilliseconds / hour);
            return `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`;
        } else if (diffInMilliseconds < month) {
            const daysAgo = Math.floor(diffInMilliseconds / day);
            return `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`;
        } else if (diffInMilliseconds < year) {
            const monthsAgo = Math.floor(diffInMilliseconds / month);
            return `${monthsAgo} ${monthsAgo === 1 ? 'month' : 'months'} ago`;
        } else {
            const yearsAgo = Math.floor(diffInMilliseconds / year);
            return `${yearsAgo} ${yearsAgo === 1 ? 'year' : 'years'} ago`;
        }
    }

    const handleBlogDelete = async (blogId) => {
        await trainerAxiosInstance
            .post('/deleteBlog', { blogId })
            .then((res) => {
                toast.error(res.data.message);
            });
    };

    const handleBlogEdit = async (blogId) => {
        navigate(`/trainer/editBlog/${blogId}`);
    };

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <div className="flex justify-center mt-10 bg-transparent">
            <div className="grid grid-cols-3 gap-6 mt-6">
                {blogDetails.map((blog) => (
                    <div key={blog._id} className='max-w-sm rounded overflow-hidden shadow-lg border-rounded-4'>
                        <div className="flex justify-center w-full rounded overflow-hidden shadow-lg">
                            <img
                                className="object-cover w-full h-full"
                                src={blog.blog_template}
                                alt="Profile image"
                            />
                        </div>
                        <div className="px-6 py-4 bg-white text-black border-rounded-4">
                            <div className="font-bold text-xl mb-2 uppercase cursor-pointer hover:text-blue-500" onClick={() => handleBlog(blog._id)}>{blog.blog_title}</div>
                            <p className="text-base flex space-x-2">
                                <span>{blog.blog_category}</span> | <span className=' flex space-x-2'><FaUser className='mt-1 ml-2'/> {blog.blog_writer}</span>
                            </p>
                            <span>{formatDate(blog.blog_date)}</span>
                            <div className="flex space-x-2 justify-between">
                                <button onClick={() => handleBlogEdit(blog._id)} className='text-blue-500 hover:bg-blue-100 px-2 py-1 rounded'>
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleBlogDelete(blog._id)} className="text-red-500 hover:bg-red-100 px-2 py-1 rounded">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <button onClick={toggleDarkMode} className={`fixed right-5 bottom-5 p-2 rounded-full ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button> */}
        </div>
    );
}

export default Blogs;
