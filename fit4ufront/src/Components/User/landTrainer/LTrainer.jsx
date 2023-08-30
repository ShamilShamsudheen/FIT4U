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
    <div className="min-h-screen bg-black flex flex-col items-center" id="trainers">
      <div className="trainer-slide mb-2">
        <h3 className="text-3xl font-bold animate-slide-top text-white">Trainers</h3>
      </div>
      <div className="container mx-auto flex flex-row items-start gap-4">
        {/* Left Div */}
        <div className="flex flex-col justify-start w-1/2 p-4">
          <h1 className="text-2xl font-semibold text-white">Trainer Information</h1>
          <p className="text-gray-300 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod...
          </p>
        </div>
        {/* Right Div */}
        <div className="w-1/2 overflow-x-auto">
          <div className="flex flex-row space-x-2 max-h-80 overflow-y-auto">
            {trainers &&
              trainers.map((trainer, index) => (
                <div
                  key={index}
                  className="relative h-40 w-40 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 transform hover:translate-y-2"
                >
                  <img
                    className="object-cover h-full w-full"
                    src={trainer.profileImg ? `${trainer.profileImg}` : `${Trainer}`}
                    alt="Trainer"
                  />
                  <span
                    className={`${index % 2 === 0 ? 'bg-blue-200' : 'bg-blue-400'
                      } absolute bottom-0 left-0 w-full py-1 text-center text-xs text-white`}
                  >
                    {trainer.name}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>




  )
}

export default LTrainer
