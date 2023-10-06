import React from 'react'
import calisthenics from "../../../assets/img/gallery/calisthenics.avif";
import bodybuilder from "../../../assets/img/gallery/bodybuilder.avif";
import fitnessTriner from "../../../assets/img/gallery/fitness.avif";

function Offer() {
  return (
    <div className="bg-slate-900  flex flex-col items-center  py-8" id="blogs">
      <div className="blog-slide mx-auto top-0 mb-6">
        <h3 className="text-3xl font-bold relative inline-block group">
          What i offer
          <span className="absolute left-0 -bottom-0.5 mt-1 w-full h-1 bg-amber-500 transform scale-x-0 transition-transform origin-left group-hover:scale-x-100"></span>
        </h3>
      </div>
      <div className="bg-transparent w-full flex justify-center">
        <div className="w-3/4 bg-trainsparent flex justify-center">
          <div className=" flex space-x-4 w-screen ">
            <div
              className="w-1/3 h-screen rounded relative overflow-hidden"
              style={{
                backgroundImage: `url(${calisthenics})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Content to show on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="text-white text-center">
                  <h2 className="text-xl  text-amber-600 uppercase">Calisthenics</h2>
                  <p className="text-xs text-slate-400 ml-4 mr-4">
                    Calisthenics is a bodyweight workout emphasizing strength,
                    flexibility, and endurance through rhythmic movements.
                  </p>
                </div>
              </div>

              
            </div>

            <div
              className="w-1/3 h-screen rounded relative overflow-hidden"
              style={{
                backgroundImage: `url(${bodybuilder})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Content to show on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="text-white text-center">
                  <h2 className="text-xl  text-amber-600 uppercase">Body builder</h2>
                  <p className="text-xs text-slate-400 ml-4 mr-4">
                  Passionate bodybuilder sculpting muscles, embracing discipline, 
                  and achieving peak fitness through dedicated training and nutrition.
                  </p>
                </div>
              </div>

              
            </div>
            <div
              className="w-1/3 h-screen rounded relative overflow-hidden"
              style={{
                backgroundImage: `url(${fitnessTriner})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Content to show on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="text-white text-center">
                  <h2 className="text-xl  text-amber-600 uppercase">fitness training</h2>
                  <p className="text-xs text-slate-400 ml-4 mr-4">
                  Elevate your fitness with personalized training programs, 
                  fostering strength, endurance, and overall well-being. Unleash your potential!
                  </p>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offer;
