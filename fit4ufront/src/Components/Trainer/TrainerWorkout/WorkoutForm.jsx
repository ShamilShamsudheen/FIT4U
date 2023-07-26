import React from 'react'

function WorkoutForm() {
  return (
    <>
        <div class="p-8 rounded border border-gray-200 text-white">
  <h1 class="font-medium text-3xl">Add Workout Item</h1>
  <p class="text-white-700  mt-6">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos dolorem vel cupiditate laudantium dicta.</p>
  <form>
    <div class="mt-8">
      <label for="workout_name" class="text-sm text-white-700  block mb-1 font-medium">Workout Name</label>
      <input type="text" name="workout_name" id="workout_name" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter workout name" />
    </div>

    {/* <!-- First Set --> */}
    <div class="mt-8 grid lg:grid-cols-4 gap-4">
    <div>
        <label for="first_set_reps" class="text-sm text-white-700 block mb-1 font-medium">Item Name</label>
        <input type="text" name="first_set_reps" id="first_set_reps" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter reps for first set" />
      </div>
      <div>
        <label for="first_set_reps" class="text-sm text-white-700  block mb-1 font-medium">First Set Reps</label>
        <input type="text" name="first_set_reps" id="first_set_reps" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter reps for first set" />
      </div>
      <div>
        <label for="first_set_weight" class="text-sm text-white-700  block mb-1 font-medium">First Set Weight</label>
        <input type="text" name="first_set_weight" id="first_set_weight" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter weight for first set" />
      </div>
      <div>
        <label for="first_set_instruction" class="text-sm text-white-700  block mb-1 font-medium">First Set Instruction</label>
        <input type="file" name="first_set_instruction" id="first_set_instruction" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter instruction for first set" />
      </div>
    </div>

    {/* <!-- Second Set --> */}
    <div class="mt-4 grid lg:grid-cols-4 gap-4">
    <div>
        <label for="first_set_reps" class="text-sm text-white-700  block mb-1 font-medium">Item Name</label>
        <input type="text" name="first_set_reps" id="first_set_reps" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter reps for first set" />
      </div>
      <div>
        <label for="second_set_reps" class="text-sm text-white-700 block mb-1 font-medium">Second Set Reps</label>
        <input type="text" name="second_set_reps" id="second_set_reps" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter reps for second set" />
      </div>
      <div>
        <label for="second_set_weight" class="text-sm text-white-700  block mb-1 font-medium">Second Set Weight</label>
        <input type="text" name="second_set_weight" id="second_set_weight" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter weight for second set" />
      </div>
      <div>
        <label for="second_set_instruction" class="text-sm text-white-700  block mb-1 font-medium">Second Set Instruction</label>
        <input type="file" name="second_set_instruction" id="second_set_instruction" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter instruction for second set" />
      </div>
    </div>

    {/* <!-- Third Set --> */}
    <div class="mt-4 grid lg:grid-cols-4 gap-4">
    <div>
        <label for="first_set_reps" class="text-sm text-white-700  block mb-1 font-medium">Item Name</label>
        <input type="text" name="first_set_reps" id="first_set_reps" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter reps for first set" />
      </div>
      <div>
        <label for="third_set_reps" class="text-sm text-white-700  block mb-1 font-medium">Third Set Reps</label>
        <input type="text" name="third_set_reps" id="third_set_reps" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter reps for third set" />
      </div>
      <div>
        <label for="third_set_weight" class="text-sm text-white-700  block mb-1 font-medium">Third Set Weight</label>
        <input type="text" name="third_set_weight" id="third_set_weight" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter weight for third set" />
      </div>
      <div>
        <label for="third_set_instruction" class="text-sm text-white-700  block mb-1 font-medium">Third Set Instruction</label>
        <input type="file" name="third_set_instruction" id="third_set_instruction" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter instruction for third set" />
      </div>
    </div>

    {/* <!-- fourth Set --> */}
    <div class="mt-4 grid lg:grid-cols-4 gap-4">
    <div>
        <label for="first_set_reps" class="text-sm text-white-700  block mb-1 font-medium">Item Name</label>
        <input type="text" name="first_set_reps" id="first_set_reps" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter reps for first set" />
      </div>
      <div>
        <label for="third_set_reps" class="text-sm text-white-700  block mb-1 font-medium">Third Set Reps</label>
        <input type="text" name="third_set_reps" id="third_set_reps" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter reps for third set" />
      </div>
      <div>
        <label for="third_set_weight" class="text-sm text-white-700  block mb-1 font-medium">Third Set Weight</label>
        <input type="text" name="third_set_weight" id="third_set_weight" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter weight for third set" />
      </div>
      <div>
        <label for="third_set_instruction" class="text-sm text-white-700  block mb-1 font-medium">Third Set Instruction</label>
        <input type="file" name="third_set_instruction" id="third_set_instruction" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter instruction for third set" />
      </div>
    </div>

    {/* <!-- fifth Set --> */}
    <div class="mt-4 grid lg:grid-cols-4 gap-4">
    <div>
        <label for="first_set_reps" class="text-sm text-white-700  block mb-1 font-medium">Item Name</label>
        <input type="text" name="first_set_reps" id="first_set_reps" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter reps for first set" />
      </div>
      <div>
        <label for="third_set_reps" class="text-sm text-white-700  block mb-1 font-medium">Third Set Reps</label>
        <input type="text" name="third_set_reps" id="third_set_reps" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter reps for third set" />
      </div>
      <div>
        <label for="third_set_weight" class="text-sm text-white-700  block mb-1 font-medium">Third Set Weight</label>
        <input type="text" name="third_set_weight" id="third_set_weight" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter weight for third set" />
      </div>
      <div>
        <label for="third_set_instruction" class="text-sm text-white-700  block mb-1 font-medium">Third Set Instruction</label>
        <input type="file" name="third_set_instruction" id="third_set_instruction" class="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" placeholder="Enter instruction for third set" />
      </div>
    </div>

    <div class="space-x-4 mt-8">
      <button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50">Save</button>
      {/* <!-- Secondary --> */}
      <button class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">Cancel</button>
    </div>
  </form>
</div>
 
    </>
  )
}

export default WorkoutForm
