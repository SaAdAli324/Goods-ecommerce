import React from 'react'
import { Link, Navigate } from 'react-router'
import { NavLink } from 'react-router';
import { useState } from 'react'
import { FaAddressBook, FaBus, FaCloudsmith, FaHamburger, FaJediOrder, FaLine, FaList, FaPlus, FaPowerOff, FaProductHunt, FaSwatchbook, FaTachometerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';
const Sidebar = ({sideBar}) => {
    const navigate=useNavigate()
   
const handleLogOut =()=>{
    localStorage.removeItem("token")
    navigate("/login")
}
    return (
        <>
            <div className={`shadow-2xl  bg-blue-900 text-secondary min-w-10  flex py-8 gap-14 px-4 h-full  max-md:h-fit fixed z-40 left-0 top-0 flex-col  ${sideBar ? "!text-lg max-md:flex-col transition-all duration-300 ease-in-out w-3xs" : "  border-black text-[0px] max-md:hidden transition-all duration-300 ease-in-out"} `} >
             
                <div className=''>
                    <ul className='font-medium flex  flex-col space-y-16 min-w-0 mt-20'>

                        <NavLink to="/dashboard" className={({isActive})=> isActive? "active-link" : "" }>
                            <li className={`  flex items-center  px-2 side-bar-hover gap-1`} > <FaTachometerAlt className='text-xl' />Dashboard</li>
                        </NavLink>

                        <NavLink to="/addProducts"className={({isActive})=> isActive? "active-link" : "" } >
                            <li className={`  flex items-center  px-2  side-bar-hover gap-1`}><FaPlus className='text-lg' /> Add Products</li>
                        </NavLink>

                        <NavLink to="/products" className={({isActive})=> isActive? "active-link" : "" }>
                            <li className={`flex items-center px-2 side-bar-hover gap-1`}><FaCloudsmith className='text-lg' />Products</li>
                        </NavLink>
                        <NavLink to="/orders" className={({isActive})=> isActive? "active-link" : "" }>
                            <li className={`  flex items-center px-2  side-bar-hover gap-1`}><FaBus className='text-lg' />Orders</li>
                        </NavLink>

                        <NavLink   to="/outOfStocks" className={({isActive})=> isActive? "active-link" : "" }>
                            <li className={`  flex items-center px-2  side-bar-hover  gap-1`}><FaSwatchbook className='text-lg' />Out of stocks</li>
                        </NavLink>


                    </ul>
                </div>
                <button className='flex  justify-center mt-auto min-w-0  px-3 py-1 rounded-2xl bg-accent items-center gap-2 cursor-pointer  ' onClick={()=> handleLogOut()}> <FaPowerOff/>logout </button>
            </div>
        </>
    )
}

export default Sidebar
