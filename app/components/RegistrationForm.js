'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function RegistrationForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [dob, setDob] = useState(new Date());
  const [popupVisible, setPopupVisible] = useState(false);

  const createSparkles = (e) => {
    const button = e.currentTarget;
    const sparkleCount = 50;  
    const buttonRect = button.getBoundingClientRect();

    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';

      sparkle.style.left = `${Math.random() * buttonRect.width}px`;
      sparkle.style.top = `${Math.random() * buttonRect.height}px`;

      
      button.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 800);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    setPopupVisible(true);

    
    setTimeout(() => {
      setPopupVisible(false);
    }, 3000);
  };

  return (
    <div className="flex min-h-screen bg-black font-mono tracking-wider">
      <div className="w-1/2 flex justify-center items-center">
        <motion.div
          className="w-full max-w-lg bg-black p-8 rounded-2xl shadow-2xl border border-bg-black-500"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-6 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-center uppercase tracking-widest">User Registration</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <input
              {...register('fullName', { required: true })}
              placeholder="Full Name"
              className="w-full rounded-lg border border-blue-500 bg-black p-3 text-blue-400 placeholder-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            />
            {errors.fullName && <span className="text-red-400 text-sm">This field is required</span>}

            <input
              {...register('address', { required: true })}
              placeholder="Address"
              className="w-full rounded-lg border border-blue-500 bg-black p-3 text-blue-400 placeholder-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            />
            {errors.address && <span className="text-red-400 text-sm">This field is required</span>}

            <input
              {...register('mobile', { required: true, pattern: /^[0-9]{10}$/ })}
              placeholder="Mobile No."
              className="w-full rounded-lg border border-blue-500 bg-black p-3 text-blue-400 placeholder-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            />
            {errors.mobile && <span className="text-red-400 text-sm">Please enter a valid 10-digit mobile number</span>}

            <input
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              placeholder="Email ID"
              className="w-full rounded-lg border border-blue-500 bg-black p-3 text-blue-400 placeholder-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            />
            {errors.email && <span className="text-red-400 text-sm">Please enter a valid email address</span>}

            <div className="flex space-x-4 mb-4">
              <label className="flex items-center text-blue-400">
                <input
                  {...register('gender', { required: true })}
                  type="radio"
                  value="male"
                  className="mr-2 text-blue-500 focus:ring-blue-500"
                />
                Male
              </label>
              <label className="flex items-center text-blue-400">
                <input
                  {...register('gender', { required: true })}
                  type="radio"
                  value="female"
                  className="mr-2 text-blue-500 focus:ring-blue-500"
                />
                Female
              </label>
              <label className="flex items-center text-blue-400">
                <input
                  {...register('gender', { required: true })}
                  type="radio"
                  value="other"
                  className="mr-2 text-blue-500 focus:ring-blue-500"
                />
                Other
              </label>
            </div>
            {errors.gender && <span className="text-red-400 text-sm">Please select a gender</span>}

            <DatePicker
              selected={dob}
              onChange={(date) => setDob(date)}
              className="w-full rounded-lg border border-blue-500 bg-black p-3 text-blue-400 placeholder-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              placeholderText="Date of Birth"
            />

            <motion.button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-3 text-white font-semibold transition-all duration-300 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black sparkle-button relative overflow-hidden uppercase tracking-widest"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={createSparkles}
            >
              Register
            </motion.button>
          </form>
        </motion.div>
      </div>

      <div className="w-1/2 flex justify-center items-center">
        <Spline scene="https://prod.spline.design/hfAK0kpaqyP9nbkQ/scene.splinecode" />
      </div>

      {popupVisible && (
        <div id="popup" className="fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg transition-opacity duration-300 opacity-100 font-mono tracking-wider uppercase">
          Successfully Registered!
        </div>
      )}
    </div>
  );
}