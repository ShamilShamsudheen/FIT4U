import React, { useEffect, useState } from 'react';
import { userAxiosInstance } from '../../../axios/axios';

function Workouts() {
  const [workoutData, setWorkoutData] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userAxiosInstance.get('/workouts');
        setWorkoutData(response.data.workoutDetails);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const handleVideoClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  console.log('workoutData:', workoutData); // Check the value of workoutData in the console

  return (
    <div>
      {workoutData && workoutData.workout_items && workoutData.workout_items.length > 0 ? (
        <div className="bg-white mt-10 h-96 overflow-y-auto">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-2/3 mx-auto mt-10">
            <h1 className="text-center text-xl font-bold my-4">{workoutData.workout_name}</h1>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 sticky top-0 bg-white">
                <tr>
                  <th scope="col" className="px-6 py-3 bg-gray-50">
                    Item Name
                  </th>
                  <th scope="col" className="px-6 py-3 bg-gray-50">
                    Item Instruction
                  </th>
                  <th scope="col" className="px-6 py-3 bg-gray-50">
                    Instruction Video
                  </th>
                </tr>
              </thead>
              <tbody className="relative">
                {workoutData.workout_items.map((item, index) => (
                  <tr key={`workout_item_${index}`}>
                    <td className="px-6 py-4">{item.item_name}</td>
                    <td className="px-6 py-4">{item.item_instruction}</td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                        onClick={() => handleVideoClick(item.item_instruction_refer)}
                      >
                        Play Video
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>No workout items found.</div>
      )}

      {selectedVideo && (
        <div className="fixed bottom-0 left-0 right-0 p-2 bg-white text-white text-center">
          <video className='mx-auto border-rounded-3' controls width="400" height="200" autoPlay>
            <source src={selectedVideo} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
}

export default Workouts;
