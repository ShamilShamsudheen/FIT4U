import React, { useEffect, useState } from 'react'
import Trainer from '../../../assets/trainerDefault.jpeg'
import { userAxiosInstance } from '../../../axios/axios';
import { Navigate, useNavigate } from 'react-router-dom';
// import TrainerCard from '../../TrainerCard/TrainerCard';


function TrainerMain() {
  const navigate = useNavigate();
  const [trainersData, setTrianerData] = useState([])
  const [user, setUser] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const userJwtToken = localStorage.getItem('userToken');
      console.log(userJwtToken + " anything solved");
      if (userJwtToken) {
        try {
          const response = await userAxiosInstance.get('/postLogin', { userJwtToken });
          console.log(response.data.userData);
          setUser(response.data.userData);
        } catch (error) {
          console.log(error);
        }
      } else {
        return <Navigate to="/login" />;
      }

      try {
        const response = await userAxiosInstance.get('/trainers');
        setTrianerData(response.data.approvedTrainer);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log(trainersData)
  const handleResreve = async (trainerId) => {
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
  const handleClick = (trainerId) => {
    navigate(`/singleTrainer/${trainerId}`)
  }
  return (
    <div className="flex justify-center mt-6 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {trainersData.map((trainer) => (


          <div className="max-w-sm rounded overflow-hidden border-2 border-red-900 shadow-lg" onClick={() => handleClick(trainer._id)}>
            <div className="flex justify-center w-full overflow-hidden mb-3 shadow-lg">
              <img
                className="bg-gray-500 rounded-4 w-full h-40"
                src={trainer.profileImg || Trainer}
                alt="Profile image"
              />
            </div>

            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-red-500 uppercase">{trainer.name}</div>
              <p className="text-gray-500 text-base">
                {trainer.description}
              </p>
              <div className="font-bold text-xl mb-2 mt-2">INR.1000</div>
            </div>

            <div className="px-6 pt-4 pb-2">
              <div className="hidden sm:ml sm:block text-white">
                <div className="text mt-6" onClick={() => handleResreve(trainer._id)}>
                  <button
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    connect with us :
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

        ))}
      </div>

    </div>
  )
}

export default TrainerMain
