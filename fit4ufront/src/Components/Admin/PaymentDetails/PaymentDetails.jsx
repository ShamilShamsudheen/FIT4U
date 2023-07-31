import React, { useEffect, useState } from 'react'
import { AdminApi } from '../../../api/api'
import Button from '../../Button/Button'
import { toast } from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import { adminAxiosInstance } from '../../../axios/axios'

function PaymentDetail() {
  const [paymentData,setPaymentData] = useState([])
  useEffect(()=>{
    adminAxiosInstance.get('/paymentDetails').then((res)=>{
      console.log('evde ethatte ennit nookka ')
      // setTrianerData(res.data.paymentDetails)
    })
  },[])


  return (
    <div className=''>
        <div className="h-[93.1vh] w-full bg-white-400 py-4 pt-16 font-serif">
          <table className="w-full text-sm text-left text-white-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-full">
              <tr>
                <th scope="col" className="px-6 py-3">
                  From (User)
                </th>
                <th scope="col" className="px-6 py-3">
                  To (Trainer)
                </th>
                <th scope="col" className="px-6 py-3">
                      Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Payed Date 
                </th>
                <th scope="col" className="px-6 py-3">
                  expired Date 
                </th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </table>
        
        </div>
        
      </div>
  )
}

export default PaymentDetail
