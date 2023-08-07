import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { userAxiosInstance } from '../../../axios/axios'
import Trainer from '../../../assets/trainerDefault.jpeg'


function SingleTrainer() {
    const [singleTrainer, setTrainer] = useState([])
    const [resume,setResume] = useState(null)
    const [certificate,setCertificate] = useState(null)
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
        await userAxiosInstance.post('/paymentConformation', { trainerId, session }).then((res) => {
          if (res.data.status) {

            window.location.href = session.url;
          }
        })
      }

    })
  }
    return (
        <div className='w-full h-full bg-white mt-10 backdrop-filter backdrop-blur-lg'>
            <div className="flex flex-col items-center justify-center min-h-screen w-1/3 mx-auto mt-10">
                <h2 className="text-xl font-bold mt-2 mb-3 ">Trainer : {singleTrainer.name}</h2>
                {!singleTrainer.profileImg ? (
                <img
                  className="bg-gray-500 rounded-full w-40 h-40"
                  src={Trainer}
                  alt="Profile image"
                />
              ) : (
                <img
                  className="bg-gray-500 rounded-full w-40 h-40"
                  src={singleTrainer.profileImg}
                  alt="Sunset in the mountains"
                />
              )}
                <div className="mt-4 flex flex-col items-center space-y-4">
                    <div className="flex space-x-4">
                        <button
                            className={`px-3 py-2 text-xs font-medium text-center rounded-lg ${setResume ? 'bg-blue-700 text-white' : 'bg-gray-300 text-gray-600'
                                }`}
                            onClick={() => setResume(singleTrainer.resume)}
                        >
                            Qualification
                        </button>
                        <button
                            className={`px-3 py-2 text-xs font-medium text-center rounded-lg ${setCertificate ? 'bg-blue-700 text-white' : 'bg-gray-300 text-gray-600'
                                }`}
                            onClick={() => setCertificate(singleTrainer.certificate)}
                        >
                            Awards
                        </button>
                    </div>

                    <div className="w-96 h-40 overflow-y-auto border border-gray-300 p-4 rounded-lg flex justify-center">
                        {/* Show the preview based on button clicks */}
                        {resume && (
                            <div className="flex flex-wrap">
                                    <img src={resume} alt='' className="w-24 h-24 m-2" />
                            </div>
                        )}

                        {certificate && (
                            <div className="flex flex-wrap">
                                    <img src={certificate} alt='' className="w-24 h-24 m-2" />
                            </div>
                        )}
                    </div>
                </div>
                <div class="px-6 pt-4 pb-2 mt-4">
              <div class=" hidden sm:ml-6 sm:block text-white">

                <div class="text mt-6" onClick={() => handleResreve(singleTrainer._id)}><button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                  connect with us : <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </button></div>
              </div>
            </div>
            </div>

        </div>

    )
}

export default SingleTrainer
