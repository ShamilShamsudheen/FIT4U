import { useFormik } from 'formik';
import React, { useState } from 'react';
import { fileUpload } from '../../../Constants/Constants';
import Button from '../../Button/Button';
import { trainerAxiosInstance } from '../../../axios/axios';

function WorkoutForm() {
  const[instruction_video, setInstruction_video] = useState([])
  const formik = useFormik({
    initialValues: {
      workout_name:'',
      item_name_1: '',
      first_item_instruction: '',
      item_name_1: '',
      second_item_instruction: '',
      item_name_1: '',
      third_item_instruction: '',
      item_name_1: '',
      fourth_item_instruction: '',
    },
    validate: (values) => {
      const errors = {};

      // Add validation logic for each field
      if (!values.workout_name.trim()) {
        errors.workout_name = 'Workout Name is required';
      }
      if (!values.item_name_1.trim()) {
        errors.item_name_1 = 'Item Name is required';
      }
      if (!values.first_item_instruction.trim()) {
        errors.first_item_instruction = 'Instruction is required';
      }
      return errors;
    },
    onSubmit: async(values) => {
      // Handle form submission here
      await trainerAxiosInstance.post('/addWorkout',{values,instruction_video}).then((res)=>{
        console.log("appo baki frontend")
      }).catch((err)=>{
        console.log('uyuyu',err.message);
      })
    },
  });
  const handleVideo = async(e)=>{
    e.preventDefault()
    try {
      const instruction_vid = e.target.files[0]
      // console.log(instruction_vid);
      const instruction_vid_ref = await fileUpload('workout-instruction-video/',instruction_vid)
      // console.log(instruction_vid_ref+" surprice");
      setInstruction_video((prevVideos) => [...prevVideos, instruction_vid_ref])
    } catch (error) {
      console.log("error instruction video uploading...")
    }
  }
  return (
    <div className="p-8 rounded border border-gray-200 text-white mt-10 backdrop-blur flex justify-center">
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

        {/* First Set */}
        <div className="mt-8 grid lg:grid-cols-3 gap-3">
          <div>
            <label htmlFor="item_name_1" className="text-sm text-grey-700 block mb-1 font-medium">
              Item Name
            </label>
            <input
              type="text"
              name="item_name_1"
              id="item_name_1"
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter item name for first set"
              value={formik.values.item_name_1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.item_name_1 && formik.errors.item_name_1 && (
              <div className="text-red-500">{formik.errors.item_name_1}</div>
            )}
          </div>
          <div>
            <label htmlFor="first_set_reps_1" className="text-sm text-grey-700 block mb-1 font-medium">
              First Item Instruction
            </label>
            <textarea
              name="first_item_instruction"
              id="first_set_reps_1"
              rows="3"
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter Instruction"
              value={formik.values.first_item_instruction}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.first_item_instruction && formik.errors.first_item_instruction && (
              <div className="text-red-500">{formik.errors.first_item_instruction}</div>
            )}
          </div>

          <div>
            <label htmlFor="first_set_instruction_1" className="text-sm text-grey-700 block mb-1 font-medium">
              First Set Instruction Video
            </label>
            <input
              type="file"
              name="first_set_instruction_video"
              id="first_set_instruction_1"
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter instruction for first set"
              onChange={handleVideo}
            />
          </div>
        </div>

        {/* Second Set */}
        <div className="mt-8 grid lg:grid-cols-3 gap-3">
          <div>
            <label htmlFor="item_name_1" className="text-sm text-grey-700 block mb-1 font-medium">
              Item Name
            </label>
            <input
              type="text"
              name="item_name_2"
              id="item_name_2"
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter item name for first set"
              value={formik.values.item_name_2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.item_name_2 && formik.errors.item_name_2 && (
              <div className="text-red-500">{formik.errors.item_name_2}</div>
            )}
          </div>
          <div>
            <label htmlFor="first_set_reps_1" className="text-sm text-grey-700 block mb-1 font-medium">
              First Item Instruction
            </label>
            <textarea
              name="second_item_instruction"
              id="second_item_instruction"
              rows="3"
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter Instruction"
              value={formik.values.second_item_instruction}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.second_item_instruction && formik.errors.second_item_instruction && (
              <div className="text-red-500">{formik.errors.second_item_instruction}</div>
            )}
          </div>

          <div>
            <label htmlFor="first_set_instruction_1" className="text-sm text-grey-700 block mb-1 font-medium">
              First Set Instruction Video
            </label>
            <input
              type="file"
              name="first_set_instruction_video"
              id="first_set_instruction_1"
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter instruction for first set"
              onChange={handleVideo}
            />
          </div>
        </div>

        {/* Third Set */}
        <div className="mt-8 grid lg:grid-cols-3 gap-3">
          <div>
            <label htmlFor="item_name_1" className="text-sm text-grey-700 block mb-1 font-medium">
              Item Name
            </label>
            <input
              type="text"
              name="item_name_3"
              id="item_name_3"
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter item name for first set"
              value={formik.values.item_name_3}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.item_name_3 && formik.errors.item_name_3 && (
              <div className="text-red-500">{formik.errors.item_name_3}</div>
            )}
          </div>
          <div>
            <label htmlFor="first_set_reps_1" className="text-sm text-grey-700 block mb-1 font-medium">
              First Item Instruction
            </label>
            <textarea
              name="third_item_instruction"
              id="third_item_instruction"
              rows="3"
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter Instruction"
              value={formik.values.third_item_instruction}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.third_item_instruction && formik.errors.third_item_instruction && (
              <div className="text-red-500">{formik.errors.third_item_instruction}</div>
            )}
          </div>

          <div>
            <label htmlFor="first_set_instruction_1" className="text-sm text-grey-700 block mb-1 font-medium">
              First Set Instruction Video
            </label>
            <input
              type="file"
              name="first_set_instruction_video"
              id="first_set_instruction_1"
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter instruction for first set"
              onChange={handleVideo}
            />
          </div>
        </div>

        {/* Fourth Set */}
        <div className="mt-8 grid lg:grid-cols-3 gap-3">
          <div>
            <label htmlFor="item_name_1" className="text-sm text-grey-700 block mb-1 font-medium">
              Item Name
            </label>
            <input
              type="text"
              name="item_name_4"
              id="item_name_4"
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter item name for first set"
              value={formik.values.item_name_4}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.item_name_4 && formik.errors.item_name_4 && (
              <div className="text-red-500">{formik.errors.item_name_4}</div>
            )}
          </div>
          <div>
            <label htmlFor="first_set_reps_1" className="text-sm text-grey-700 block mb-1 font-medium">
              First Item Instruction
            </label>
            <textarea
              name="fourth_item_instruction"
              id="fourth_item_instruction"
              rows="3"
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter Instruction"
              value={formik.values.fourth_item_instruction}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fourth_item_instruction && formik.errors.fourth_item_instruction && (
              <div className="text-red-500">{formik.errors.fourth_item_instruction}</div>
            )}
          </div>

          <div>
            <label htmlFor="first_set_instruction_1" className="text-sm text-grey-700 block mb-1 font-medium">
              First Set Instruction Video
            </label>
            <input
              type="file"
              name="first_set_instruction_video"
              id="first_set_instruction_1"
              className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
              placeholder="Enter instruction for first set"
              onChange={handleVideo}
            />
          </div>
        </div>

        <div className="space-x-4 mt-8">
          <Button
            buttonText="save"
        
            
          />
          {/* Secondary */}
          
        </div>
      </form>
      <button
            type="reset"
            className="py-2 px-4 bg-white border mt-4 border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
          >
            back
          </button>
      </div>
    </div>
  );
}

export default WorkoutForm;
