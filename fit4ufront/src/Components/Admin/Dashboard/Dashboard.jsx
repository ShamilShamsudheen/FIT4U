import React, { useEffect, useState } from 'react'
import { FaUsers } from 'react-icons/fa';
import { FiCreditCard } from 'react-icons/fi';
import { AiOutlineEye } from 'react-icons/ai';
import ReactApexChart from 'react-apexcharts';
import { adminAxiosInstance } from '../../../axios/axios';

function Dashboard() {

  const [trainerLabels, setTrainerLabels] = useState(['approved', 'not-approved'])
  const [userLabels, setUserLabels] = useState(["blocked", 'non-blocked'])
  const [userOption, setUserOption] = useState({
    chart: {
      type: 'radialBar',
    },
    labels: userLabels,
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
          },
          total: {
            show: true,
            label: 'Total Users',
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((total, val) => total + val, 0);
            },
          },
        },
      },
    },
  });

  const [trainerOption, setTrainerOption] = useState({
    chart: {
      type: 'radialBar',
    },
    labels: trainerLabels,
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
          },
          total: {
            show: true,
            label: 'Total Trainers',
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((total, val) => total + val, 0);
            },
          },
        },
      },
    },
  });

  const [userSeries, setUserSeries] = useState([0, 0]);
  const [trainerSeries, setTrainerSeries] = useState([0, 0]);
  const [profit,setProfit] = useState(0)
  useEffect(() => {
    adminAxiosInstance.get('/dashboard').then((res) => {
      const { blocked, nonBlocked, approved, nonApproved } = res.data
      
      setUserSeries([blocked, nonBlocked]);
      setTrainerSeries([approved, nonApproved]);
    })
    adminAxiosInstance.get('/profitAmount').then((res)=>{
      setProfit(res.data.totalAmount)
    })
  }, [])
  return (
    <div>
      <div className="flex justify-center w-3/4 mt-6 mx-auto text-blue-400">
        <div className="items-center w-1/2 h-32 rounded-lg mr-2">
          <div className=''>
            <FaUsers size='2rem' />
          </div>
          <div className="">
            TOTAL:<span className='text-amber-500'>{userSeries[0]+userSeries[1]+trainerSeries[0]+trainerSeries[1]} </span>MEMBERS
          </div>
        </div>
        <div className="items-center w-1/2 h-32 rounded-lg mr-2">
          <div className=''>
            <FiCreditCard size='2rem' />
          </div>
          <div className="">
            Wallet Amount: <span>{profit}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full mt-6">
        {/* First Column */}
        <div className="w-1/2 mx-2">
          <div className="flex flex-col justify-center items-center h-full bg-gray-100 p-4 rounded-lg shadow-md">
            <span className="mb-2 text-gray-600 uppercase underline-offset-2">
              <span className=" border-b-2 border-amber-500">Users</span>
            </span>
            <ReactApexChart options={userOption} series={userSeries} type="radialBar" height={350} />
          </div>
        </div>


        {/* Second Column */}
        <div className="w-1/2 mx-2">
          <div className="flex flex-col justify-center items-center h-full bg-gray-100 p-4 rounded-lg shadow-md">
          <span className="mb-2 text-gray-600 uppercase underline-offset-2">
              <span className=" border-b-2 border-amber-500">Trainers</span>
            </span>
            <ReactApexChart options={trainerOption} series={trainerSeries} type="radialBar" height={350} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
