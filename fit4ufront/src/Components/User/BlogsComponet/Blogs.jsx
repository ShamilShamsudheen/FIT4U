import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userAxiosInstance } from '../../../axios/axios'
import { BiFilter } from 'react-icons/bi';
import { FaSearch } from 'react-icons/fa';

function Blogs() {
    const [createrName, setCreaterName] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [blogDetails, setBlogDetails] = useState([])
    const [blogCategory, setBlogCategory] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([]);

    const navigate = useNavigate()
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
        const fetchCategory = async () => {
            try {
                await userAxiosInstance.get('/blogsCategory').then((res) => {
                    setBlogCategory(res.data)
                })
            } catch (error) {

            }
        }
        fetchCategory()
        fetchBlog()
    }, [])
    const handleBlog = async (blogId) => {
        navigate(`/singleBlogs/${blogId}`);
    }
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const handleSearch = () => {
        userAxiosInstance.get('/getBlogSearch', { createrName }).then((res) => {
            setBlogDetails(res.data.searchedBlogs)
        })
    }
    console.log(blogCategory)
    const handleCategorySelection = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(item => item !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };
    const handleSendSelectedCategories = async () => {
        try {
            await userAxiosInstance.post('/sendSelectedCategories', { selectedCategories });
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div className="flex flex-col-reverse md:flex-row justify-center">
            <div className="w-full md:w-3/4 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500 hover:scrollbar-track-gray-200 scrollbar-hidden" style={{ maxHeight: '80vh' }}>
                {blogDetails.map((blog) => (
                    <div className="w-full rounded overflow-hidden shadow-lg mb-4">
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
            <div className='w-full md:w-1/4 p-4 text-white bg-transparent border border-rounded-white items-start overflow-y-auto' style={{ maxHeight: '80vh' }}>
                <div className="mb-4 flex items-center">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full p-2 rounded border bg-transparent text-white"
                        name='searchName'
                        value={createrName}
                        onChange={(e) => setCreaterName(e.target.value)}
                    />

                    <button className="ml-2 border text-white px-3 py-3 rounded" onClick={handleSearch}>
                        <FaSearch className="mr-2" />
                    </button>
                </div>
                <div className="mb-4">
                    <button className="text-blue-500" onClick={() => setShowFilters(!showFilters)}>
                        <BiFilter className="inline-block mr-2" /> Filter
                    </button>
                </div>
                <div className={showFilters ? 'block' : 'hidden'}>
                    {blogCategory.map((item) => (
                        <label key={item} className="block">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={selectedCategories.includes(item)}
                                onChange={() => handleCategorySelection(item)}
                            />
                            {item}
                        </label>
                    ))}
                    <button className="mt-4 bg-blue-500 text-white px-3 py-2 rounded" onClick={handleSendSelectedCategories}>
                        Send Selected Categories
                    </button>
                </div>

            </div>

        </div>
    )
}

export default Blogs;
