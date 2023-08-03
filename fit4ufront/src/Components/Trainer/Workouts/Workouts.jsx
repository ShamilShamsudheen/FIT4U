import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { trainerAxiosInstance } from '../../../axios/axios';

function Workouts() {
    const [workoutData, setWorkouts] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                await trainerAxiosInstance.get('/workouts').then((res) => {
                    console.log(res.data.workouts)
                })

            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData();
    })

    return (
        <>
        {workoutData && (
            <div className="bg-white mt-10">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-2/3 mx-auto mt-10">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3 bg-gray-50">
                        Workout Name
                      </th>
                      <th scope="col" className="px-6 py-3 bg-gray-50">
                        Item Name
                      </th>
                      <th scope="col" className="px-6 py-3 bg-gray-50">
                        Item Instruction
                      </th>
                      <th scope="col" className="px-6 py-3 bg-gray-50">
                        Instruction Video
                      </th>
                      <th scope="col" className="px-6 py-3 bg-gray-50">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {workoutData.map((workout) => (
                      <React.Fragment key={`workout_${workout.id}`}>
                        <tr className="border-b border-gray-200">
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {workout.workout_name}
                          </td>
                          <td className="px-6 py-4"></td>
                          <td className="px-6 py-4"></td>
                          <td className="px-6 py-4"></td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleEditWorkout(workout.id)}
                              className="text-blue-500 hover:bg-blue-100 px-2 py-1 rounded"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteWorkout(workout.id)}
                              className="text-red-500 hover:bg-red-100 px-2 py-1 rounded"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                        {workout.workout_items.map((item, index) => (
                          <tr key={`workout_item_${workout.id}_${index}`} className="border-b border-gray-200">
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4">{item.item_name}</td>
                            <td className="px-6 py-4">{item.item_instruction}</td>
                            <td className="px-6 py-4">
                              {item.item_instruction_video && (
                                <video controls width="80" height="40">
                                  <source src={item.item_instruction_ref} type="video/mp4" />
                                </video>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => handleEditItem(index)}
                                className="text-blue-500 hover:bg-blue-100 px-2 py-1 rounded"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(index)}
                                className="text-red-500 hover:bg-red-100 px-2 py-1 rounded"
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))}
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
