import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import logo from '../../../assets/logo-1.png';
import { toast } from 'react-hot-toast';
import { storage } from '../../../firebase/config'
import { ref, uploadBytes } from 'firebase/storage';
import { fileUpload } from '../../../Constants/Constants';
import Background from '../../Background/Background';
import Button from '../../Button/Button';
import { trainerAxiosInstance } from '../../../axios/axios';
const initialValues = {
  name: '',
  email: '',
  mob: '',
  pass: '',
  repass: '',
  role: 'trainer'
};

const validate = (values) => {
  let errors = {};

  if (!values.name || values.name.trim() === '') {
    errors.name = 'This field is required';
  }
  if (!values.email || values.email.trim() === '') {
    errors.email = 'This field is required';
  }
  if (!values.mob || values.mob.trim() === '') {
    errors.mob = 'This field is required';
  }
  if (!values.pass || values.pass.trim() === '') {
    errors.pass = 'This field is required';
  }
  if (!values.repass || values.repass.trim() === '') {
    errors.repass = 'This field is required';
  }
  if (values.pass !== values.repass) {
    errors.repass = 'Password is incorrect';
  }
  return errors;
};

function TrainerSignUp() {
  const navigate = useNavigate()
  const [modal, setModal] = useState(false)
  const [resume, setResume] = useState('')
  const [description, setDescription] = useState('')
  const [certificate, setCertificate] = useState('');
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      console.log(values);
      try {
        await trainerAxiosInstance.post('/signUp', { values }).then((res) => {
          if (res.data.status) {
            toast.success(res.data.message)
            setModal(true);
          } else {
            toast.error(res.data.message)
          }
        })

      } catch (error) {

      }
    }
  });
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
    console.log(resume)
  };

  const handleCertificateChange = (e) => {
    const files = e.target.files[0];
    setCertificate(files);
  };
  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(certificate,resume)
    const email = formik.values.email
    const resumeUrl = await fileUpload('trainer-resume/',resume)
    const certificateUrl = await fileUpload('trainer-certificates/',certificate)
    const values = {
      ...formik.values,
      resumeUrl,
      certificateUrl,
      description
    }
    console.log(resumeUrl,certificateUrl)
    trainerAxiosInstance.post('/signUp', { values }).then((res) => {
      toast.success(res.data.message)
      navigate('/trainer/login')
    });
  }
  return (
    <div>
      <Background/>
    <div className="sm:mx-auto sm:w-full sm:max-w-md mt-4">
          {!modal ?
            <div className="bg-gray-100 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <img className="mx-auto h-12 w-auto" src={logo} alt="Workflow" />
            </div>
            <hr className="w-full border border-red-500 mt-3" />
            <form className="mt-4" onSubmit={formik.handleSubmit}>
              <div>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="name"
                    name="name"
                    placeholder="Enter Your Name"
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="appearance-none block w-full px-3 py-2 border border-white rounded-md placeholder-gray-400 hover:border-red-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
                <div style={{ color: '#eb070f' }}>
                  {formik.touched.name && formik.errors.name ? formik.errors.name : ''}
                </div>
              </div>
              <div className="mt-4">
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    type="email"
                    required
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="appearance-none block w-full px-3 py-2 border border-white rounded-md placeholder-gray-400 hover:border-red-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
                <div style={{ color: '#eb070f' }}>
                  {formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                </div>
              </div>
              <div className="mt-4">
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="phone"
                    name="mob"
                    placeholder="Mobile No."
                    type="text"
                    required
                    value={formik.values.mob}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="appearance-none block w-full px-3 py-2 border border-white rounded-md placeholder-gray-400 hover:border-red-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
                <div style={{ color: '#eb070f' }}>
                  {formik.touched.mob && formik.errors.mob ? formik.errors.mob : ''}
                </div>
              </div>
              <div className="mt-4">
                <div className="mt-1 rounded-md shadow-sm">
                  <input
                    id="password"
                    name="pass"
                    type="password"
                    required
                    placeholder="Password"
                    value={formik.values.pass}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="appearance-none block w-full px-3 py-2 border border-white rounded-md placeholder-gray-400 hover:border-red-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
                <div style={{ color: '#eb070f' }}>
                  {formik.touched.pass && formik.errors.pass ? formik.errors.pass : ''}
                </div>
              </div>
              <div className="mt-4">
                <div className="mt-1 rounded-md shadow-sm">
                  <input
                    id="password_confirmation"
                    name="repass"
                    type="password"
                    required
                    placeholder="Confirm password"
                    value={formik.values.repass}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="appearance-none block w-full px-3 py-2 border border-white rounded-md placeholder-gray-400 hover:border-red-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
                <div style={{ color: '#eb070f' }}>
                  {formik.touched.repass && formik.errors.repass ? formik.errors.repass : ''}
                </div>
              </div>
              <div id ='recaptcha-container'></div>
              <div className="mt-4 flex justify-center">
                <Button
                  buttonText="Create Account"
                  className="w-full py-3 text-xs uppercase font-semibold rounded-md duration-300 mx-auto"
                  type="submit"
                />
              </div>

              <div className="mt-2 flex justify-center">
                <p className="text-sm">
                  Already a member? <Link to="/trainer/login" className="text-red-500 underline">Login Here</Link>
                </p>
              </div>
            </form>
          </div>
            :
            <div className="bg-gray-100 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <img className="mx-auto h-12 w-auto" src={logo} alt="Workflow" />
            </div>
            <hr className="w-full border border-red-500 mt-3" />
              <div className="flex mt-3">
                <label htmlFor="resume" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                  Upload Resume
                </label>
                <input
                  id="resume"
                  type="file"
                  name="resume"
                  className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  onChange={handleResumeChange}
                />
              </div>
              <div className="flex">
                <label htmlFor="certificate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                  Upload Certificates
                </label>
                <input
                  id="certificate"
                  type="file"
                  name="certificate"
                  className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  onChange={handleCertificateChange}
                  multiple
                />
              </div>
              <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-grey-300">
                <label htmlFor="comment" className="sr-only text-black">description You</label>
                <textarea
                  id="comment"
                  rows="4"
                  className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-white-800 focus:ring-0 dark:text-grey-300 dark:placeholder-gray-400"
                  placeholder="description You..."
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          }
        </div>
        </div>

  );
}

export default TrainerSignUp;
