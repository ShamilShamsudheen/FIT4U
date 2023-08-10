import React, { useEffect, useState } from 'react'
import { fileUpload } from '../../../Constants/Constants';
import { FaUsers } from 'react-icons/fa';
import { FiCreditCard } from 'react-icons/fi';
import { AiOutlineEye } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { trainerAxiosInstance } from '../../../axios/axios';



function TrainerProfilePage() {
  const [trainer, setTrainer] = useState([]);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    trainerAxiosInstance.get('/postLogin').then((res) => {
      setTrainer(res.data.trainerData)
    })

  }, []);

  const handleImageClick = () => {
    setShowInput(!showInput);
  };

  const handleImageInputChange = async (event) => {
    const file = event.target.files[0];
    console.log(file)

    if (file) {
      const profileUrl = await fileUpload('TrainerProfile/', file)
      console.log(profileUrl)
      trainerAxiosInstance.post('/profileImgUpload', { profileUrl }).then((res) => {
        setTrainer(res.data.updateProfile)
        setShowInput(false);
        toast.success(res.data.message)
      })
    }
  };

  return (
    <div class="p-16 bg-transparent">
      <div class="p-8 bg-transparent shadow mt-24 flex flex-col">
        <div className="flex w-2/4 mx-auto items-center justify-center border border-amber-500 rounded-md space-x-4">
          <div className="flex flex-col justify-between">
            <div className="w-40 h-40 bg-indigo-100 mx-auto rounded-full shadow-2xl relative">
              <div className="absolute inset-0 flex items-start justify-start  text-indigo-500" onClick={handleImageClick}>
                <img src={trainer.profileImg} className="w-full h-full border border-amber-500 rounded-full" alt="" />
              </div>
            </div>
            {showInput && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageInputChange}
                style={{ display: 'none' }}
                ref={(fileInput) => fileInput && fileInput.click()}
              />
            )}
            <p className="text-center text-amber-900 text-xs">Click on the photo to change</p>
          </div>


          <div className="pt-10  pb-12 text-left">
            <h1 className="text-4xl font-medium text-amber-500"><span className='text-xs text-gray-500'>NAME :</span>{trainer.name}</h1>
            <p className="font-light text-amber-500 mt-3"><span className='text-xs text-gray-500'>EMAIL :</span>{trainer.email}</p>
            <p className="mt-2 text-amber-500"><span className='text-xs text-gray-500'>MOBILE NO :</span>{trainer.mobile}</p>
          </div>

        </div>
        <div className='mx-auto mt-4 text:sm font-bold'>Dashboard</div>
        <div className="flex justify-center w-1/2 mx-auto mt-4 text-gray-50">
          <div className="items-center w-1/2 h-32 rounded-lg mr-2">
            <div className=''>
              <FaUsers size='2rem' />
            </div>
            <div className="">
              Number of User:<span>10</span>
            </div>
          </div>
          <div className="items-center w-1/2 h-32 rounded-lg mr-2">
            <div className=''>
              <FiCreditCard size='2rem' />
            </div>
            <div className="">
              Wallet Amount: <span>10</span>
            </div>
          </div>
          {/* <div className="flex items-center w-1/3 h-32 rounded-lg mr-2">
            <div className='w-1/2'>
              <AiOutlineEye size='1x' />
            </div>
            <div className="ml-2">
              Number of Views: <span>10</span>
            </div>
          </div> */}
        </div>



      </div>
    </div>
  )
}

export default TrainerProfilePage
