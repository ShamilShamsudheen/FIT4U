import React, { useEffect, useState } from 'react'
import { AdminApi } from '../../../api/api'
import Button from '../../Button/Button'
import { toast } from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import { adminAxiosInstance } from '../../../axios/axios'

function PaymentDetail() {
  const [paymentData, setPaymentData] = useState([])
  useEffect(() => {
    adminAxiosInstance.get('/paymentDetails').then((res) => {
      setPaymentData(res.data.paymentDetails)
    })
    
  }, [])

  // const userName = async(id)=>{
  //   try {
  //     await adminAxiosInstance.get(`/userName${id}`).then((res)=>{
  //       return res.data.name
  //     })
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }
  // const trainerName = async(id)=>{
  //   try {
  //     await adminAxiosInstance.get(`/trainerName${id}`).then((res)=>{
  //       return res.data.nam
  //     })
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }
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
            {paymentData.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.user_id}</td>
                <td>{payment.trainer_id}</td>
                <td>{payment.purchase_amount}</td>
                <td>{payment.purchase_date}</td>
                <td>{payment.purchase_expire}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  )
}

export default PaymentDetail
