import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const res = await fetch(`${backendURL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            setErrorMessage(result.message);

            if (result.success) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('user', JSON.stringify(result.user));
                localStorage.setItem("cartItem", JSON.stringify(result.cart));

                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (err) {
            console.error('Error signing up:', err);
            setErrorMessage('Error signing up. Please try again later.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="
                    bg-secondary 
                    text-primary 
                    w-[400px]
                    py-6 px-8 
                    rounded-2xl 
                    shadow-xl 
                    border border-neutral 
                    space-y-3
                "
            >
                <h2 className="text-2xl font-light text-center">Log in</h2>

                <label htmlFor="email" className="text-sm text-primary">Email</label>
                <input
                    className="w-full p-2 rounded border border-neutral bg-neutral text-primary outline-none"
                    {...register('email', {
                        required: true,
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address",
                        },
                    })}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm">Please enter your email.</p>
                )}

                <label htmlFor="password" className="text-sm text-primary">Password</label>
                <input
                    type="password"
                    className="w-full p-2 rounded border border-neutral bg-neutral text-primary outline-none"
                    {...register('password', { required: true })}
                />
                {errors.password && (
                    <p className="text-red-500 text-sm">Password is required.</p>
                )}

                <input
                    type="submit"
                    value="Login"
                    className="
                        bg-accent text-secondary 
                        cursor-pointer 
                        mt-2 mx-auto 
                        block 
                        px-6 py-2 
                        rounded-lg 
                        font-medium
                        hover:opacity-90
                        transition
                    "
                />

                {errorMessage && (
                    <p
                        className={`
                            text-center text-sm 
                            ${errorMessage === "login successfull"
                                ? "text-green-500"
                                : "text-red-500"}
                        `}
                    >
                        {errorMessage}
                    </p>
                )}

                <span className="text-center block text-sm">
                    Don’t have an account?{" "}
                    <a
                        className="text-accent cursor-pointer hover:underline"
                        onClick={() => navigate("/signup")}
                    >
                        Sign up
                    </a>
                </span>
            </form>

        </div>
    );
};

export default Login;
