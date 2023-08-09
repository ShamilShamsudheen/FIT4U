import React from 'react'
import heroImage from '../../assets/h1_hero.png'
import Header from '../../Components/User/Header/Header'
import TrainerMain from '../../Components/User/TrainerMain/TrainerMain';


function Trainers() {
    const style = {
        backgroundImage: `url(${heroImage})`,
        width: '98.9vw',
        height: '100vh',
        backgroundSize: 'cover'
    };
    return (
        <div className='' style={style}>
            <Header />
            <div className='trainer-list bg-black mt-80 flex justify-center'>
                <div className='text-red-900 mx-auto'>
                    <div className="flex justify-center w-full mt-4">
                        <h2 className="uppercase font-semibold text-2xl text-center">
                            <span className=" text-lg tracking-wide font-Mogra font-extrabold">
                                Top Trainers
                            </span>
                        </h2>
                    </div>
                    <TrainerMain />
                </div>
            </div>
        </div>

    )
}

export default Trainers
