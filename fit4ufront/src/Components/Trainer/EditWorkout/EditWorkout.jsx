import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { trainerAxiosInstance } from '../../../axios/axios';

function EditWorkout() {
  const { workoutId } = useParams();
  const [workoutItems, setWorkoutItems] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await trainerAxiosInstance.get(`/singleWorkout/${workoutId}`).then((res) => {

          const { workout_name, workout_items } = res.data.workout;
          console.log(res.data.workout)
          // Populate the form fields with fetched data
          formik.setFieldValue('workout_name', workout_name);
          setWorkoutItems(workout_items);
        })
      } catch (error) {
        console.error('Error fetching workout:', error.message);
      }
    };
    fetchWorkout();
  }, [workoutId]);

  const formik = useFormik({
    initialValues: {
      workout_name: '',
    },
    validate: (values) => {
      // ... (your validation logic)
    },
    onSubmit: async (values) => {
      // ... (your submission logic)
    },
  });

  const handleVideo = async (e) => {
    // ... (your handleVideo logic)
  };

  const handleAddWorkoutItem = async (e) => {
    // ... (your handleAddWorkoutItem logic)
  };

  const handleRemovePreview = () => {
    // ... (your handleRemovePreview logic)
  };

  return (
    <>
      <div className="mt-6 bg-opacity-50 backdrop-filter backdrop-blur-lg flex justify-center items-center bg-white">
        {/* {blogForm && */}
        <div className="p-8 rounded border border-gray-200 t mt-10 z-10 relative text-black">
          <h1 className="font-medium text-3xl">Edit Workout</h1>
          <br />
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-8">
              <label htmlFor="workout_name" className="text-sm text-grey-700 block mb-1 font-medium">
                Workout Name
              </label>
              <input
                type="text"
                name="workout_name"
                id="workout_name"
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Enter workout name"
                value={formik.values.workout_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.workout_name && formik.errors.workout_name && (
                <div className="text-red-500">{formik.errors.workout_name}</div>
              )}
            </div>

            {/* Workout Items */}
            {workoutItems.map((item, index) => (
              <div className="mt-8 flex gap-4" key={index}>
                <div>
                  <label htmlFor={`workoutItems[${index}].item_name`} className="text-sm text-grey-700 block mb-1 font-medium">
                    Item Name
                  </label>
                  <input
                    type="text"
                    name={`workoutItems[${index}].item_name`}
                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                    placeholder="Enter item name for first set"
                    value={item.item_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {/* ... (error handling for item_name) */}
                </div><div>
                  <label htmlFor={`workoutItems[${index}].item_name`} className="text-sm text-grey-700 block mb-1 font-medium">
                    Item instruction
                  </label>
                  <input
                    type="text"
                    name={`workoutItems[${index}].item_instruction`}
                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                    placeholder="Enter item name for first set"
                    value={item.item_instruction}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {/* ... (error handling for item_name) */}
                </div>
                <div>
                  <label htmlFor={`workoutItems[${index}].item_name`} className="text-sm text-grey-700 block mb-1 font-medium">
                    Item Instruction video
                  </label>
                  <input
                    type="file"
                    name={`workoutItems[${index}].item_instruction_refer`}
                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                    placeholder="Enter item name for first set"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {/* ... (error handling for item_name) */}
                </div>
                <div>
                  {/* ... (similar setup for other item fields) */}
                </div>
              </div>
            ))}

            {/* ... (rest of your video preview and buttons) */}
          </form>
        </div>
      </div>
    </>
  );
}

export default EditWorkout;
