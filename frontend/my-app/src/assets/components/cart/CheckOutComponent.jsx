import React from 'react'
import { useForm } from "react-hook-form";

const CheckOutComponent = ({ userDetails, onCheckout, onCancel }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: userDetails
    });

    return (
        <div>
            <form onClick={(e) => e.preventDefault()} className='flex flex-col w-[100%] max-sm:mx-auto items-start space-y-4 bg-neutral p-6 max-md:p-2  rounded-md shadow-md' action="">
                <label htmlFor="name" className='text-primary font-medium'>Name</label>
                <input
                    className='w-full p-2 border-2 border-primary rounded-md text-primary bg-secondary'
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
                    className='w-full p-2 border-2 border-primary rounded-md text-primary bg-secondary'
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
                    className='w-full p-2 border-2 border-primary rounded-md text-primary bg-secondary'
                    {...register('phoneNumber', { required: true })}
                />
                {errors.phoneNumber && <p className='text-accent'>Please enter a valid phone number.</p>}

                <label htmlFor="address" className='text-primary font-medium'>Address</label>
                <input
                    defaultValue={userDetails.address}
                    className='w-full p-2 border-2 border-primary rounded-md text-primary bg-secondary'
                    {...register('address', {
                        required: true,
                        minLength: { value: 10, message: "Address must be at least 10 characters long" }
                    })}
                />
                {errors.address && <p className='text-accent'>{errors.address.message}</p>}

                <div className='flex w-full  justify-center  max-sm:mx-auto space-x-2 mt-4'>
                    <button
                        onClick={onCheckout}
                        className='flex items-center justify-center border-0 w-fit px-16 py-4 bg-accent text-secondary text-[16px] max-sm:text-[14px] cursor-pointer hover:bg-primary hover:text-accent transition-all duration-75 ease-in-out'
                    >
                        Place order
                    </button>
                    <button
                        onClick={onCancel}
                        className='flex items-center justify-center border-0 w-fit px-16 py-4 bg-accent text-secondary text-[16px] max-sm:text-[14px] cursor-pointer hover:bg-primary hover:text-accent transition-all duration-75 ease-in-out'
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CheckOutComponent
