import React, { useEffect, useState } from 'react'
import { AdminApi } from '../../../api/api'
import Button from '../../Button/Button'
import { toast } from 'react-hot-toast'
import { adminAxiosInstance } from '../../../axios/axios'

function UserDetails() {
    const [userData, setUserData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [userId, setUserId] = useState(null)
    const [lastHandleClickTime, setLastHandleClickTime] = useState(null)
    useEffect(() => {
      adminAxiosInstance.get('/userDetails').then((res) => {
          setUserData(res.data.userDetails)
      })
  }, [])
    useEffect(() => {
      if (lastHandleClickTime) {
        adminAxiosInstance.get('/userDetails').then((res) => {
          setUserData(res.data.userDetails);
        });
      }
    }, [lastHandleClickTime]);
  
    const handleClick = async (e) => {
      e.preventDefault();
      await adminAxiosInstance.patch('/userBlock', { userId }).then((res) => {
        if (res.data.status) {
          setShowModal(false);
          toast.success(res.data.message);
        } else {
          setShowModal(false);
          toast.error(res.data.message);
        }
        setLastHandleClickTime(null); 
      });
    };

    return (
        <div className=''>
        <div className="h-[93.1vh] w-full bg-white-400 py-4 pt-16 font-serif">
          <table className="w-full text-sm text-left text-white-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-full">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  
                  <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="pl-3">
                      <div className="text-base font-semibold">{user.name}</div>
                      <div className="font-normal text-gray-500">{user.email}</div>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {user.isBlocked ? (<div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2" />) : (<div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />)}
                      {user.isBlocked ? 'Blocked' : 'Unblock'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div onClick={()=>{setShowModal(true);setUserId(user._id)}}>

                    <Button
                      
                      buttonText={user.isBlocked ? 'Unblock' : 'Block'}
                      />
                      </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        
        </div>
        {showModal && (
          <div className='flex justify-center items-center fixed inset-0 w-full h-full  background-blur-sm '>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 sm:flex">
                  <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <h4 className="text-lg font-medium text-gray-800">Block alert ?</h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="items-center gap-2 mt-3 sm:flex">
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                        onClick={handleClick}
                      >
                        OK
                      </button>
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
    )
}

export default UserDetails
