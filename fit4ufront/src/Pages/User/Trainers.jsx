import React from 'react'
import heroImage from "../../assets/h1_hero.png";
import Header from "../../Components/User/Header/Header";
import TrainerMain from "../../Components/User/TrainerMain/TrainerMain";

function Trainers() {
  const style = {
    backgroundImage: `url(${heroImage})`,
    width: "98.9vw",
    height: "100vh",
    backgroundSize: "cover",
  };
  return (
    <div className="text-center" style={style}>
      <Header />
      <div className="flex justify-center h-72 items-center main-slide">
        <h3 className="slide-text animate-slide-top">Trainers</h3>
      </div>
      <div className="trainer-list bg-black flex justify-center">
        <div className=" mx-auto">

          <TrainerMain />
        </div>
      </div>
    </div>
  );
}

export default Trainers;
