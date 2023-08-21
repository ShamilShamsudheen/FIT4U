import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import logo from '../../../assets/logo-1.png'
import { fileUpload } from '../../../Constants/Constants';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { userAxiosInstance } from '../../../axios/axios';
import Button from '../../Button/Button';


const initialValues = {
  age: '',
  height: '',
  weight: '',
  goal: '',
}
const validate = (values) => {
  let errors = {};

  if (!values.age || values.age.trim() === '') {
    errors.age = 'This field is required';
  } else if (parseInt(values.age) < 16) {
    errors.age = 'Age must be at least 16 or above';
  }

  if (!values.height || values.height.trim() === '') {
    errors.height = 'This field is required';
  } else if (parseInt(values.height) < 120) {
    errors.height = 'Height must be at least 120 cm or above';
  }

  if (!values.weight || values.weight.trim() === '') {
    errors.weight = 'This field is required';
  } else if (parseInt(values.weight) < 25) {
    errors.weight = 'Weight must be at least 25 kg or above';
  }

  if (!values.goal || values.goal.trim() === '') {
    errors.goal = 'This field is required';
  }

  return errors;
};
function UserProfile() {
  const [showUpload, setShowUpload] = useState(false)
  const [details, setDetails] = useState(false)
  const [detailsForm, setDetailsForm] = useState(false)
  const [status, setStatus] = useState(false)
  const [history, setHistory] = useState(false)
  const [user, setUser] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [paymentHistory,setPaymnetHistory] = useState(null)

  useEffect(() => {
      userAxiosInstance
        .get('/postLogin')
        .then((res) => {
          console.log(res.data.userData);
          setUser(res.data.userData);
        })
        .catch((error) => {
          console.log(error);
        });
        userAxiosInstance.get('/paymentHistory').then((res)=>{
          setPaymnetHistory(res.data.payments)
        })
  }, []);
  console.log(paymentHistory)
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      console.log(values)
      await userAxiosInstance.post('/profile', { values }).then((res) => {

        toast.success(res.data.message)
        setShowUpload(false)
      })
    }
  })
  const handleImageClick = () => {
    setShowInput(!showInput);
  };

  const handleImageInputChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const profileUrl = await fileUpload('userProfile/', file)
      console.log(profileUrl)
      userAxiosInstance.post('/profileImgUpload', { profileUrl }).then((res) => {
        setUser(res.data.updateProfile)
        setShowInput(false);
        toast.success(res.data.message)
      })
    }
  };
  const handleUpload = () => {
    console.log(user)
    formik.setFieldValue('age', user.age)
    formik.setFieldValue('height', user.height)
    formik.setFieldValue('weight', user.weight)
    formik.setFieldValue('goal', user.goal)
    setShowUpload(true)
  }
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };
  return (
    <div class="p-16 bg-transparent">
      <div class="p-8 bg-transparent shadow mt-24 flex flex-col">
        <div className="flex w-2/4 mx-auto items-center justify-center border border-amber-500 rounded-md space-x-4">
          <div className="flex flex-col justify-between">
            <div className="w-40 h-40 bg-indigo-100 mx-auto rounded-full shadow-2xl relative">
              <div className="absolute inset-0 flex items-start justify-start  text-indigo-500" onClick={handleImageClick}>
                <img src={user.profileImg} className="w-full h-full border border-amber-500 rounded-full" alt="" />
              </div>
            </div>
            {showInput && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageInputChange}
                style={{ display: 'none' }}
                ref={(fileInput) => fileInput && fileInput.click()}
              />
            )}
            <p className="text-center text-amber-900 text-xs">Click on the photo to change</p>
          </div>


          <div className="pt-10  pb-12 text-left">
            <h1 className="text-4xl font-medium text-amber-500"><span className='text-xs text-gray-500'>NAME :</span>{user.name}</h1>
            <p className="font-light text-amber-500 mt-3"><span className='text-xs text-gray-500'>EMAIL :</span>{user.email}</p>
            <p className="mt-2 text-amber-500"><span className='text-xs text-gray-500'>MOBILE NO :</span>{user.mobile}</p>
          </div>

        </div>


        <div className="mt-10">
          <div className="mx-auto w-2/4 border-rounded-2">
            <ul className="bg-gray-300 grid grid-flow-col gap-10 text-center text-gray-500rounded-lg p-1">
              <li>
                <a
                  className={`flex justify-center py-2 text-md cursor-pointer ${details ? 'bg-gray-400' : 'bg-gray-300'}`}
                  style={{ fontFamily: 'Kanit, sans-serif' }}
                  onClick={() => {
                    setDetails(!details)
                    // setStatus(!status)
                    setHistory(false)
                  }}
                >
                  Details
                </a>

              </li>
              <li>
                <a
                  className={`flex justify-center py-2 text-md cursor-pointer ${status ? 'bg-gray-400' : 'bg-gray-300'}`}
                  style={{ fontFamily: 'Kanit, sans-serif' }}
                  onClick={() => {
                    setStatus(!status)
                    // setDetails(!details)
                    // setHistory(!history)
                  }}
                >
                  Status
                </a>
              </li>
              <li>
                <a
                  className={`flex justify-center py-2 text-md cursor-pointer ${history ? 'bg-gray-400' : 'bg-gray-300'}`}
                  style={{ fontFamily: 'Kanit, sans-serif' }}
                  onClick={() => {
                    setHistory(!history)
                    setDetails(false)
                    // setStatus(false)
                  }}
                >
                  History
                </a>
              </li>
            </ul>
          </div>

        </div>
        {details &&
          <div className="rounded-lg mt-2 bg-transparent border border-amber-500 shadow-lg p-16 justify-items-center mx-auto w-1/3 items-start">


            <div className=" mt-2">
              <h1 className="text-amber-500 font-bold text-2xl uppercase">Details</h1>
              <div className="py-8 border-b border-indigo-50">
                <div className="flex flex-col items-start"> {/* Add 'items-end' class here */}
                  <p className="ml-1 text-gray-500 font-bold text-xs items-start ">Age: <span className='text-amber-600 text-sm'>{user.age} </span>yr</p>
                  <p className="ml-1 text-gray-500 font-bold text-xs items-start ">Height: <span className='text-amber-600 text-sm'>{user.height} </span>cm</p>
                  <p className="ml-1 text-gray-500 font-bold text-xs items-start ">Weight: <span className='text-amber-600 text-sm'>{user.weight}</span> kg</p>
                  <p className="ml-1 text-gray-500 font-bold text-xs items-start ">Goal: <span className='text-amber-600 text-sm'>{user.goal}</span></p>
                </div>
              </div>
            </div>

            <div className=" mt-8" onClick={handleUpload}>
              <button className="text-white py-2 px-4 rounded-lg bg-amber-700 hover:bg-amber-600 shadow-md font-medium transition-colors">
                Upload
              </button>
            </div>
            {showUpload &&
              (<div className='fixed inset-0 flex items-center justify-center z-50'>
                <div className="bg-white p-8 shadow-lg rounded-lg w-1/2">
                  <div className="bg-gray-100 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                      <img className="mx-auto h-12 w-auto" src={logo} alt="Workflow" />
                    </div>
                    <hr className="w-full border border-red-500 mt-3" />
                    <form className="mt-4" onSubmit={formik.handleSubmit}>

                      <div className="mt-4">
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            id="age"
                            name="age"
                            placeholder="Age"
                            type="text"
                            required
                            value={formik.values.age}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="appearance-none block w-full px-3 py-2 border border-white rounded-md placeholder-gray-400 hover:border-red-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          />
                        </div>
                        <div style={{ color: '#eb070f' }}>
                          {formik.touched.age && formik.errors.age ? formik.errors.age : ''}
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            id="height"
                            name="height"
                            placeholder="height"
                            type="text"
                            required
                            value={formik.values.height}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="appearance-none block w-full px-3 py-2 border border-white rounded-md placeholder-gray-400 hover:border-red-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          />
                        </div>
                        <div style={{ color: '#eb070f' }}>
                          {formik.touched.height && formik.errors.height ? formik.errors.height : ''}
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            id="weight"
                            name="weight"
                            placeholder="weight"
                            type="text"
                            required
                            value={formik.values.weight}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="appearance-none block w-full px-3 py-2 border border-white rounded-md placeholder-gray-400 hover:border-red-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          />
                        </div>
                        <div style={{ color: '#eb070f' }}>
                          {formik.touched.weight && formik.errors.weight ? formik.errors.weight : ''}
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            id="goal"
                            name="goal"
                            placeholder="goal"
                            type="text"
                            required
                            value={formik.values.goal}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="appearance-none block w-full px-3 py-2 border border-white rounded-md placeholder-gray-400 hover:border-red-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          />
                        </div>
                        <div style={{ color: '#eb070f' }}>
                          {formik.touched.goal && formik.errors.goal ? formik.errors.goal : ''}
                        </div>
                      </div>
                      <div id='recaptcha-container'></div>
                      <div className="mt-4 flex justify-center">
                        <Button
                          buttonText="Update"
                          className="w-full py-3 text-xs uppercase font-semibold rounded-md duration-300 mx-auto"
                          type="submit"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>)
            }
          </div>
        }
        { history &&
          <div className="rounded-lg mt-2 bg-transparent border border-amber-500 shadow-lg p-16 justify-items-center mx-auto w-1/3 items-start">

          {/* paymentHistory */}
            <div className=" mt-2">
              <h1 className="text-amber-500 font-bold text-2xl uppercase">Payment History</h1>
              <div className="py-8 border-b border-indigo-50">
                <div className="flex flex-col items-start">
                  <p className="ml-1 text-gray-500 font-bold text-sm items-start ">Payment id: <span className='text-amber-600 text-xs'>{paymentHistory[0]._id}</span></p>
                  <p className="ml-1 text-gray-500 font-bold text-sm items-start ">Trainer Name <span className='text-amber-600 text-xs'>{paymentHistory[0].trainer_name}</span></p>
                  <p className="ml-1 text-gray-500 font-bold text-sm items-start ">Amount: <span className='text-amber-600 text-xs'>{paymentHistory[0].purchase_amount}</span></p>
                  <p className="ml-1 text-gray-500 font-bold text-sm items-start ">Payed Date: <span className='text-amber-600 text-xs'>{formatDate(paymentHistory[0].purchase_date)}</span></p>
                  <p className="ml-1 text-gray-500 font-bold text-sm items-start ">Expired Date: <span className='text-red-900 text-xs'>{formatDate(paymentHistory[0].purchase_expire)}</span></p>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default UserProfile
