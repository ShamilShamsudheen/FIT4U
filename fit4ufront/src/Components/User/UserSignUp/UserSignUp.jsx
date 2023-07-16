import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import logo from '../../../assets/logo-1.png';
import { UserApi } from '../../../api/api';
import { auth, firebase } from '../../../firebase/config';
import { toast } from 'react-hot-toast';
import Background from '../../Background/Background';
import Button from '../../Button/Button';

const initialValues = {
  name: '',
  email: '',
  mob: '',
  pass: '',
  repass: '',
  role: 'user'
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
  } else if (!/(?=.*[A-Z])(?=.*\W)/.test(values.pass)) {
    errors.pass = 'Password must include at least one capital letter and one special character';
  }
  if (!values.repass || values.repass.trim() === '') {
    errors.repass = 'This field is required';
  }
  if (values.pass !== values.repass) {
    errors.repass = 'Password is incorrect';
  }
  return errors;
};

function UserSignUp() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [result, setResult] = useState();

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      const mobile = `+91${values.mob}`;
      try {
        await UserApi.post('/signUp', { values }).then((res) => {
          if (res.data.status) {
            toast.success(res.data.message);

            const verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
            auth.signInWithPhoneNumber(mobile, verify).then((res) => {
              setResult(res);
              setModal(true);
            });
          } else {
            toast.error(res.data.message);
          }
        });
      } catch (error) {
        console.log('Error occurred during sign up:', error);
      }
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = formik.values;
    try {
      result.confirm(otp).then(() => {
        console.log(result);
        console.log('Success');
        UserApi.post('/signUp', { values, otp })
          .then((res) => {
            toast.success(res.data.message);
            navigate('/login');
          })
          .catch((error) => {
            toast.error('Mobile number verification failed');
          });
      });
    } catch (error) {
      console.log('Error occurred during OTP verification:', error);
    }
  };

  return (
    <div>
      <Background />
      <div className="sm:mx-auto sm:w-full sm:max-w-md mt-4">
        {!modal ? (
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
                  Already a member? <Link to="/login" className="text-red-500 underline">Login Here</Link>
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-gray-100 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <img className="mx-auto h-12 w-auto" src={logo} alt="Workflow" />
            </div>
            <p>Verify OTP</p>
            <hr className="w-full border border-red-500 mt-3" />
            <form className="mt-4" onSubmit={handleSubmit}>
              <input
                type="text"
                className="text-center border-spacing-2 mb-5"
                placeholder="Enter OTP"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <br />
              <div className="mt-4 flex justify-center">
                <Button
                  buttonText="Verify OTP"
                  className="w-full py-3 text-xs uppercase font-semibold rounded-md duration-300 mx-auto"
                  type="submit"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserSignUp;
