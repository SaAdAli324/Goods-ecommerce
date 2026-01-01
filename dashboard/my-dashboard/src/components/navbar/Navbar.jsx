import React from 'react'
import { FaList, FaTachometerAlt } from 'react-icons/fa'
import { FaMeteor } from 'react-icons/fa6'
import Sidebar from '../sidebar/Sidebar'
import { useState } from 'react'
import { Link } from 'react-router'
const Navbar = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
        <div className=' sticky top-0 w-full h-fit z-50 bg-blue-900'>
            <div className='flex items-center max-md:flex-col max-md:items-center max-sm:justify-center  p-4'>
                <div className=' flex gap-7 items-center max-md:w-full '>
                    <FaList onClick={() => setSidebarOpen(!sidebarOpen)} className='text-2xl max-md:absolute text-white side-bar-hover mt-1 w-10 ' />
                <h2 className='text-3xl text-secondary max-md:w-full font-medium text-center cursor-pointer flex items-center justify-center   ' >Go<span className='text-accent'>O</span>ds</h2>
                </div>
                <div className='text-3xl w-full  justify-center text-secondary font-bold flex items-center '>Dashboard<FaTachometerAlt className='text-4xl text-accent' /> </div>
                
            </div>

        </div>
        <Sidebar sideBar={sidebarOpen}/>
</>
    )
}

export default Navbar
