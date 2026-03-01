import React from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import Navbar from './Navbar'
import { useLoader } from './context/LoaderContext'
import LoadingOverlay from './loading/LoadingOverlay'
import Footer from './footer/Footer'
const Layout = () => {
    const navigation = useNavigation();
    const { loading } = useLoader();

    return (


        <div className=''>
            <Navbar />
            {loading && <LoadingOverlay />}
            <Outlet />
            <Footer/>
        </div>
    )
}

export default Layout
