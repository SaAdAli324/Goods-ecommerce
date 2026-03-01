import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../Auth/Login';
import { useLoader } from '../context/LoaderContext';
const CheckOutComponent = () => {
    const { setLoading } = useLoader()
    const [searchParams] = useSearchParams();
    const productId = searchParams.get("productId");
    const [userDetails, setUserDetails] = useState()
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : null
    const [checkoutProduct, setCheckoutProduct] = useState([])
    const navigate= useNavigate()
    useEffect(() => {


        const fetchCheckoutDetails = async () => {
            try {
                setLoading(true)
                const res = await fetch(`${backendURL}/api/checkout/product/${productId}`)
                const data = await res.json();
                setCheckoutProduct(data.checkOut.product);
                setUserDetails(data.checkOut.user)
                console.log(data.checkOut, "this is the data");

                setTimeout(() => setLoading(false), 1000)
            }
            catch (err) {
                return <p>{err} , somethin wrong</p>


            }

        };
        fetchCheckoutDetails();
    }, [productId]);
    
    const cancelCheckOut = async ()=>{
        alert("are you sure ?")
        navigate("/cart")
        
    }
    const checkOut = async (m) => {
        try {


            const response = await fetch(`${backendURL}/api/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    quantity: checkoutProduct.quantity,
                    productId: checkoutProduct.productId._id,
                    amount: checkoutProduct.productId.price
                })
            })
            const res = await response.json()
            if (res.success) {
                return alert("order placed")
            }
            alert(res.message)
        } catch (error) {
            console.log("error while checking out", error)
            return <p>something went wrong , login or wait</p>

        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: userDetails
    });

    if (!userDetails || !productId || !checkoutProduct) {
        return <div className='h-[48.4vh] flex items-center justify-center'>No Item Selected TO Check Out Try Again</div>
    }
    console.log(checkoutProduct, "this is the checkout products");

    return (
        <div className='h-auto py-16 w-full bg-neutral flex items-center justify-center'>
            <div className='container mx-auto flex-col max-md:flex-col justify-between  gap-4'>
                <div className=' flex w-full justify-around gap-4'>
                    <div className='h-fit w-full p-1 bg-white'>


                        <div className='w-full min-w-0 max-md:flex-col flex gap-5 uppercase'>
                            <div className='w-60 min-w-0 max-md:w-full'>
                                <img className='w-full h-fit max-sm:!text-sm min-w-0 object-cover object-center' src={`${backendURL}/${checkoutProduct ? checkoutProduct.productId.productImage[0].path.replace(/\\/g, "/") : ""}`} alt="" />
                            </div>

                            <div className=' w-full min-w-0 py-2 space-y-1'>
                                <p h2 className='text-slate-500  ' > <span className='font-medium text-accent'>product: </span> {checkoutProduct.productId.productName}</p>
                                <p className='text-slate-500  '> <span className='font-medium text-accent'>Description: </span> {checkoutProduct.productId.productDescription}</p>
                                <p className='text-slate-500  '> <span className='font-medium text-accent'>quantity:</span> {checkoutProduct.quantity}</p>
                                <p className='text-slate-500 '> <span className='font-medium text-accent'>total price:</span> {checkoutProduct.productId.price*checkoutProduct.quantity}</p>

                            </div>

                        </div>
                        <div className='px-6 py-2'>
                            <ul className='text-xs list-disc space-y-2 text-slate-500'>
                                <li> 100% Original Quality Guaranteed</li>
                                <li> 7-Day Easy Exchange Policy</li>
                                <li> Cash on Delivery Available</li>
                                <li className=''>Exchange Policy: We offer a 7-day checking warranty. If you receive a damaged or incorrect item, please contact us within 24 hours for an instant exchange. Note: Change of mind returns are not accepted for opened packages.</li>
                                <li> Shop with Confidence: Enjoy hassle-free returns within 30 days. If you're not 100% satisfied with the fit or quality, simply return it for a full refund or exchange. Free shipping on all orders over Rs. 5000.</li>
                            </ul>
                        </div>
                    </div>


                </div>
                <form onClick={(e) => e.preventDefault()} className='flex flex-col bg-white min-w-0 w-full max-sm:mx-auto items-start space-y-4 !text-sm p-6 max-md:p-2  rounded-md ' action="">
                    <label htmlFor="name" className='text-primary font-medium'>Name</label>
                    <input
                        className='w-full p-2 border-b-2 border-primary  text-primary bg-secondary'
                        defaultValue={userDetails.name}
                        {...register('name', {
                            required: true,
                            minLength: { value: 3, message: "Name must be at least 3 characters long" }
                        })}
                    />
                    {errors.name && <p className='text-accent'>{errors.name.message}</p>}

                    <label htmlFor="email" className='text-primary font-medium'>Email</label>
                    <input
                        defaultValue={userDetails.email}
                    className='w-full p-2 border-b-2 border-primary  text-primary bg-secondary'
                        {...register('email', {
                            required: true,
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Please enter a valid email address"
                            }
                        })}
                    />
                    {errors.email && <p className='text-accent'>{errors.email.message}</p>}

                    <label htmlFor="phoneNumber" className='text-primary font-medium'>Phone number</label>
                    <input
                        defaultValue={userDetails.phoneNumber}
                        type='tel'
                        className='w-full p-2 border-b-2 border-primary  text-primary bg-secondary'
                        {...register('phoneNumber', { required: true })}
                    />
                    {errors.phoneNumber && <p className='text-accent'>Please enter a valid phone number.</p>}

                    <label htmlFor="address" className='text-primary font-medium'>Address</label>
                    <input
                        defaultValue={userDetails.address}
                        className='w-full p-2 border-b-2 border-primary  text-primary bg-secondary'
                        {...register('address', {
                            required: true,
                            minLength: { value: 10, message: "Address must be at least 10 characters long" }
                        })}
                    />
                    {errors.address && <p className='text-accent'>{errors.address.message}</p>}

                    <div className='flex w-full  justify-center  max-sm:mx-auto space-x-2 mt-4'>
                        <button
                            onClick={() => checkOut()}
                            className='flex items-center min-w-0 justify-center border-0 w-fit px-8 py-2 bg-accent text-secondary text-[16px] max-sm:text-[14px] cursor-pointer hover:bg-primary hover:text-accent transition-all duration-75 ease-in-out'
                        >
                            Place order
                        </button>
                        <button
                        onClick={()=> cancelCheckOut()}
                            className='flex items-center min-w-0 justify-center border-0 w-fit px-8 py-2 bg-accent text-secondary text-[16px] max-sm:text-[14px] cursor-pointer hover:bg-primary hover:text-accent transition-all duration-75 ease-in-out'
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div >

    )
}

export default CheckOutComponent
