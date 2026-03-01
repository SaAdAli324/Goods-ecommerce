import React, { useEffect, useState } from 'react'
// icons

import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

// confirmation model
import ConfirmModal from '../popUps/confirmModel';

// context hook
import { useProduct } from '../Context/ProductContext';

import { useNavigate } from 'react-router-dom';
// main component to preview a single product

// use form 
import { useForm } from 'react-hook-form'
import ImageSlider from '../ImageSlider/ImageSlider';
const ProductPreview = ({ product }) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [confirmationProduct, setConfirmationProduct] = useState("")
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false)
    const [cancelEdit, setCancelEdit] = useState(false)
    const [updateProduct, setUpdateProduct] = useState(false)
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    // using context to get the selected product

    const { selectedProduct } = useProduct()
    localStorage.setItem("productForPreview", selectedProduct)

    // delete product function
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


        } catch (err) {
            console.error('error while deleting product', err);

        }

    };
    // function to handle confirmation modal
    const confirmation = (m) => {
        if (isEditing) {
            setConfirmationProduct(m)
        } else {
            setConfirmationProduct(m)
        }
        setShowModal(true);

    }

    const [formMessage, setFormMessage] = useState("")
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const handleUpdate = async (data) => {

        const formData = new FormData()
        console.log("this is the data", data.productName, data.productDescription, data.stock, data.category);

        formData.append("productName", data.productName)
        formData.append("productDescription", data.productDescription)
        formData.append("price", data.price)
        formData.append("category", data.category)
        formData.append("stock", data.stock)
        console.log("this is form data", formData);

        if (data.productImages && data.productImages.length > 0) {
            for (let i = 0; i < data.productImages.length; i++) {
                formData.append("productImage", data.productImages[i])
            }
        }
        try {
            const res = await fetch(`${backendURL}/api/product/update/${selectedProduct._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: formData
                }
            )
            const serverRes = await res.json()
            setFormMessage(serverRes)
            document.getElementById('update-button').disabled = true
            setTimeout(() => {
                setFormMessage(null)
                setIsEditing(false)
                navigate('/Products')
            }, 5000);
            console.log(serverRes);

            reset()

        }
        catch (err) {
            console.error("error while uploading product", err);


        }
    }


    let message = "";

    if (deleteConfirm) {
        message = `Are you sure you want to delete "${confirmationProduct.productName}"?`;
    } else if (cancelEdit) {
        message = `Are you sure you want to cancel editing "${selectedProduct.productName}"? Unsaved changes will be lost.`;
    } else if (updateProduct) {
        message = `Are you sure you want to update "${selectedProduct.productName}"?`;
    }

    return (
        <div className='pl-32 max-md:flex max-md:pl-0 max-md:justify-center max-md:items-center space-y-4  '>

            <div className=' container mx-auto pt-20  grid grid-cols-2 max-md:grid-cols-1  '>

                <div className='shadow-2xl max-w-full  !bg-transparent  flex flex-col justify-center h-fit cursor-pointer py-2 '>
                    <div className='space-y-2 min-h-0 mx-auto max-h-fit max-w-full ' >
                        <ImageSlider  images={selectedProduct.productImage} backendURL={backendURL} customize={"h-96 object-cover object-top"} />

                    </div>

                </div>

                <div className=' flex text-2xl  flex-col pt-4 space-y-8'>

                    {!isEditing ? (<div className='px-4 flex text-wrap text-2xl flex-col pt-4 space-y-8'>

                        <p className='font-medium  text-3xl text-amber-900 max'>Category: {selectedProduct.category}</p>
                        <h2 className='font-medium max-md:text-xl  uppercase'>{selectedProduct.productName}</h2>
                        <p className='font-medium  text-lg text-gray-500 max'>'{selectedProduct.productDescription}'</p>
                        <p className='text-amber-300 font-bold'>RS.{selectedProduct.price}</p>
                        <p className=' font-bold text-amber-900'>Product in stock: {selectedProduct.stock}</p>
                        <p className='text-gray-500 text-lg font-bold'>Product was created at: {selectedProduct.createdAt}</p>
                        <p className='text-gray-500 text-lg font-bold'>Product was last updated at: {selectedProduct.updatedAt}</p>

                        <div className='flex space-x-8 text-blue-500'>
                            <MdDelete onClick={() => confirmation(selectedProduct)} className='hover:scale-125 transition-all duration-100 ease-in-out text-2xl text-red-500 ' />
                            <FaRegEdit onClick={() => setIsEditing(true)} className='cursor-pointer' />
                        </div>
                    </div>)
                        :

                        (<div className='flex flex-col max-w-full  '>

                            <form disabke action="submit" onSubmit={handleSubmit((data) => confirmation(data))} className='py-8 px-4 space-y-1 shadow-xl rounded-2xl min-w-0 max-w-full max-sm:w-full flex flex-col'>
                                <h2 className='font-medium text-3xl text-center text-primary'>Update Product</h2>

                                <span className='text-red-500 cursor-pointer ml-auto text-3xl' onClick={() => setIsEditing(false)}>x</span>
                                <label htmlFor='productName' className='font-medium text-slate-500 text-sm'>Product Name</label>
                                <input id='productName' defaultValue={selectedProduct.productName} {...register("productName", { required: "product name is required" })} type="text" className='border-b   text-lg w-full outline-none ' />
                                {errors.productName && (
                                    <p className='text-red-500'>{errors.productName.message}</p>
                                )}

                                <label htmlFor='productDescription' className='font-medium mt-6 text-slate-500 text-sm'>Product Description</label>
                                <input id='productDescription' defaultValue={selectedProduct.productDescription} {...register("productDescription", { required: "product description is required" })} type="text" className='border-b  text-lg  w-full outline-none ' />
                                {errors.productDescription && (
                                    <p className='text-red-500'>{errors.productDescription.message}</p>
                                )}

                                <label htmlFor='price' className=' mt-6 font-medium text-slate-500 text-sm'>Price</label>
                                <input id='price' defaultValue={selectedProduct.price} {...register("price", { required: "price is required" })} type="number" className='border-b text-lg  w-full outline-none ' />
                                {errors.price && (
                                    <p className='text-red-500'>{errors.price.message}</p>
                                )}

                                <label htmlFor='category' className='mt-6 font-medium text-slate-500 text-sm'>Category</label>
                                <select id="category" defaultValue={selectedProduct.category} {...register("category", { required: "category is required" })} className='mt-8 text-slate-500 text-sm bg-amber-100 py-4'>
                                    <option value="women">Women</option>
                                    <option value="men">Men</option>
                                    <option value="kids">Kids</option>

                                </select>
                                {errors.category && (
                                    <p className='text-red-500'>{errors.category.message}</p>
                                )}

                                <label htmlFor='stock' className='mt-8 font-medium text-slate-500 text-sm'>Stock</label>
                                <input id='stock' defaultValue={selectedProduct.stock} {...register("stock", { required: "stock is required" })} type="number" className='border-b text-lg  w-full outline-none ' />
                                {errors.stock && (
                                    <p className='text-red-500'>{errors.stock.message}</p>
                                )}

                                <label htmlFor='productImages' className='mt-6 font-medium text-slate-500 text-sm'>Product Images</label>
                                <input id='productImages' defaultValue={selectedProduct.productImages} {...register("productImages")} type="file" multiple className='py-4 border-b text-lg  w-full outline-none ' />
                                {errors.productImages && (
                                    <p className='text-red-500'>{errors.productImages.message}</p>
                                )}
                                <div className='flex'>
                                    <button onClick={() => confirmation(selectedProduct)} id='update-button' className='mt-8 border-2 w-70 py-2 mx-auto text-slate-500 text-sm font-medium side-bar-hover cursor-pointer'>update</button>
                                </div>
                                {formMessage && (<p className={ text-slate-500`text-sm text-center font-medium transition-all duration-150 ease-in-out ${formMessage.success ? "text-green-500" : "text-red-500"}`}>{formMessage.message}!</p>)}
                            </form>


                        </div>
                        )}


                </div>

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
                {showModal && (
                    !updateProduct && (
                        <ConfirmModal
                            title="Update Product"
                            message={`Are you sure you want to update "${confirmationProduct.productName}"?`}
                            confirmText="Update"
                            confirmColor="bg-blue-600"
                            onConfirm={() => {
                                handleUpdate(confirmationProduct)
                                setShowModal(false)
                            }}
                            onClose={() => setShowModal(false)}
                        />
                    )
                )}


            </div>



        </div>

    )
}

export default ProductPreview
