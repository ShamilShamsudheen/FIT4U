import React from 'react'
import './Main.css'
import banner from '../../../assets/h1_hero.png'

function Main() {
    return (
        <div className='main-slide '>
            <h3 className='slide-text animate-slide-top'>Hi this is fit4u</h3>
            <h1 className='slide-heading animate-slide-left'>GYM TRAINER</h1>
            <div class="svg-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="190" height="60">
                    <rect width="190" height="60" class="shape"></rect>
                </svg>
                <div class="text">My Courses</div>
            </div>
        </div>
    )
}

export default Main
