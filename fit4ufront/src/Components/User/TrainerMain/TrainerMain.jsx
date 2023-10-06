import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { userAxiosInstance } from '../../../axios/axios';
import { RiEyeLine } from 'react-icons/ri'; // Import the view icon from react-icons library
import imageSample from '../../../assets/blog_img_1.png'
function TrainerMain() {
  const navigate = useNavigate();
  const [trainersData, setTrainerData] = useState([]);
  const [user, setUser] = useState([]);
  const [hoveredTrainers, setHoveredTrainers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userJwtToken = localStorage.getItem('userToken');
      console.log(userJwtToken + " anything solved");
      if (userJwtToken) {
        try {
          const response = await userAxiosInstance.get('/postLogin', { headers: { Authorization: `Bearer ${userJwtToken}` } });
          console.log(response.data.userData);
          setUser(response.data.userData);
        } catch (error) {
          console.log(error);
        }
      } else {
        navigate('/login');
        return;
      }

      try {
        const response = await userAxiosInstance.get('/trainers');
        setTrainerData(response.data.approvedTrainer);
        setHoveredTrainers(new Array(response.data.approvedTrainer.length).fill(false));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [navigate]);

  // const handleReserve = async (trainerId) => {
  //   try {
  //     const response = await userAxiosInstance.post('/payment', { trainerId });
  //     console.log(response.data.session);
  //     const session = response.data.session;
  //     console.log(session);
  //     if (session) {
  //       window.location.href = session.url;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleCardHover = (index) => {
    const updatedHoveredTrainers = [...hoveredTrainers];
    updatedHoveredTrainers[index] = true;
    setHoveredTrainers(updatedHoveredTrainers);
  };

  const handleCardLeave = (index) => {
    const updatedHoveredTrainers = [...hoveredTrainers];
    updatedHoveredTrainers[index] = false;
    setHoveredTrainers(updatedHoveredTrainers);
  };

  const handleClick = (trainerId) => {
    navigate(`/singleTrainer/${trainerId}`);
  };

  return (
    <div className="flex justify-center mt-6 text-anber-500 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {trainersData.map((trainer, index) => (
          <div key={trainer._id} className="max-w-sm rounded overflow-hidden border-2 border-gray-50 shadow-lg" onClick={() => handleClick(trainer._id)}>
            <div
              className={`card ${hoveredTrainers[index] ? 'hovered' : ''}`}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={() => handleCardLeave(index)}
            >
              <div className="relative h-[19rem] w-[19rem]">
                <img
                  src={trainer.profileImg ? `${trainer.profileImg}`:`${imageSample}` }
                  alt="img"
                  className={`w-full max-w-2xl transform ${hoveredTrainers[index] ? 'scale-150' : 'scale-100'} transition-transform duration-300 ease-in-out`}
                />
                <div className="absolute bottom-0 px-3 pb-3 w-full">
                  <div className='flex  justify-between'>
                <div className="text-gray-50 text-lg font-semibold ">{trainer.name}</div>

                  <RiEyeLine size={24} className="text-gray-50 " />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrainerMain;
