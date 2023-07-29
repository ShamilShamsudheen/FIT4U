import React, { useEffect, useState } from 'react'
import { adminAxiosInstance } from '../../../axios/axios'
import { FiEye } from 'react-icons/fi'

function WorkoutDetails() {
    const [workoutData, setWorkout] = useState([])
    useEffect(()=>{
        adminAxiosInstance.get('/workoutDetails').then((res)=>{
            setWorkout(res.data.workoutDetails)
        })
    },[])
  return (
    <div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Workout Creator
          </th>
          <th scope="col" className="px-6 py-3">
            Workout Name
          </th>
          <th scope="col" className="px-6 py-3">
            Workout Status
          </th>
          <th scope="col" className="px-6 py-3">
            Workout view
          </th>
        </tr>
      </thead>
      <tbody>
        {workoutData.map((workout) => (
          <tr
            key={workout.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td className="px-6 py-4">{workout.trainer_name}</td>
            <td className="px-6 py-4">{workout.workout_name}</td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <div className={`h-2.5 w-2.5 rounded-full ${workout.isApprove ? 'bg-green-500' : 'bg-red-500'} mr-2`} />
                {workout.isApprove ? 'Approved' : 'Not Approved'}
              </div>
            </td>
            <td className="px-6 py-4">
              <FiEye />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default WorkoutDetails
