import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import logo from '../../../assets/logo-1.png';
import { TrainerApi } from '../../../api/api';
import { toast } from 'react-hot-toast';
import Button from '../../Button/Button';
import Background from '../../Background/Background';

const initialValues = {
  email: '',
  pass: '',
  role:'trainer'
};

const validate = (values) => {
  let errors = {};
  if (!values.email || values.email.trim() === '') {
    errors.email = 'This field is required';
  }
  if (!values.pass || values.pass.trim() === '') {
    errors.pass = 'This field is required';
  }
  return errors;
};

function TrainerLogin() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      try {
          await TrainerApi.post('/trainer/login', { values }).then((res)=>{
          if(res.data.status) {
            localStorage.setItem('trainerToken',res.data.token)
            toast.success(res.data.message)
            navigate('/trainer')
          }else{
            toast.error(res.data.message)
          }
        })
        
      } catch (error) {
        console.log(error.message);
      }
    }
  });
  return (
    <div>
            <Background />
            <div className="sm:mx-auto sm:w-full sm:max-w-md mt-6 ">
                <div className="bg-gray-100 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <img className="mx-auto h-12 w-auto" src={logo} alt="Workflow" />
                    </div>
                    <hr className="w-full border border-red-500 mt-3" />
                    <form className="mt-4" onSubmit={formik.handleSubmit}>

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

                        <div id='recaptcha-container'></div>
                        <div className="mt-4 flex justify-center">
                            <Button
                                buttonText="Login"
                                className="w-full py-3 text-xs uppercase font-semibold rounded-md duration-300 mx-auto"
                                type="submit"
                            />
                        </div>
                        
                        <div className="mt-4 flex justify-center">
                            <p className="text-sm">
                                create a account? <Link to="/trainer/signup" className="text-red-500 underline">Register Here</Link>
                            </p>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
  );
}

export default TrainerLogin;

