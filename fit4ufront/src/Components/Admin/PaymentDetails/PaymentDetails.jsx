import React, { useEffect, useState } from 'react'
import { AdminApi } from '../../../api/api'
import Button from '../../Button/Button'
import { toast } from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import { adminAxiosInstance } from '../../../axios/axios'

function PaymentDetail() {
  const [paymentData,setPaymentData] = useState([])
//   const [showModal,setShowModal] = useState(false)
//   const [paymentId,setpaymentId] = useState(null);
  useEffect(()=>{
    adminAxiosInstance.get('/admin/paymentDetails').then((res)=>{
      setTrianerData(res.data.paymentDetails)
    })
  },[])


  return (
    <div className=''>
        <div className="h-[93.1vh] w-full bg-white-400 py-4 pt-16 font-serif">
          <table className="w-full text-sm text-left text-white-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-full">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Position
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paymentData.map((payment) => (
                <tr key={payment.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  {/* <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input id={`checkbox-table-search-${payment.id}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                      <label htmlFor={`checkbox-table-search-${payment.id}`} className="sr-only">checkbox</label>
                    </div>
                  </td> */}
                  <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    {/* <img className="w-10 h-10 rounded-full" src={payment.image} alt="payment image" /> */}
                    <div className="pl-3">
                      <div className="text-base font-semibold">{payment.name}</div>
                      <div className="font-normal text-gray-500">{payment.email}</div>
                    </div>
                  </th>
                  {/* <td className="px-6 py-4">{payment.position}</td> */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      jflja;slkdjkl
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {/* Modal toggle */}
                    <div >

                    <Button
                      
                      buttonText="button"
                      
                      />
                      </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        
        </div>
        {/* {showModal && (
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
                    <h4 className="text-lg font-medium text-gray-800">Alert</h4>
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
        )} */}
      </div>
  )
}

export default PaymentDetail
