import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import logo from '../../../assets/logo-1.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Background from '../../Background/Background';
import Button from '../../Button/Button';
import { GoogleLogin } from 'react-google-login';
import { userAxiosInstance } from '../../../axios/axios';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../../Redux/app/userSlice';
import {gapi} from 'gapi-script'

const initialValues = {
    email: '',
    pass: '',
    role: 'user'
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

function UserLogin() {
    const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
    useEffect(()=>{
        gapi.load("client:auth2",()=>{
            gapi.auth2.init({clientId:CLIENT_ID})
        })
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: async (values) => {
            try {
                await userAxiosInstance.post('/login', { values }).then((res) => {
                    if (res.data.status) {
                        localStorage.setItem('userToken', res.data.token)
                        const { token } = res.data
                        dispatch(userLogin({
                            token: token,
                            username: token.username
                        }))
                        toast.success(res.data.message)
                        navigate('/');
                    }
                })

            } catch (error) {
                console.log('Error occurred during sign up:', error);
            }
        }
    });

    const responseGoogle = async(response) => {
        if (response.accessToken) {
          // Successful sign-in
          console.log("Access Token:", response.accessToken);
          console.log("User ID:", response.profileObj.googleId);
          console.log("User Email:", response.profileObj.email);
          console.log("User Name:", response.profileObj.name);
          console.log("User Name:", response);
          const {profileObj} = response
          await userAxiosInstance.post('/login', { profileObj }).then((res) => {
            if (res.data.status) {
                localStorage.setItem('userToken', res.data.token)
                const { token } = res.data
                dispatch(userLogin({
                    token: token,
                    username: token.username
                }))
                toast.success(res.data.message)
                navigate('/');
            }
        })
        } else {
          // Sign-in failed
          console.log("Google Sign-in Failed:", response.error);
        }
      };
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
                        <div className='mt-4 flex justify-center' id='signInButton'>
                            <GoogleLogin
                                clientId={CLIENT_ID}
                                buttonText="Login with Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={"single_host_origin"}
                            />
                        </div>
                        <div className="mt-4 flex justify-center">
                            <p className="text-sm">
                                create a account? <Link to="/signup" className="text-red-500 underline">Register Here</Link>
                            </p>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserLogin;
