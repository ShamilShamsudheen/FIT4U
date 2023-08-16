import React, { useEffect, useState } from 'react'
import { adminAxiosInstance } from '../../../axios/axios'
import { FiEye } from 'react-icons/fi'

function WorkoutDetails() {
  const [isOpen, setOpen] = useState(false)
  const [workoutData, setWorkout] = useState([])
  const [singleWorkout, setSingleWorkout] = useState([])
  useEffect(() => {
    adminAxiosInstance.get('/workoutDetails').then((res) => {
      setWorkout(res.data.workoutDetails)
    })
  }, [])
  const handleview = (id) => {
    adminAxiosInstance.get(`/singleWorkout/${id}`).then((res) => {
      setSingleWorkout(res.data.workout)
      setOpen(true)
    })
  }
  return (
    <div className='relative'>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-14">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Workout Trainer
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
                <div onClick={() => handleview(workout._id)}>
                  <FiEye />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpen && singleWorkout && (
        <div className="modal fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="modal-content w-full max-w-5xl bg-white rounded-lg p-6 flex h-96 overflow-hidden  overflow-y-auto">
            <div className="modal-text w-full">
              <h3 className="text-lg font-semibold mb-3">{singleWorkout.workout_name}</h3>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Item Name</th>
                    <th className="px-4 py-2">Instruction</th>
                    <th className="px-4 py-2">Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {singleWorkout.workout_items.map((item, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{item.item_name}</td>
                      <td className="border px-4 py-2">{item.item_instruction}</td>
                      <td className="border px-4 py-2">
                        <video controls className="w-full">
                          <source src={item.item_instruction_refer} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={() => setOpen(false)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                Back
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default WorkoutDetails
