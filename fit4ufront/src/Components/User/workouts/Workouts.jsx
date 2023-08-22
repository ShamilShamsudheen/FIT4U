import React, { useEffect, useState } from 'react';
import { userAxiosInstance } from '../../../axios/axios';

function Workouts() {
  const [workoutData, setWorkoutData] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [preview, setPreview] = useState(false)

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
    setPreview(true)
    setSelectedVideo(videoUrl);
  };

  console.log('workoutData:', workoutData);

  return (
    <div className='w-2/3 mx-auto'>
      {workoutData && workoutData.workout_items && workoutData.workout_items.length > 0 ? (
        <div className="bg-transparent mt-4 h-96 overflow-y-auto">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full mx-auto mt-10">
            <h1 className="text-center text-3xl text-amber-500 font-bold my-4">{workoutData.workout_name}</h1>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-amber-500 ">
              <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 sticky top-0 bg-transparent  border border-amber-500">
                <tr>
                  <th scope="col" className="px-6 py-3  border border-amber-500">
                    Item Name
                  </th>
                  <th scope="col" className="px-6 py-3  border border-amber-500">
                    Item Instruction
                  </th>
                  <th scope="col" className="px-6 py-3  border border-amber-500">
                    Instruction Video
                  </th>
                </tr>
              </thead>
              <tbody className="relative  border border-amber-500">
                {workoutData.workout_items.map((item, index) => (
                  <tr key={`workout_item_${index}`}>
                    <td className="px-6 py-4  border border-amber-500">{item.item_name}</td>
                    <td className="px-6 py-4  border border-amber-500">{item.item_instruction}</td>
                    <td className="px-6 py-4  border border-amber-500">
                      <button
                        className="bg-amber-500 text-white py-2 px-4 rounded"
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
        <div className='text-white mx-auto' >No workout items found.</div>
      )}

      {preview && (
        <div className="fixed bottom-0 left-0 right-0 p-2 bg-transparent text-white text-center">
          <video className='mx-auto border-rounded-3' controls width="400" height="200" autoPlay>
            <source src={selectedVideo} type="video/mp4" />
          </video>
          <button className="bg-amber-500 text-white py-2 px-4 rounded mt-2"
            onClick={() => setPreview(false)}>
            close
          </button>
        </div>
      )}
    </div>
  );
}

export default Workouts;
