import { button } from 'framer-motion/client';
import React, { useState } from 'react'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
const UserControl = ({show}) => {
  const navigate = useNavigate()
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file); 
  }
  const [displayShow , setDisplayShow] = useState("")
  const token = localStorage.getItem("token")
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): null
  return (
    <div  className={`z-50  justify-end px-40 flex`}>
     <div className='shadow-2xl rounded-b-md px-2 w-60 flex flex-col space-y-2 py-2 text-center'>
            <div className='flex  justify-center'>
                <p className='font-medium  w-72'>{user? (user.name):"User"}</p>
                <div className='flex justify-center items-center'>
                    <button className='text-lg' onClick={()=> show(false)}>x</button>
                </div>
            </div>
                <p className='text-sm'>{user? (user.email):"User@gmail.com"}</p>

              <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <button
        onClick={handleButtonClick}
        className="py-1 border  cursor-pointer side-bar-hover"
      >
        Change Profile
      </button>
      <button className='py-1 side-bar-hover border' onClick={()=> token? (localStorage.clear(token)) : (navigate("/signup")) }>{token? "logout" : "login"}</button>
      
        
        </div> 
    </div>
  )
}

export default UserControl
