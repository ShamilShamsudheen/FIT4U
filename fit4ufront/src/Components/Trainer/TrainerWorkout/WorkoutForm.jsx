import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { fileUpload } from '../../../Constants/Constants';
import Button from '../../Button/Button';
import { trainerAxiosInstance } from '../../../axios/axios';

function WorkoutForm() {
  
  const [tableShow,setTableShow] = useState(true)
  const [instruction_video, setInstruction_video] = useState([]);
  const [workoutItems, setWorkoutItems] = useState([]);
  console.log(workoutItems)


  const [videoPreview, setVideoPreview] = useState(null); // Add video preview state
  const [savedWorkouts, setSavedWorkouts] = useState([]);

  const formik = useFormik({
    initialValues: {
      workout_name: '',
      workoutItems: workoutItems,
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
      console.log(workoutItems," workoutItems");
      await trainerAxiosInstance
        .post('/addWorkout', { workout_name: values.workout_name, workoutItems})
        .then((res) => {
          formik.resetForm();
          setTableShow(false)
          console.log(res.data.message);
        })
        .catch((err) => {
          console.log('Error:', err.message);
        });

      // Clear the form after submission

      // Add the current workout item to savedWorkouts
      setSavedWorkouts((prevSavedWorkouts) => [...prevSavedWorkouts, values.workoutItems]);

      // Clear video preview after saving
      setVideoPreview(null);
    },
  });

  const handleVideo = async (e) => {
    e.preventDefault();

    try {
      console.log( e.target.files[0])
      const instruction_vid = e.target.files[0];
      const instruction_vid_ref = await fileUpload('workout-instruction-video/', instruction_vid);
      formik.setFieldValue('item_instruction_video',instruction_vid_ref); 
      console.log(formik.values.item_instruction_video)
      setVideoPreview(instruction_vid_ref)
      
    } catch (error) {
      console.log('Error: Instruction video uploading...');
    }
  };

  const handleAddWorkoutItem = async(e) => {
    e.preventDefault();
   console.log(formik)
    const newItem = {
      item_name: formik.values.item_name,
      item_instruction: formik.values.item_instruction,
      item_instruction_video: formik.values.item_instruction_video,
    };
    // console.log(newItem)

    // Add the new item to the workoutItems array
    setWorkoutItems((prevItems) => [...prevItems, newItem]);

    // Clear the form fields
    formik.setFieldValue('item_name', '');
    formik.setFieldValue('item_instruction', '');
    formik.setFieldValue('item_instruction_video', null);

    // Clear video preview after adding the item
    setVideoPreview(null);
  };
  

  const handleRemovePreview = () => {
    // Remove the video preview URL
    setVideoPreview(null);
  };

  return (
    <div className="p-8 bg-white mx-auto rounded border flex justify-center">
      
      <div>
      <div >
        <Button 
        buttonText='Add Workouts'
        />
      </div>
        <h1 className="font-medium text-3xl mt-4">Add Workout Item</h1>
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
          <div className="mt-8 flex gap-4">
            <div>
              <label htmlFor="item_name" className="text-sm text-grey-700 block mb-1 font-medium">
                Item Name
              </label>
              <input
                type="text"
                name="item_name"
                id="item_name"
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Enter item name for first set"
                value={formik.values.item_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.item_name && formik.errors.item_name && (
                <div className="text-red-500">{formik.errors.item_name}</div>
              )}
            </div>
            <div>
              <label htmlFor="item_instruction" className="text-sm text-grey-700 block mb-1 font-medium">
                Item Instruction
              </label>
              <textarea
                name="item_instruction"
                id="item_instruction"
                rows="3"
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Enter Instruction"
                value={formik.values.item_instruction}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.item_instruction && formik.errors.item_instruction && (
                <div className="text-red-500">{formik.errors.item_instruction}</div>
              )}
            </div>
            <div>
              <label htmlFor="item_instruction_video" className="text-sm text-grey-700 block mb-1 font-medium">
                Instruction Video
              </label>
              <input
                type="file"
                name="item_instruction_video"
                id="item_instruction_video"
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Enter instruction video"
                // Ensure the correct video is updated by using the onChange event
                onChange={handleVideo}
              />
            </div>
          </div>

          {/* Video preview */}
          {videoPreview && (
            <div className="mt-4">
              <video controls width="320" height="240">
                <source src={videoPreview} type="video/mp4" />
              </video>
              <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded" onClick={handleRemovePreview}>
                Close Preview
              </button>
            </div>
          )}
          <div className="flex justify-center space-x-4 mt-8">
            <div className="space-x-4 mt-8" onClick={handleAddWorkoutItem}>
              <Button type="button" buttonText="Add" />
            </div>

            <div className="space-x-4 mt-8">
              <Button type="submit" buttonText="Save" />
            </div>
          </div>
        </form>

        
        {tableShow &&
          <div className="mt-4 bg-white border-rounded-3 t">
          <table className="mt-4 w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Workout Name</th>
                <th className="py-2 px-4 border">Item Name</th>
                <th className="py-2 px-4 border">Item Instruction</th>
                <th className="py-2 px-4 border">Instruction Video</th>
              </tr>
            </thead>
            <tbody>
              {workoutItems.map((item, index) => (
                <tr key={`workout_item_${index}`}>
                  <td className='mx-auto'>{formik.values.workout_name}</td>
                  <td>{item.item_name}</td>
                  <td>{item.item_instruction}</td>
                  <td>
                    {item.item_instruction_video && (
                      <video controls width="320" height="240">
                      <source src={item.item_instruction_video} type="video/mp4" />
                    </video>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>}
      </div>
    </div>
  );
}

export default WorkoutForm;
