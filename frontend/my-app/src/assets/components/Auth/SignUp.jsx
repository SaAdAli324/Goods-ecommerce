import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${backendURL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setErrorMessage(result.message);

      if (result.success) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('cartItem', JSON.stringify(result.cart));

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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-secondary text-primary border border-neutral shadow-xl w-1/4 flex flex-col p-6 rounded-xl space-y-3"
      >
        <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

        <label>Name</label>
        <input
          {...register('name', { required: 'Name is required' })}
          className="border border-neutral bg-neutral p-2 rounded focus:outline-accent"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <label>Email</label>
        <input
          {...register('email', { required: 'Email is required' })}
          className="border border-neutral bg-neutral p-2 rounded focus:outline-accent"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <label>Phone Number</label>
        <input
          {...register('phoneNumber', { required: 'Phone number required' })}
          className="border border-neutral bg-neutral p-2 rounded focus:outline-accent"
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
        )}

        <label>Address</label>
        <input
          {...register('address', { required: 'Address required' })}
          className="border border-neutral bg-neutral p-2 rounded focus:outline-accent"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}

        <label>Password</label>
        <input
          type="password"
          {...register('password', { required: 'Password required' })}
          className="border border-neutral bg-neutral p-2 rounded focus:outline-accent"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <label>Confirm Password</label>
        <input
          type="password"
          {...register('confirmPassword', {
            required: 'Confirm password',
            validate: (value) =>
              value === watch('password') || "Passwords don't match",
          })}
          className="border border-neutral bg-neutral p-2 rounded focus:outline-accent"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
        )}

        <input
          type="submit"
          value="Sign Up"
          className="cursor-pointer mt-2 text-secondary bg-accent px-4 py-2 
                    rounded font-medium mx-auto block hover:opacity-90"
        />

        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}

        <span className="mx-auto block text-sm">
          Already have an account?{' '}
          <a className="text-accent cursor-pointer" onClick={() => navigate('/login')}>
            Log in
          </a>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
