import React,{ useEffect, useState } from "react";
import { userAxiosInstance } from "../../../axios/axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function LTrainer() {
  const [trainers, setTrainers] = useState([]);
  useEffect(() => {
    userAxiosInstance.get("/trainers").then((res) => {
      setTrainers(res.data.approvedTrainer);
    });
  }, []);
  return (
    <div className=" bg-slate-900 flex flex-col items-center " id="trainers">
      <div className="blog-slide mx-auto top-0 mb-6">
        <h3 className="text-3xl font-bold relative inline-block group">
          Our trainers
          <span className="absolute left-0 -bottom-0.5 mt-1 w-full h-1 bg-amber-500 transform scale-x-0 transition-transform origin-left group-hover:scale-x-100"></span>
        </h3>
      </div>
      <div className="flex w-full"> 
        <div className="flex justify-center w-1/2">
          <div className="space-x-4 flex justify-center">
            <div className="space-x-4 my-auto  mx-auto">

            <h1 className="text-3xl ml-4 text-slate-400 uppercase items">about us</h1>
            <p className="text-sm text-slate-300">Elevate your fitness journey with our cutting-edge training web app.
               We are dedicated to empowering you with personalized workouts, expert 
               guidance, and a supportive community.Achieve your fitness goals
                effectively with a seamless blend of technology and expertise. 
                Join us and embark on a transformative path to a healthier, stronger you.</p>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <Carousel>
          {trainers.map((trainer)=>(
          <div key={trainer._id} className="w-3/4">
            
              <img src={trainer.profileImg} className="w-full"/>
              <p className="legend uppercase bg-transparent">Name : {trainer.name}</p>
          </div>
          ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default LTrainer;
