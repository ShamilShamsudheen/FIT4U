import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { userAxiosInstance } from '../../../axios/axios'
// import Trainer from '../../../assets/trainerDefault.jpeg'


function SingleTrainer() {
  const [singleTrainer, setTrainer] = useState([])
  const { trainerId } = useParams()
  useEffect(() => {
    console.log(trainerId)
    if (trainerId) {
      userAxiosInstance
        .get(`/singleTrainer/${trainerId}`)
        .then((res) => {
          setTrainer(res.data.trainerData)
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [])
    const handleResreve = async (trainerId) => {
    console.log(trainerId)
    // e.preventDefault();
    await userAxiosInstance.post('/payment', { trainerId }).then(async (res) => {
      console.log(res.data.session);
      const session = res.data.session;
      console.log(session);
      if (session) {
        window.location.href = session.url;

      }

    })
  }
  return (
    <>
      <div className='bg-slate-950 w-full flex justify-center'>
        <div className='mt-4 mb-4 flex justify-center'>
          {singleTrainer && (
            <div className='flex flex-col sm:flex-row w-3/4 space-x-0 sm:space-x-4 space-y-4'>
              <div className='w-full sm:w-1/2'>
                <img src={singleTrainer.profileImg} alt="" className='w-full rounded-2xl' />
              </div>
              <div className='w-full sm:w-1/2 items-start mt-4 sm:mt-0 my-auto'>
                <h1 className='text-2xl text-slate-300 uppercase font-bold'>{singleTrainer.name}</h1>
                <p className='text-md text-slate-500 mt-4'>{singleTrainer.description}</p>
                <div className='bg-black mt-4 flex justify-center bottom-0 rounded-xl cursor' onClick={handleResreve}>
                  <h3 className='text-2xl font-extrabold text-gray-400 mt-2 mb-2 uppercase cursor'>connect with us</h3>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </>

  )
}

export default SingleTrainer
