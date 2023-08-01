import React, { useEffect, useState } from 'react'
import Trainer from '../../../assets/trainerDefault.jpeg'
// import { UserApi } from '../../../api/api';
import { userAxiosInstance } from '../../../axios/axios';
import { Navigate } from 'react-router-dom';


function TrainerMain() {
  const [trainersData, setTrianerData] = useState([])
  const [user,setUser] = useState([])
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
  const handleResreve = async(trainerId)=>{
    console.log(trainerId)
    // e.preventDefault();
    await userAxiosInstance.post('/payment',{trainerId}).then(async(res)=>{
      console.log(res.data.session);
      const session = res.data.session;
      console.log(session);
      if(session){
        await userAxiosInstance.post('/paymentConformation',{trainerId,session}).then((res)=>{
          if(res.data.status){

            window.location.href = session.url;
          }
        })
      }

    })
  }
  return (
    <div className="flex justify-center mt-6">
      <div className="grid grid-cols-3 gap-6 mt-6">
        {trainersData.map((trainer)=>(

        
          <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="flex justify-center w-full rounded overflow-hidden shadow-lg">
              {!trainer.profileImg ? <img class=" bg-gray-500 rounded-full " src={Trainer} alt="Profile image" />:<img class=" bg-gray-500 rounded-full " src={trainer.profileImg} alt="Sunset in the mountains" />}
            </div>
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2 text-white uppercase">{trainer.name}</div>
              <p class="text-white text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
              </p>
              {/* <div class="font-bold text-xl mb-2 text-white mt-2">INR. {trainer.price}</div> */}

            </div>
            <div class="px-6 pt-4 pb-2">
              <div class="svg-wrapper hidden sm:ml-6 sm:block text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="190" height="60">
                  <rect width="190" height="60" class="shape"></rect>
                </svg>
                <div class="text" onClick={()=>handleResreve(trainer._id)}>Reserve</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    
    </div>
  )
}

export default TrainerMain
