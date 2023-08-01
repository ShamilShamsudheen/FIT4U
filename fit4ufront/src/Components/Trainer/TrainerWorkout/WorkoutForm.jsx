import { useFormik } from 'formik';
import React, { useState } from 'react';
import { fileUpload } from '../../../Constants/Constants';
import Button from '../../Button/Button';
import { trainerAxiosInstance } from '../../../axios/axios';

function WorkoutForm() {
  const [instruction_video, setInstruction_video] = useState([]);
  const [workoutItems, setWorkoutItems] = useState([
    {
      item_name: '',
      item_instruction: '',
      item_instruction_video: null,
    },
  ]);

  const formik = useFormik({
    initialValues: {
      workout_name: '',
      workoutItems: workoutItems, // Set the initial value for workoutItems
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
          errors[`workoutItems[${index}].item_instruction`] = 'Instruction is required';
        }
      });

      return errors;
    },
    onSubmit: async (values) => {
      // Handle form submission here
      console.log(workoutItems);
      await trainerAxiosInstance
        .post('/addWorkout', { workout_name: values.workout_name, workoutItems: values.workoutItems })
        .then((res) => {
          console.log('appo baki frontend');
        })
        .catch((err) => {
          console.log('Error:', err.message);
        });
    },
  });

  const handleVideo = async (e, index) => {
    e.preventDefault();
    try {
      const instruction_vid = e.target.files[0];
      const instruction_vid_ref = await fileUpload('workout-instruction-video/', instruction_vid);
      setInstruction_video((prevVideos) => [...prevVideos, instruction_vid_ref]);

      // Update the workout item's instruction video
      const newWorkoutItems = [...formik.values.workoutItems];
      newWorkoutItems[index].item_instruction_video = instruction_vid_ref;
      formik.setFieldValue('workoutItems', newWorkoutItems);
    } catch (error) {
      console.log('Error: Instruction video uploading...');
    }
  };

  const handleAddWorkoutItem = () => {
    setWorkoutItems((prevItems) => [
      ...prevItems,
      { item_name: '', item_instruction: '', item_instruction_video: null },
    ]);
  };

  return (
    <div className="p-8 w-2/4 mx-auto rounded border border-gray-200 text-white mt-10 backdrop-blur flex justify-center">
      <div>
        <h1 className="font-medium text-3xl">Add Workout Item</h1>
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
            <div key={index} className="mt-8 grid lg:grid-cols-3 gap-3">
              <div>
                <label htmlFor={`item_name_${index}`} className="text-sm text-grey-700 block mb-1 font-medium">
                  Item Name
                </label>
                <input
                  type="text"
                  name={`workoutItems[${index}].item_name`}
                  id={`item_name_${index}`}
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter item name for first set"
                  value={item.item_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched[`workoutItems[${index}].item_name`] &&
                  formik.errors[`workoutItems[${index}].item_name`] && (
                    <div className="text-red-500">{formik.errors[`workoutItems[${index}].item_name`]}</div>
                  )}
              </div>
              <div>
                <label htmlFor={`item_instruction_${index}`} className="text-sm text-grey-700 block mb-1 font-medium">
                  Item Instruction
                </label>
                <textarea
                  name={`workoutItems[${index}].item_instruction`}
                  id={`item_instruction_${index}`}
                  rows="3"
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter Instruction"
                  value={item.item_instruction}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched[`workoutItems[${index}].item_instruction`] &&
                  formik.errors[`workoutItems[${index}].item_instruction`] && (
                    <div className="text-red-500">{formik.errors[`workoutItems[${index}].item_instruction`]}</div>
                  )}
              </div>

              <div>
                <label htmlFor={`item_instruction_video_${index}`} className="text-sm text-grey-700 block mb-1 font-medium">
                  Instruction Video
                </label>
                <input
                  type="file"
                  name={`item_instruction_video_${index}`}
                  id={`item_instruction_video_${index}`}
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  placeholder="Enter instruction video"
                  // Ensure the correct video is updated by using the onChange event
                  onChange={(e) => handleVideo(e, index)}
                />
              </div>
            </div>
          ))}
          <div className="flex justify-center space-x-4 mt-8">
            <div className="space-x-4 mt-8" onClick={handleAddWorkoutItem}>
              <Button buttonText="Add" />
            </div>

            <div className="space-x-4 mt-8">
              <Button buttonText="Save" />
            </div>
          </div>
        </form>
        <button
          type="reset"
          className="py-2 px-4 bg-white border mt-4 border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default WorkoutForm;
