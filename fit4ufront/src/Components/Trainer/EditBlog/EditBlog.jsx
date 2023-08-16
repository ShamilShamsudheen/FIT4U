import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { trainerAxiosInstance } from '../../../axios/axios';
import { fileUpload } from '../../../Constants/Constants';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function EditBlog() {
    const navigate = useNavigate()
    const [copy,setCopy] = useState(false)
    const { blogId } = useParams();
    const [trainerDetails, setTrainerDetails] = useState(null)
    const [blogData, setBlogData] = useState([])
    const [templateImg, setTemplate] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await trainerAxiosInstance.get('/postLogin').then((res) => {
                    console.log(res.data.trainerData)
                    setTrainerDetails(res.data.trainerData);
                })
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        const fetchBlog = async (blogId) => {
            try {
                await trainerAxiosInstance.get(`/singleBlog/${blogId}`).then((res) => {
                    setBlogData(res.data.blogData)
                    formik.setFieldValue('blog_title',res.data.blogData.blog_title)
                    formik.setFieldValue('category',res.data.blogData.blog_category)
                    formik.setFieldValue('content',res.data.blogData.blog_content)
                })
            } catch (error) {
                console.log(error);

            }
        }
        fetchBlog(blogId);
    }, []);
    console.log(blogData)
    const initialValues = {
        blog_title: '',
        category: '',
        content: '',
    };
    const onSubmit = async (values, { resetForm }) => {
        console.log(values);

        try {
            if(copy){

                const res = await trainerAxiosInstance.post(`/editBlog/${blogId}`, {
                    values,
                    templateImg,
                }).then((res) => {
    
                    toast.success(res.data.message);
                    resetForm();
                    navigate('/trainer/blog')
                })
            }else {
                const res = await trainerAxiosInstance.post(`/editBlog/${blogId}`, {
                    values,
                    templateImg:blogData.blog_template,
                }).then((res) => {
    
                    toast.success(res.data.message);
                    resetForm();
                    navigate('/trainer/blog')
                })
            }

        } catch (error) {
            console.log('Error:', error.message);
        }

    };
    const validate = (values) => {
        const errors = {};

        if (!values.blog_title) {
            errors.blog_title = 'Blog title is required';
        }

        if (!values.category) {
            errors.category = 'Category is required';
        }

        if (!values.content) {
            errors.content = 'Content is required';
        }

        return errors;
    };
    const formik = useFormik({
        initialValues,
        validate,
        onSubmit,
    });
    const handletemplate = async (e) => {
        if((e.target.files[0])){
            setCopy(true)
        }
        e.preventDefault()
        console.log("object" + e.target.files[0])
        const selectedFile = e.target.files[0];
        const templateUrl = await fileUpload('trainer-blog-template/', selectedFile)
        console.log(templateUrl)
        setTemplate(templateUrl)
    }
    return (
        <div className="mt-6 bg-opacity-50 backdrop-filter backdrop-blur-lg flex justify-center items-center bg-white">
            {/* {blogForm && */}
            <div className="p-8 rounded border border-gray-200 t mt-10 z-10 relative text-black">
                <h1 className="font-medium text-3xl">Edit Blog</h1>
                <br />
                <form onSubmit={formik.handleSubmit}>
                    <div className="mt-8">

                        <input type="hidden" name="trainer_id" value={formik.values.trainer_id} />

                        <label htmlFor="blog_title" className="text-sm text-white-700 block mb-1 font-medium">
                            Blog Title
                        </label>
                        <input
                            type="text"
                            name="blog_title"
                            id="blog_title"
                            className={`bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full ${formik.errors.blog_title && formik.touched.blog_title ? 'border-red-500' : ''
                                }`}
                            placeholder="Enter blog title"
                            value={formik.values.blog_title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.blog_title && formik.touched.blog_title && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.blog_title}</div>
                        )}
                    </div>

                    {/* First Set */}
                    <div className="mt-8 grid lg:grid-cols- gap-4">
                        <div className="">
                            <label htmlFor="category" className="text-sm text-white-700 block mb-1 font-medium">
                                Category
                            </label>
                            <input
                                type="text"
                                name="category"
                                id="category"
                                className={`bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full ${formik.errors.category && formik.touched.category ? 'border-red-500' : ''
                                    }`}
                                value={formik.values.category}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter category"
                            />
                            {formik.errors.category && formik.touched.category && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.category}</div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="content" className="text-sm text-white-700 block mb-1 font-medium">
                                Content
                            </label>
                            <textarea
                                name="content"
                                id="content"
                                className={`bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full h-40 ${formik.errors.content && formik.touched.content ? 'border-red-500' : ''
                                    }`}
                                placeholder="Enter your content here"
                                value={formik.values.content}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            ></textarea>
                            {formik.errors.content && formik.touched.content && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.content}</div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="first_set_instruction" className="text-sm text-white-700 block mb-1 font-medium">
                                Template
                            </label>
                            <input
                                type="file"
                                id="template"
                                className={`bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full`}
                                placeholder="template"
                                onChange={handletemplate}
                            />
                        </div>
                        {!templateImg ? (
                            <div className="mt-3">
                                <img src={blogData.blog_template} alt="Image Preview" className="max-w-full h-auto" />
                            </div>
                        ):(
                            <div className="mt-3">
                                <img src={templateImg} alt="Image Preview" className="max-w-full h-auto" />
                            </div>
                        )}
                    </div>
                    <div className="space-x-4 mt-8">
                        <button
                            type="submit"
                            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
                        >
                            Update
                        </button>
                        
                    </div>
                </form>
            </div>
            {/* } */}


        </div>
    )
}

export default EditBlog
