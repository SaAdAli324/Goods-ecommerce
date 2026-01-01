import React, { useEffect, useState } from 'react'

// icons 

import { FaFilter } from "react-icons/fa";

import { MdDelete } from "react-icons/md";

import { Swiper, SwiperSlide } from 'swiper/react';

// swiper 

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

// components

import ConfirmModal from '../popUps/confirmModel';

// context hook

import { useProduct } from '../Context/ProductContext';

// navigation for the product preview

import { useNavigate } from 'react-router-dom';
import ImageSlider from '../ImageSlider/ImageSlider';

// main component to display products
const DisplayProducts = () => {
    // URL if the backend server

    const backendURL = import.meta.env.VITE_BACKEND_URL

    // swiper state and other states

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState("")
    const [confirmationProduct, setConfirmationProduct] = useState("")
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState([])

    // context state

    const { setSelectedProduct } = useProduct()

    // navigation hook
    const navigate = useNavigate()

    // function to handle product deletion
    const handleDelete = async () => {
        try {
            const _id = confirmationProduct._id
            console.log(_id);

            const del = await fetch(`${backendURL}/api/product/delete/${_id}`, {
                method: "DELETE"
            })
            const res = del.json()

            if (res.ok) {
                return setDeleteConfirm(true)
            }
            setShowModal(false)

        } catch (err) {
            console.error('error while deleting product', err);

        }

    };
    // useEffect to fetch products based on category filter and modal state

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await fetch(`${backendURL}/api/product/display${categoryFilter ? `?category=${categoryFilter}` : ""}`)
                const data = await res.json()

                setProducts(data.product)
                console.log(data.product)

            } catch (err) {
                console.error("error while getting products", err);

            }
        }
        setThumbsSwiper(null)
        getProducts()
    }, [categoryFilter, showModal])


    // confirmation function before deleting a product

    const confirmation = (m) => {
        console.log(m)
        setShowModal(true)
        setConfirmationProduct(m)

    }

    const handleProductClick = (product) => {
        console.log(product);
        setSelectedProduct(product)
        navigate('/productsPreview')
    }

    return (
        <div className='ml-32 mr-16 max-md:m-2'>
            <div className=' space-y-4 py-4  '>


                <div className='h-28 font-medium flex max-md:flex-col max-md:items-start items-center justify-between gap-1.5 text-lg  '>
                    <div className=''>
                        <h1 className='text-3xl w-full  font-semibold  text-primary ' >ALL-PRODUCT'S</h1>
                        <p className='text-sm text-slate-500'>view all uploaded product's here</p>
                    </div>
                    <div className='flex items-center gap-1.5'>
                        <label htmlFor="Filter">Filter</label>
                        <FaFilter className='text-sm' />
                        <select onChange={(e) => setCategoryFilter(e.target.value)} name="Filter" id="Filter"><option value="">none</option>
                            <option value="women">women</option>
                            <option value="men">men</option>
                            <option value="kids">kids</option>


                        </select>
                    </div>
                </div>
                <div className='grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-2 max-xl:grid-cols-3 max-2xl:grid-cols-4 gap-8 h-fit py-4'>

                    {products && (products.map(m => {

                        return (
                            <div key={m._id} id='card' onClick={() => handleProductClick(m)} className='shadow-2xl bg-neutral flex flex-col cursor-pointer '>
                                <div className='h-fit space-y-2' >
                                    <ImageSlider customize={'!object-cover !object-top'} images={m.productImage} backendURL={backendURL} />
                                </div>

                                <div className='px-4 flex flex-col pt-4 space-y-2'>
                                    <h2 className='font-medium text-primary uppercase'>{m.productName.length > 20 ? m.productName.slice(0, 20) + "..." : m.productName}</h2>
                                    <p className='font-medium text-sm text-gray-500 max'>{m.productDescription.length > 50 ? m.productDescription.slice(0, 50) + "..." : m.productDescription}</p>
                                    <p className='text-accent font-bold'>RS.{m.price}</p>
                                    <MdDelete onClick={(e) => confirmation(m)} className='hover:scale-125 transition-all duration-100 ease-in-out text-lg text-red-500 ' />

                                </div>


                            </div>)

                    }))}
                    {showModal && (
                        !deleteConfirm && (
                            <ConfirmModal
                                title="Delete Product"
                                message={`Are you sure you want to delete "${confirmationProduct.productName}"?`}
                                confirmText="Delete"
                                confirmColor="bg-red-600"
                                onConfirm={handleDelete}
                                onClose={() => setShowModal(false)}
                            />
                        )
                    )}

                </div>



            </div>
        </div>

    )
}

export default DisplayProducts
