import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { trainerAxiosInstance } from '../../../axios/axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Workouts() {
  const navigate = useNavigate()
  const [workoutData, setWorkouts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        await trainerAxiosInstance.get('/workouts').then((res) => {
          setWorkouts(res.data.workouts)
        })

      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData();
  }, [])
  const handleEditWorkout = async (workout_id) => {
    console.log(workout_id)
    
  }
  const handleDeleteWorkout = async (workout_id) => {
    console.log(workout_id)
    await trainerAxiosInstance.post('/deleteWorkout', { workout_id }).then((res) => {
      toast.success(res.data.message)
    })
  }
  return (
    <>
      {workoutData && (
        <div className="bg-transparent mt-10 h-96 overflow-y-auto">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-2/3 mx-auto mt-10">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-gray-200">
              <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 sticky top-0 border border-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3 border border-gray-200">
                    Workout Name
                  </th>
                  <th scope="col" className="px-6 py-3 border border-gray-200">
                    Item Name
                  </th>
                  <th scope="col" className="px-6 py-3 border border-gray-200">
                    Item Instruction
                  </th>
                  <th scope="col" className="px-6 py-3 border border-gray-200">
                    Instruction Video
                  </th>
                  <th scope="col" className="px-6 py-3 border border-gray-200">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="relative">
                {workoutData.map((workout) => (
                  <React.Fragment key={`workout_${workout.id}`}>
                    <tr className="border border-gray-200">
                      <td className="px-6 py-4 font-medium text-gray-50 whitespace-nowrap">
                        {workout.workout_name}
                      </td>
                      <td className="px-6 py-4 border border-gray-200">
                        {workout.workout_items.map((item, index) => (
                          <div key={`workout_item_${workout.id}_${index}`}>
                            {item.item_name}
                          </div>
                        ))}
                      </td>
                      <td className="px-6 py-4 border border-gray-200">
                        {workout.workout_items.map((item, index) => (
                          <div key={`workout_item_${workout.id}_${index}`}>
                            {item.item_instruction}
                          </div>
                        ))}
                      </td>
                      <td className="px-6 py-4 border border-gray-200">
                        {workout.workout_items.map((item, index) => (
                          <div key={`workout_item_${workout.id}_${index}`}>
                            <video controls width="80" height="40">
                              <source src={item.item_instruction_ref} type="video/mp4" />
                            </video>
                        </div>
                        ))}
                      </td>
                      <td className="px-6 py-4 border border-gray-200">
                        <button
                          onClick={() => handleEditWorkout(workout._id)}
                          className="text-blue-500 hover:bg-blue-100 px-2 py-1 rounded"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteWorkout(workout._id)}
                          className="text-red-500 hover:bg-red-100 px-2 py-1 rounded"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}

export default Workouts
