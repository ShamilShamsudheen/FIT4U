import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import Trainer from '../../../assets/signupbanner.jpg'
import { UserApi } from '../../../api/api';
import { data } from 'autoprefixer';

function UserProfile() {
  const [details,setDetails]=useState(true)
  const [status,setStatus]=useState(true)
  const [history,setHistory]=useState(true)
  const [user, setUser] = useState([]); // Changed the initial state to an empty array

useEffect(() => {
  const userJwtToken = localStorage.getItem('userToken');
  console.log(userJwtToken);
  if (userJwtToken) {
    UserApi.post('/postLogin', { userJwtToken })
      .then((res) => {
        console.log(res.data.userData);
        setUser(res.data.userData); // Update the user state here
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    <Navigate to="/login" />;
  }
}, []);
console.log(user+"etrsdfglkj;jhgjblk;n;k.j,nj")
  return (
    <div class="p-16 bg-black">
      {/* {user.map((data)=>( */}

      <div class="p-8 bg-white shadow mt-24 flex flex-col">
        <div class="relative flex justify-center">
          <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
            <img src={user.profileImg} className='w-full h-full rounded-full' alt="" />
            {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg> */}

          </div>
        </div>
        <br />
        <p class="text-center mt-20">click on photo to change</p>
        <div class="mx-auto flex mt-2">

          <button type="button"
            class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-500 font-medium rounded-lg text-sm px-5 py-2 text-center">Remove</button>
          <button type="button"
            class="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm mx-3 px-5 py-2 text-center" >Edit Profile</button>
        </div>
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
                  onClick={()=>setDetails(!details)}
                >
                  Details
                </a>
              </li>
              <li>
                <a
                  className="flex justify-center py-2 text-md cursor-pointer"
                  style={{ fontFamily: 'Kanit, sans-serif' }}
                  onClick={()=>setStatus(!status)}
                >
                  Status
                </a>
              </li>
              <li>
                <a
                  className="flex justify-center py-2 text-md cursor-pointer"
                  style={{ fontFamily: 'Kanit, sans-serif' }}
                  onClick={()=>setHistory(!history)}
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
    <p className="ml-1 text-gray-900 font-bold text-2xl uppercase">Age: <span>{user.age}</span></p>
    <p className="ml-1 text-gray-900 font-bold text-2xl uppercase">Height: <span>{user.height}</span></p>
    <p className="ml-1 text-gray-900 font-bold text-2xl uppercase">Weight: <span>{user.weight}</span></p>
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
