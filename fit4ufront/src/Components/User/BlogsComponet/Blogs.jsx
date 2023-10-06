import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAxiosInstance } from '../../../axios/axios';
import { FaSearch } from 'react-icons/fa';
import { BiFilter } from 'react-icons/bi';

const Blogs = () => {
    const [creatorName, setCreatorName] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [blogDetails, setBlogDetails] = useState([]);
    const [blogCategory, setBlogCategory] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const blogsPerPage = 3;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await userAxiosInstance.get('/blogs');
                setBlogDetails(response.data.blogData);
            } catch (error) {
                console.log(error.message);
            }
        };

        const fetchCategory = async () => {
            try {
                const response = await userAxiosInstance.get('/blogsCategory');
                setBlogCategory(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategory();
        fetchBlog();
    }, []);

    // Filter blogs based on selected categories
    const filteredBlogs = blogDetails.filter((blog) => {
        return selectedCategories.length === 0 || selectedCategories.includes(blog.blog_category);
    });

    // Paginate function
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Get current blogs for the current page
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    // Handle blog click
    const handleBlog = (blogId) => {
        navigate(`/singleBlogs/${blogId}`);
    };

    // Handle search
    const handleSearch = () => {
        userAxiosInstance.get('/getBlogSearch', { creatorName }).then((res) => {
            setBlogDetails(res.data.searchedBlogs)
        })
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
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
        <div className="w-full bg-slate-950 flex flex-col md:flex-row justify-center">
            <div className="flex w-full gap-2 space-x-4">
                <div className="w-full md:w-2/3 items-center space-x-2">
                    <div className="w-full md:w-3/4 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500 hover:scrollbar-track-gray-200 scrollbar-hidden" style={{ maxHeight: '80vh' }}>
                        {currentBlogs.map((blog) => (
                            <div key={blog._id} className="w-full rounded overflow-hidden shadow-lg mb-4">
                                {/* Your Blog Card Component */}
                                <div onClick={() => handleBlog(blog._id)} className="cursor-pointer">
                                    <img className="object-cover w-full" src={blog.blog_template} alt="Blog" />
                                    <div className="px-6 py-4 bg-transparent text-gray-50 border-rounded-4">
                                        <div className="font-bold text-xl mb-2">{blog.blog_title}</div>
                                        <p className="text-sm">
                                            <span>{blog.blog_category}</span> | <span className="">{blog.blog_writer}</span>
                                        </p>
                                        <p className="text-blue-500 text-sm">Published on {formatDate(blog.blog_date)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center space-x-2 mt-4 w-full ">
                        <div className=' flex  justify-center bg-gray-900 w-28 rounded-lg mb-2'>
                            {Array.from({ length: Math.ceil(filteredBlogs.length / blogsPerPage) }, (_, index) => (
                                <button
                                    key={index}
                                    className={`text-white ${currentPage === index + 1 ? 'font-bold' : ''} `}
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-full  md:w-1/3 items-center mx-auto mt-4 rounded-lg bg-gray space-x-2">
                    {/* Search Filter Component */}
                    <div className="flex justify-center mt-4 space-x-2 text-slate-300" onClick={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search by Category"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="rounded p-2"
                        />
                        <div className='my-auto'>
                            <FaSearch />
                        </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <button className="text-blue-500" onClick={() => setShowFilters(!showFilters)}>
                            <BiFilter className="inline-block mr-2" /> Filter
                        </button>
                    </div>
                    <div className={`${showFilters ? 'block' : 'hidden'} text-slate-400 flex justify-center`}>
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
                        <button className="mt-4 bg-blue-500 text-white rounded" onClick={handleSendSelectedCategories}>
                            Sort it
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Blogs;
