import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
// import { UserApi } from '../../../api/api';
import { fileUpload } from '../../../Constants/Constants';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { userAxiosInstance } from '../../../axios/axios';


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
  const [details, setDetails] = useState(false)
  const [detailsForm, setDetailsForm] = useState(false)
  const [status, setStatus] = useState(true)
  const [history, setHistory] = useState(true)
  const [user, setUser] = useState([]);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const userJwtToken = localStorage.getItem('userToken');
    if (userJwtToken) {
      userAxiosInstance
        .post('/postLogin', { userJwtToken })
        .then((res) => {
          console.log(res.data.userData);
          setUser(res.data.userData);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      <Navigate to="/login" />;
    }
  }, []);
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      console.log(values)
      await UserApi.post('/profile', { values, id: user._id }).then((res) => {
        console.log(res.data.updatedUser)
        setUser(res.data.updatedUser)
        setDetailsForm(false)
        toast.success(res.data.message)
      })
    }
  })
  const handleImageClick = () => {
    setShowInput(!showInput);
  };

  const handleImageInputChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const profileUrl = await fileUpload('userProfile', file)
      console.log(profileUrl)
      UserApi.post('/profileImgUpload', { profileUrl, id: user._id }).then((res) => {
        setUser(res.data.updateProfile)
        setShowInput(false);
        toast.success(res.data.message)
      })
    }
  };

  return (
    <div class="p-16 bg-transpaarent">
      {/* {user.map((data)=>( */}

      <div class="p-8 bg-white shadow mt-24 flex flex-col">
        <div class="relative flex justify-center">
          <div>
            {/* Image Div */}
            <div
              className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500"
              onClick={handleImageClick}
            >
              <img src={user.profileImg} className="w-full h-full rounded-full" alt="" />
            </div>

            {/* Input to select image */}
            {showInput && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageInputChange}
                style={{ display: 'none' }}
                ref={(fileInput) => fileInput && fileInput.click()}
              />
            )}
          </div>
        </div>
        <br />
        <p class="text-center mt-20">click on photo to change</p>

        <div class="pt-10 text-center border-b pb-12">
          <h1 class="text-4xl font-medium text-gray-700">{user.name}</h1>
          <p class="font-light text-gray-600 mt-3">{user.email}</p>

          <p class="mt-2 text-gray-500">{user.mobile}</p>
        </div>


        <div className="mt-10">
          <div className="mx-auto w-2/4">
            <ul className="bg-gray-300 grid grid-flow-col gap-10 text-center text-gray-500rounded-lg p-1">
              <li>
                <a
                  className="flex justify-center py-2 text-md cursor-pointer"
                  style={{ fontFamily: 'Kanit, sans-serif' }}
                  onClick={() => setDetails(!details)}
                >
                  Details
                </a>
              </li>
              <li>
                <a
                  className="flex justify-center py-2 text-md cursor-pointer"
                  style={{ fontFamily: 'Kanit, sans-serif' }}
                  onClick={() => setStatus(!status)}
                >
                  Status
                </a>
              </li>
              <li>
                <a
                  className="flex justify-center py-2 text-md cursor-pointer"
                  style={{ fontFamily: 'Kanit, sans-serif' }}
                  onClick={() => setHistory(!history)}
                >
                  History
                </a>
              </li>
            </ul>
          </div>

        </div>
        {details &&
          <div className="rounded-lg bg-white shadow-lg p-16">
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-indigo-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                />
              </svg>
            </div>

            <div className="text-center mt-2">
              <h1 className="text-purple-900 font-bold text-2xl">Details</h1>




              <div className="py-8 border-b border-indigo-50">
                <div className="flex flex-col">
                  <p className="ml-1 text-gray-900 font-bold text-2xl uppercase">Age: <span>{user.age} yr</span></p>
                  <p className="ml-1 text-gray-900 font-bold text-2xl uppercase">Height: <span>{user.height} cm</span></p>
                  <p className="ml-1 text-gray-900 font-bold text-2xl uppercase">Weight: <span>{user.weight} kg</span></p>
                  <p className="ml-1 text-gray-900 font-bold text-2xl uppercase">Goal: <span>{user.goal}</span></p>
                </div>
              </div>



            </div>

            <div className="flex justify-center mt-8">
              <button className="text-white py-2 px-4 rounded-lg bg-purple-700 hover:bg-purple-600 shadow-md font-medium transition-colors">
                Upload
              </button>
            </div>
          </div>
        }
      </div>
      {/* ))} */}

    </div>
  )
}

export default UserProfile
