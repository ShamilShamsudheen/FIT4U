import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { SiTrainerroad } from  'react-icons/si';
import { BiSolidUser } from "react-icons/bi";
import { FaBlog } from "react-icons/fa6";
import { RiCalendarTodoFill } from "react-icons/ri";
import { PiFlagBannerFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
function Sidebar() {
  const navigate = useNavigate();
  const sideBarMenu = [
    {
      name:"Dashboard",
      link:'/admin/dashboard',
      icons:MdSpaceDashboard,

    },
    {
      name:"Users",
      link:'/admin/userDetails',
      icons:BiSolidUser,

    },
    {
      name:"Trainers",
      link:'/admin/trainerDetails',
      icons:SiTrainerroad,

    },
    {
      name:"Blogs",
      link:'/admin/Blogs',
      icons:FaBlog,

    },
    {
      name:"Workouts",
      link:'/admin/workouts',
      icons:RiCalendarTodoFill,

    },
  ]
  const handleClick =()=>{
    try {
      
    } catch (error) {
      
    }
  }
  return (
    <div className="h-[93.1vh] w-full bg-white py-4 pt-16 font-serif">
  {sideBarMenu.map((menuItems) => (
    <Link to={menuItems.link} key={menuItems.name}>
      <div className="h-14 flex items-center justify-center pl-4 md:justify-start text-sm lg:text-lg hover:bg-red-600">
        <div className="mr-1">{React.createElement(menuItems.icons, { size: "20" })}</div>
        <p className="hidden md:block">{menuItems.name}</p>
      </div>
    </Link>
  ))}
</div>

  )
}

export default Sidebar;
