import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from '../sidebar/Sidebar'
import Navbar from '../navbar/Navbar'
import DisplayProducts from '../main/DisplayProducts'
const Layout = () => {
  return (
    <>
    
    
    <Navbar/>
    <Outlet/>
   

    </>
  )
}

export default Layout
