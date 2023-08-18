import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { trainerAxiosInstance } from '../../../axios/axios';
import { toast } from 'react-hot-toast';

function EditWorkout() {
  const navigate = useNavigate()
  const { workoutId } = useParams();
  const [workoutItems, setWorkoutItems] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await trainerAxiosInstance.get(`/singleWorkout/${workoutId}`);
        const { workout_name, workout_items } = response.data.workout;

        // Populate the workout name
        formik.setFieldValue('workout_name', workout_name);

        // Populate the workout items
        formik.setFieldValue('workoutItems', workout_items);
      } catch (error) {
        console.error('Error fetching workout:', error.message);
      }
    };

    fetchWorkout();
  }, [workoutId]);

  const formik = useFormik({
    initialValues: {
      workout_name: '',
      workoutItems: [],
    },
    validate: (values) => {
      const errors = {};

      if (!values.workout_name.trim()) {
        errors.workout_name = 'Workout Name is required';
      }

      values.workoutItems.forEach((item, index) => {
        if (!item.item_name.trim()) {
          errors[`workoutItems[${index}].item_name`] = 'Item Name is required';
        }
        if (!item.item_instruction.trim()) {
          errors[`workoutItems[${index}].item_instruction`] = 'Item Instruction is required';
        }
        // Add validation for the item_instruction_refer file upload
        if (!item.item_instruction_refer) {
          errors[`workoutItems[${index}].item_instruction_refer`] = 'Item Instruction Video is required';
        }
      });

      return errors;
    },
    onSubmit: async (values) => {
      try {
        const response = await trainerAxiosInstance.post('/updateWorkout', {
          workoutId: workoutId,
          workout_name: values.workout_name,
          workoutItems: values.workoutItems,
        });

        if (response.status >= 200 && response.status < 300) {
          toast.success(response.data.message);
          navigate('/trainer/workout')
        } else {
          console.error('Error updating workout:', response.data.message);
        }
      } catch (error) {
        console.error('Error updating workout:', error.message);
        // Handle error here, e.g., show an error message to the user
      }

    },
  });

  return (
    <>
      <div className="mt-6 bg-opacity-50 backdrop-filter backdrop-blur-lg flex justify-center items-center">
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
            {formik.values.workoutItems.map((item, index) => (
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
                  {formik.touched[`workoutItems[${index}].item_name`] && formik.errors[`workoutItems[${index}].item_name`] && (
                    <div className="text-red-500">{formik.errors[`workoutItems[${index}].item_name`]}</div>
                  )}
                </div>
                <div>
                  <label htmlFor={`workoutItems[${index}].item_instruction`} className="text-sm text-grey-700 block mb-1 font-medium">
                    Item Instruction
                  </label>
                  <input
                    type="text"
                    name={`workoutItems[${index}].item_instruction`}
                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                    placeholder="Enter item instruction"
                    value={item.item_instruction}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched[`workoutItems[${index}].item_instruction`] && formik.errors[`workoutItems[${index}].item_instruction`] && (
                    <div className="text-red-500">{formik.errors[`workoutItems[${index}].item_instruction`]}</div>
                  )}
                </div>
                <div>
                  <label htmlFor={`workoutItems[${index}].item_instruction_refer`} className="text-sm text-grey-700 block mb-1 font-medium">
                    Item Instruction Video
                  </label>
                  <input
                    type="file"
                    name={`workoutItems[${index}].item_instruction_refer`}
                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                    placeholder="Upload item instruction video"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <button
                    type='button'
                    onClick={() => setVideoPreview(item.item_instruction_refer)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mt-2"
                  >
                    View Video
                  </button>
                  {formik.touched[`workoutItems[${index}].item_instruction_refer`] && formik.errors[`workoutItems[${index}].item_instruction_refer`] && (
                    <div className="text-red-500">{formik.errors[`workoutItems[${index}].item_instruction_refer`]}</div>
                  )}
                </div>
              </div>
            ))}

            <div className="mt-8">
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                Update
              </button>
            </div>
          </form>
        </div>
        {
          videoPreview && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900">
              <div className="modal w-1/2 max-w-screen-md bg-white rounded-lg p-4">
                <video controls width="100%" height="auto">
                  <source src={videoPreview} type="video/mp4" />
                </video>
                <button
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  onClick={() => setVideoPreview(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )
        }
      </div>
    </>
  );
}

export default EditWorkout;
