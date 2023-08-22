import React, { useEffect, useState } from 'react'
import { userAxiosInstance } from '../../../axios/axios'
import Trainer from '../../../assets/trainerDefault.jpeg'

function LTrainer() {
  const [trainers, setTrainers] = useState([])
  useEffect(() => {
    userAxiosInstance.get('/trainers').then((res) => {
      setTrainers(res.data.approvedTrainer)
    })
  }, [])
  return (
    <div className="min-h-screen bg-black flex flex-col items-center">
      <hr className="my-4" />
      <div className="trainer-slide mx-auto top-0 mb-2">
        <h3 className="text-3xl font-bold animate-slide-top">Trainers</h3>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        {trainers &&
          trainers.map((trainer, index) => (
            <div
              key={index}
              className="p-9 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 mx-auto transform hover:translate-y-2"
            >
              <img
                className="rounded-xl h-40"
                src={trainer.profileImg ? `${trainer.profileImg}` : `${Trainer}`}
                alt="Product"
              />
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="mt-5 text-2xl font-semibold">{trainer.name}</h1>
                </div>
                <div>
                  <button className="text-white text-md font-semibold bg-green-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110">
                    view
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>

  )
}

export default LTrainer
