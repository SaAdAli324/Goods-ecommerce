import React, { useContext } from 'react'
import { IoCartOutline } from "react-icons/io5";
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import FadeInSection from './FadeAnimation/FadeInSection';
import UserControl from './user/UserControl';
import Login from './Auth/Login';
import { SearchContext } from './context/SearchBarContext';
import { FaCartPlus, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
const Navbar = () => {

  const user = localStorage.getItem('user') ? (JSON.parse(localStorage.getItem("user"))) : null


  const [displayUserControl, setDisplayUserControl] = useState(false)
  const navigate = useNavigate()
  const fileInputRef = useRef(null);
  const backendURL = import.meta.env.VITE_BACKEND_URL

  const handleButtonClick = () => {
    fileInputRef.current.click()
  };

  const handleFileChange = async (e) => {
    try {
      const token = localStorage.getItem("token")
      console.log(token);

      const file = e.target.files[0]
      const formData = new FormData()
      formData.append("avatar", file)
      const res = await fetch(`${backendURL}/api/auth/update`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      })
      const data = await res.json()
      console.log(data.message);

      if (data.success) {
        localStorage.clear("user")
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem("token", data.token)
        alert("updated!")
        return
      }


    } catch (err) {
      console.error("error while updating user profile", err);

    }



  }
  const handleOrders = async () => {
    navigate("/orders")
  }
  const { setQuery } = useContext(SearchContext)

  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // 2. Check if scrollY is 0 inside this event listener
      console.log(window.screenY);
      
      if (window.scrollY === 0) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }
    };

    // 3. Listen for the scroll event
    window.addEventListener('scroll', handleScroll);

    // 4. Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <FadeInSection>

        <header className={`${isTop? "bg-primary !text-white transition-all ease-in-out duration-500":"bg-white/95 fixed z-50 transition-all ease-in-out duration-500"}  max-w-full w-full min-w-0 justify-center shadow-2xl  font-bold text-[#111111]  py-2`}>
          <div className='pr-4 flex justify-between max-xl:flex-col items-center gap-[10%]'>

            {/* Logo */}
            <div className="w-[390px]  justify-center overflow-hidden flex  items-center  h-25 mt-0 ">
              <Link className='' to={"/"}>
             <h2 className='text-5xl' >GoOds</h2>
              </Link>
            </div>
            <div className='w-full px-4 '>
              <ul className='flex py-4  items-center max-2xl:text-sm max-md:hidden justify-center gap-[10%]'>
                <li><NavLink to={"/"} className={({isActive})=> isActive? "active-link":""}>Home</NavLink></li>
                <li><NavLink to={"/about"} className={({isActive})=> isActive? "active-link":""}>About</NavLink></li>
                <li><NavLink to={"/category"} className={({isActive})=> isActive? "active-link":""}>Category</NavLink></li>
                <li className='flex items-center'><NavLink to={"/orders"} className={({isActive})=> isActive? "active-link":""}>Orders <span className='rounded-full  px-1.5 bg-red-500 text-white text-xs'>1</span></NavLink></li>
                <li className='flex items-center gap-1 '>Contact:<FaFacebook className='cursor-pointer' />
                  <FaInstagram className='cursor-pointer' />
                  <FaWhatsapp className='cursor-pointer' /></li>
           
                
              </ul>
            </div>

            {/* Search + Cart + User */}
            
            <div className='flex justify-end ml-auto items-center gap-4 max-xl:justify-center max-xl:items-center max-xl:ml-0 max-sm:flex-col-reverse'>

              {/* Search */}
              <input
                className='!border-b-[1px] px-2 py-1  !font-light mx-auto text-2xl h-full outline-none border-secondary placeholder-gray-400'
                type="search"
                name="search"
                id="search"
                placeholder='search'
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
              />

              {/* Cart + User */}
              <div className='flex ml-auto max-lg:mx-auto items-center space-x-9'>

                {/* Cart Icon */}
                <div className='text-3xl flex space-x-4 max-lg:justify-center max-lg:items-center '>
                  <Link to={"/cart"}>
                    <IoCartOutline className={` ${isTop? "text-white": ""}cursor-pointer  hover:text-secondary transition-colors duration-150`} />
                  </Link>
                </div>

                {/* User Control */}
                <div  onClick={() => setDisplayUserControl(true)} className='relative'>
                  <div className='border-2 h-12 w-12 rounded-full flex justify-center items-center overflow-hidden border-neutral'>
                    <img className='cursor-pointer' src={!user || !user.avatar.length > 0 ? "/images/avatar.jpg" :`${backendURL}/${user.avatar[0].path}`} alt="" />
                  </div>

                  {displayUserControl && (
                    <div className='absolute -right-0 text-black top-15 bg-neutral z-[9999] shadow-2xl rounded-b-md px-2 w-60 flex flex-col space-y-2 py-2 text-center  max-sm:w-auto max-sm:-right-2 max-xl:-right-0'>
                      <div className='flex justify-center'>
                        <p className='font-medium w-72 text-primary'>{user ? user.name : "User"}</p>
                        <div className='flex justify-center items-center'>
                          <button className='text-lg cursor-pointer text-accent' onClick={(e) => (e.stopPropagation(), setDisplayUserControl(false))}>x</button>
                        </div>
                      </div>

                      <p className='text-sm font-normal text-primary'>{user ? user.email : "User@gmail.com"}</p>

                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />

                      {/* Buttons */}
                      <button onClick={handleOrders} className='py-1 border font-normal cursor-pointer side-bar-hover text-primary hover:text-accent'>Orders</button>
                      <button onClick={handleButtonClick} className='py-1 border font-normal cursor-pointer side-bar-hover text-primary hover:text-accent'>Change Profile Pic</button>
                      <button onClick={handleButtonClick} className='py-1 border font-normal cursor-pointer side-bar-hover text-primary hover:text-accent'>Profile Setting</button>
                      <button
                        className='py-1 font-normal cursor-pointer side-bar-hover border '
                        onClick={() =>
                          localStorage.getItem("token")
                            ? (localStorage.clear("token"), navigate("/"))
                            : (navigate("/login"), setDisplayUserControl(false))
                        }
                      >
                        {localStorage.getItem("token") ? "Logout" : "Login"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>





      </FadeInSection>
    </>
  )
}

export default Navbar
