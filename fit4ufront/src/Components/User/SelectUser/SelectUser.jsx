import React, { useState } from 'react'
import './SelectUser.css'
import logo from '../../../assets/logo-1.png'
import {Navigate } from 'react-router-dom'


function SelectUser() {
    const [role,setRole] = useState(null)
    const handler = (role) =>{
        setRole(role)
    }
    return (
        <>
        {role === 'beginner' ? (
        <Navigate to = {'/signUp' }/>): role === 'trainer' ? (<Navigate to = {'/trainer/signUp' }/>) :(
            <div className='signup-body'>
            <center>

                <img src={logo} alt="" />
                <div class="flex items-center justify-center rounded-full w-38 h-38 row space-x-6">
                    <div class="cards" onClick={()=>handler("trainer")}>
                        <figure class="trainercard">
                            <figcaption class="card_title uppercase">Trainer</figcaption>
                        </figure>
                    </div>
                    <div class="cards" onClick={()=>handler('beginner')}>
                        <figure class="beginnercard">
                            <figcaption class="card_title uppercase">beginner </figcaption>
                        </figure>
                    </div>
                </div>
            </center>
        </div>
        )}
        </>
        
    )
}

export default SelectUser;
