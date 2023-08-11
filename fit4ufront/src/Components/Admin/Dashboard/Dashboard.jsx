import React from 'react'
import { FaUsers } from 'react-icons/fa';
import { FiCreditCard } from 'react-icons/fi';
import { AiOutlineEye } from 'react-icons/ai';

function Dashboard() {
  return (
    <div>
      <div className="flex justify-center w-3/4 mt-6 mx-auto text-blue-400">
          <div className="items-center w-1/2 h-32 rounded-lg mr-2">
            <div className=''>
              <FaUsers size='2rem' />
            </div>
            <div className="">
              Number of User:<span>10</span>
            </div>
          </div>
          <div className="items-center w-1/2 h-32 rounded-lg mr-2">
            <div className=''>
              <FiCreditCard size='2rem' />
            </div>
            <div className="">
              Wallet Amount: <span>10</span>
            </div>
          </div>
          <div className="items-center w-1/3 h-32 rounded-lg mr-2">
            <div className='mx-auto'>
              <AiOutlineEye size='2rem' />
            </div>
            <div className="ml-2">
              Number of Views: <span>10</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Dashboard
