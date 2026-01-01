import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa'
const AddProducts = () => {
    const [formMessage, setFormMessage] = useState("")
    const [previewImages, setPreviewImages] = useState([])
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const fileUploader = useRef(null)
    const handleFileUploader = (e) => {
        e.preventDefault()
        fileUploader.current.click()
    }
    const handlePreviewImg = (files) => {
        if (!files) return;
        const newPreviews = []
        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            const objectUrl = URL.createObjectURL(file)
            newPreviews.push(objectUrl)


        }
        setPreviewImages(newPreviews)

    }
    useEffect(() => {
        return () => (
            previewImages.forEach((url) => URL.revokeObjectURL(url))
        )
    }, [previewImages])
    const onSubmit = async (data) => {

        const formData = new FormData()
        formData.append("productName", data.productName)
        formData.append("productDescription", data.productDescription)
        formData.append("price", data.price)
        formData.append("category", data.category)
        formData.append("stock", data.stock)
        for (let i = 0; i < data.productImages.length; i++) {
            formData.append("productImage", data.productImages[i])
        }
        try {
            const res = await fetch(`${backendURL}/api/product/upload`,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            const serverRes = await res.json()
            setFormMessage(serverRes)
            setTimeout(() => {
                setFormMessage(null)
            }, 5000);
            console.log(serverRes);
            reset()
            setPreviewImages([])
        }
        catch (err) {
            console.error("error while uploading product", err);


        }
    }
    const { ref: rhfRef, onChange: rhfOnChange, ...productImageProps } = register("productImages", {
        required: "product images are required"
    });
    return (
        <div className=' items-center gap-2 py-8  w-full  '>
            <div className=' flex max-lg:flex-col items-center py-16 justify-center gap-8'>
                <div className='shadow w-sm max-sm:w-full  h-96 flex items-center justify-center overflow-hidden gap-1 bg-slate-100 ' onClick={(e) => handleFileUploader(e)} onDrop={(e) => console.log(e.dataTransfer.value)}>
                    {
                        previewImages.length === 0 ? (<p className='flex items-center gap-1'><FaPlus />Click here to upload files </p>) :
                            (<div className='max-w-3xs min-w-0 h-fit grid grid-cols-3'>
                                {previewImages.map((src, index) => {
                                    return (
                                        <img key={index} src={src} className='  h-32 w-32 object-cover border rounded shadow-sm' alt="" srcset="" />
                                    )
                                })}
                            </div>)
                    }
                </div>
                <form action="submit" onSubmit={handleSubmit(onSubmit)} className=' py-8 px-4 space-y-1 shadow rounded-2xl w-xl max-sm:w-full flex flex-col '>
                    <label htmlFor='productName' className='font-medium text-slate-500 text-sm'>Product Name</label>
                    <input id='productName' {...register("productName", { required: "product name is required" })} type="text" className='border-b-1 w-full outline-none ' />
                    {errors.productName && (
                        <p className='text-red-500'>{errors.productName.message}</p>
                    )}

                    <label htmlFor='productDescription' className='font-medium mt-8 text-slate-500 text-sm'>Product Description</label>
                    <input id='productDescription' {...register("productDescription", { required: "product description is required" })} type="text" className='border-b-1 w-full outline-none ' />
                    {errors.productDescription && (
                        <p className='text-red-500'>{errors.productDescription.message}</p>
                    )}

                    <label htmlFor='price' className=' mt-8 font-medium text-slate-500 text-sm'>Price</label>
                    <input id='price' {...register("price", { required: "price is required" })} type="number" className='border-b-1 w-full outline-none ' />
                    {errors.price && (
                        <p className='text-red-500'>{errors.price.message}</p>
                    )}

                    <label htmlFor='category' className='mt-8 font-medium text-slate-500 text-sm'>Category</label>
                    <select id="category" {...register("category", { required: "category is required" })} className='mt-8 text-lg bg-amber-100 py-4'>
                        <option value="women">Women</option>
                        <option value="men">Men</option>
                        <option value="kids">Kids</option>

                    </select>
                    {errors.category && (
                        <p className='text-red-500'>{errors.category.message}</p>
                    )}

                    <label htmlFor='stock' className='mt-8 font-medium text-slate-500 text-sm'>Stock</label>
                    <input id='stock' {...register("stock", { required: "stock is required" })} type="number" className='border-b-1 w-full outline-none ' />
                    {errors.stock && (
                        <p className='text-red-500'>{errors.stock.message}</p>
                    )}


                    <input
                        id='productImages'
                        type="file"
                        multiple
                        className='hidden'

                        onChange={(e) => {
                            rhfOnChange(e)
                            handlePreviewImg(e.target.files)
                        }}
                        {...productImageProps}


                        ref={(e) => {
                            rhfRef(e);
                            fileUploader.current = e
                        }}
                    />
                    {errors.productImages && (
                        <p className='text-red-500'>{errors.productImages.message}</p>
                    )}

                    <button className='mt-8 border-2 w-70 py-2 mx-auto text-lg font-medium side-bar-hover'>Add</button>
                    {formMessage && (<p className={`text-lg font-medium transition-all duration-150 ease-in-out ${formMessage.success ? "text-green-500" : "text-red-500"}`}>{formMessage.message}!</p>)}
                </form>
            </div>
        </div>
    )
}

export default AddProducts
