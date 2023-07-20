import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { TrainerApi } from '../../../api/api';
import { fileUpload } from '../../../Constants/Constants';
import { toast } from 'react-hot-toast';



function TrainerProfilePage() {
  const [trainer, setTrainer] = useState([]);
  const [showInput, setShowInput] = useState(false);

useEffect(() => {
  const trainerJwtToken = localStorage.getItem('trainerToken');
  console.log(trainerJwtToken);
  if (trainerJwtToken) {
    TrainerApi.post('/trainer/postLogin', { trainerJwtToken })
      .then((res) => {
        console.log(res.data.trainerData);
        setTrainer(res.data.trainerData); 
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    <Navigate to="/login" />;
  }
}, []);

const handleImageClick = () => {
  setShowInput(!showInput);
};

const handleImageInputChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const profileUrl = await fileUpload('TrainerProfile', file)
    console.log(profileUrl)
    TrainerApi.post('/trainer/profileImgUpload', { profileUrl, id: trainer._id }).then((res) => {
      setTrainer(res.data.updateProfile)
      setShowInput(false);
      toast.success(res.data.message)
    })
  }
};

return (
    <div class="p-16 bg-black">
      {/* {trainer.map((data)=>( */}

      <div class="p-8 bg-white shadow mt-24 flex flex-col">
        <div class="relative flex justify-center">
        <div>
            {/* Image Div */}
            <div
              className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500"
              onClick={handleImageClick}
            >
              <img src={trainer.profileImg} className="w-full h-full rounded-full" alt="" />
            </div>

            {/* Input to select image */}
            {showInput && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageInputChange}
                style={{ display: 'none' }}
                ref={(fileInput) => fileInput && fileInput.click()}
              />
            )}
          </div>
        </div>
        <br />
        <p class="text-center mt-20">click on photo to change</p>
       
        <div class="pt-10 text-center border-b pb-12">
          <h1 class="text-4xl font-medium text-gray-700">{trainer.name}</h1>
          <p class="font-light text-gray-600 mt-3">{trainer.email}</p>

          <p class="mt-2 text-gray-500">{trainer.mobile}</p>
        </div>

       
        {/* <div className="mt-10">
          <div className="mx-auto w-2/4">
            <ul className="bg-gray-300 grid grid-flow-col gap-10 text-center text-gray-500rounded-lg p-1">
              <li>
                <a
                  className="flex justify-center py-2 text-md cursor-pointer"
                  style={{ fontFamily: 'Kanit, sans-serif' }}
                  onClick={()=>setDetails(!details)}
                >
                  Details
                </a>
              </li>
              <li>
                <a
                  className="flex justify-center py-2 text-md cursor-pointer"
                  style={{ fontFamily: 'Kanit, sans-serif' }}
                  onClick={()=>setStatus(!status)}
                >
                  Status
                </a>
              </li>
              <li>
                <a
                  className="flex justify-center py-2 text-md cursor-pointer"
                  style={{ fontFamily: 'Kanit, sans-serif' }}
                  onClick={()=>setHistory(!history)}
                >
                  History
                </a>
              </li>
            </ul>
          </div>
          
        </div> */}
        {/* {details &&
           <div className="rounded-lg bg-white shadow-lg p-16">
           <div className="flex justify-center">
             <svg
               xmlns="http://www.w3.org/2000/svg"
               className="h-10 w-10 text-indigo-800"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth={2}
                 d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
               />
             </svg>
           </div>
     
           <div className="text-center mt-2">
             <h1 className="text-purple-900 font-bold text-2xl">Details</h1>
            
     
             
     
             <div className="py-8 border-b border-indigo-50">
  <div className="flex flex-col">
    <p className="ml-1 text-gray-900 font-bold text-2xl uppercase">Age: <span>{trainer.age}</span></p>
    <p className="ml-1 text-gray-900 font-bold text-2xl uppercase">Height: <span>{trainer.height}</span></p>
    <p className="ml-1 text-gray-900 font-bold text-2xl uppercase">Weight: <span>{trainer.weight}</span></p>
    <p className="ml-1 text-gray-900 font-bold text-2xl uppercase">Goal: <span>{trainer.goal}</span></p>
  </div>
</div>



           </div>
     
           <div className="flex justify-center mt-8">
             <button className="text-white py-2 px-4 rounded-lg bg-purple-700 hover:bg-purple-600 shadow-md font-medium transition-colors">
               Upload
             </button>
           </div>
         </div>
        } */}
      </div>
      {/* ))} */}
      
    </div>
  )
}

export default TrainerProfilePage
