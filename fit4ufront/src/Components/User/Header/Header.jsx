import React, { useEffect, useState } from 'react'
import logo from '../../../assets/logo-1.png'
import { Link } from 'react-router-dom'
import { FiMessageSquare } from 'react-icons/fi'; // Import the chat icon
import { userAxiosInstance } from '../../../axios/axios';



function Header() {
    const [logout, setLogout] = useState(false)
    const [mobMenu, setMobMenu] = useState(false)
    const [payed ,setPayed] =  useState(false)
    useEffect(() => {
        userAxiosInstance.get('/postLogin').then((res) => {
            setLogout(true)
        }).catch((error) => {
            setLogout(false)
        })
        userAxiosInstance.get('/paymentHistory').then((res)=>{
            setPayed(res.data.status)
        })

    }, [])
    const handleLogout = () => {
        alert('logout')

        localStorage.removeItem('userToken')
        setLogout(false)
        toast.dismiss('logout sucessfully')

    }
    return (
        <div>
            <nav className="bg-transparent-1000 ">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 right-4 flex items-center sm:hidden" onClick={() => setMobMenu(!(mobMenu))}>
                            {/* Mobile menu button*/}
                            <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                {/*
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          */}
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                {/*
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          */}
                                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start ml-5 ">
                            <div className="flex flex-shrink-0 items-center">
                                <img src={logo} alt="" className='logo-img' />
                            </div>
                            <div className="hidden sm:ml-6 sm:block items-center ml-auto w-[100%] nav-items-div">
                                <div className="flex items-center space-x-center justify-center mt-5">
                                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                                    <div className="flex items-center space-x-4 mt-5"> {/* Use space-x-4 to add spacing between links */}
                                        {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                                        <Link to="/" className="text-gray-300 hover:text-white rounded-md px-3 py-2 hover:underline hover:border-red-500 hover:border-b hover:border-solid text-sm font-medium uppercase">home</Link>
                                        <Link to="/trainerList" className="text-gray-300 hover:text-white rounded-md px-3 py-2 hover:underline hover:border-red-500 hover:border-b hover:border-solid text-sm font-medium uppercase">trainer</Link>
                                        <Link to="/blogs" className="text-gray-300 hover:text-white rounded-md px-3 py-2 hover:underline hover:border-red-500 hover:border-b hover:border-solid text-sm font-medium uppercase">blog</Link>
                                        {logout && (
                                            <div className="flex items-center space-x-4">
                                                <Link
                                                    to="/workouts"
                                                    className="text-gray-300 hover:text-white rounded-md px-3 py-2 hover:underline hover:border-red-500 hover:border-b hover:border-solid text-sm font-medium uppercase"
                                                >
                                                    workout
                                                </Link>
                                                <Link
                                                    to="/profile"
                                                    className="text-gray-300 hover:text-white rounded-md px-3 py-2 hover:underline hover:border-red-500 hover:border-b hover:border-solid text-sm font-medium uppercase"
                                                >
                                                    Profile
                                                </Link>
                                                <Link
                                                    to="/chat"
                                                    className="flex items-center text-gray-300 hover:text-white rounded-md px-3 py-2 hover:underline hover:border-red-500 hover:border-b hover:border-solid text-sm font-medium uppercase"
                                                >
                                                    <FiMessageSquare className="mr-1" /> Chat
                                                </Link>
                                            </div>
                                        )}

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                            {/* Profile dropdown */}
                            {!logout ?
                                <div className="relative ml-3">

                                    <Link to='/selectUser'>
                                        <div class="svg-wrapper hidden sm:ml-6 sm:block text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="190" height="60">
                                                <rect width="190" height="60" class="shape"></rect>
                                            </svg>
                                            <div class="text">Membership</div>
                                        </div>
                                    </Link>
                                </div> : <div className="relative ml-3" onClick={handleLogout}>

                                    <div class="svg-wrapper hidden sm:ml-6 sm:block text-white" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="190" height="60">
                                            <rect width="190" height="60" class="shape"></rect>
                                        </svg>
                                        <div class="text">Logout</div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {/* Mobile menu, show/hide based on menu state. */}
                <div className="sm:hidden" id="" >
                    {mobMenu &&
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            <ul>
                                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                                <li><a href="#" className="text-gray-300 hover:text-white rounded-md px-3 py-2 hover:underline hover:border-red-500 hover:border-b hover:border-solid text-sm font-medium uppercase">home</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white rounded-md px-3 py-2 hover:underline hover:border-red-500 hover:border-b hover:border-solid text-sm font-medium uppercase">about</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white rounded-md px-3 py-2 hover:underline hover:border-red-500 hover:border-b hover:border-solid text-sm font-medium uppercase">services</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white rounded-md px-3 py-2 hover:underline hover:border-red-500 hover:border-b hover:border-solid text-sm font-medium uppercase">trainer</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white rounded-md px-3 py-2 hover:underline hover:border-red-500 hover:border-b hover:border-solid text-sm font-medium uppercase">profile</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white rounded-md px-3 py-2 hover:underline hover:border-red-500 hover:border-b hover:border-solid text-sm font-medium uppercase">blog</a></li>
                                {!logout ? <li><div class="svg-wrapper text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="190" height="60">
                                        <rect width="190" height="60" class="shape"></rect>
                                    </svg>
                                    <div class="text">Membership</div>
                                </div></li>
                                    : <li><div class="svg-wrapper">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="190" height="60">
                                            <rect width="190" height="60" class="shape"></rect>
                                        </svg>
                                        <div class="text">Logout</div>
                                    </div></li>
                                }
                            </ul>
                        </div>}
                </div>
            </nav>
        </div>
    )
}

export default Header
