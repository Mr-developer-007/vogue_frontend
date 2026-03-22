"use client"
import React, { useEffect, useRef, useState } from 'react';
// Importing icons from react-icons
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { base_url } from '../components/urls';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    name: ""
  })

  const [verifyOtp, setVerfyOtp] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const route = useRouter()

  const handleSuccess = async (credentialResponse) => {
    try {

      const res = await axios.post(`${base_url}/user/register/google`,
        {
          token: credentialResponse.credential,
        }
      );

      const data = await res.data;
      if (data.success) {
        toast.success(data.message)
        route.push("/")
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.response.data.message)
    }
  };


  const handeSendotp = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${base_url}/user/user/sendotp`, { email: loginDetails.email })
      const data = await response.data;
      if (data.success) {
        toast.success(data.message)
        setVerfyOtp(true)
      } else {
        toast.error(data.message)

      }
    } catch (error) {
      toast.error(error.response.data.message)

    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (value, index) => {
    if (isNaN(Number(value))) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };



  const SubmitverifyOtp = async (e) => {
    e.preventDefault()
    try {
      const fullotp = otp.join("");
      const response = await axios.post(`${base_url}/user/user/verifyotp`, { ...loginDetails, otp: fullotp })
      const data = await response.data
      console.log(data)
      if (data.success) {
        toast.success(data.message)
        route.push("/")
      } else {
        toast.error(data.message)

      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-rose-100">

        {!verifyOtp && <>
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-rose-800">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join us today and start your journey
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="mt-8">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => console.log("Google Login Failed")}
            />

          </div>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Form Section */}
          <form className="mt-8 space-y-6" onSubmit={handeSendotp}>
            <div className="space-y-4">

              {/* Full Name Input */}
              <div>
                <label htmlFor="name" className="sr-only">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiOutlineUser className="h-5 w-5 text-rose-800" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    onChange={(e) => setLoginDetails(prev => ({ ...prev, name: e.target.value }))}
                    value={loginDetails.name}
                    className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-rose-800 focus:border-rose-800 focus:z-10 sm:text-sm"
                    placeholder="Full Name"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiOutlineMail className="h-5 w-5 text-rose-800" />
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-rose-800 focus:border-rose-800 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    onChange={(e) => setLoginDetails(prev => ({ ...prev, email: e.target.value }))}
                    value={loginDetails.email}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiOutlineLockClosed className="h-5 w-5 text-rose-800" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-rose-800 focus:border-rose-800 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    onChange={(e) => setLoginDetails(prev => ({ ...prev, password: e.target.value }))}
                    value={loginDetails.password}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-rose-800 focus:ring-rose-800 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  I agree to the <a href="#" className="text-rose-800 hover:text-rose-700 underline">Terms</a>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-800 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-800 transition-colors duration-200"
              >
                Sign up
              </button>
            </div>
          </form>

          {/* Footer Link */}
          <div className="text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-rose-800 hover:text-rose-700">
                Sign in
              </a>
            </p>
          </div>
        </>}


        {verifyOtp &&
          <div className='flex flex-col items-center gap-4'>
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-extrabold text-rose-800">
                Verify Otp
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Dont shear otp with anyone
              </p>
            </div>

            <div className="flex gap-2 sm:gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digit}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-semibold border-2 rounded-xl 
                       bg-white border-slate-300 text-slate-800 transition-all
                       focus:border-rose-800 focus:ring-2 focus:ring-indigo-100 outline-none"
                />
              ))}
            </div>
            <button
              className="mt-8 w-full py-3 px-6 bg-rose-800 text-white font-medium rounded-xl 
                   hover:bg-rose-800 transition-colors focus:ring-4 focus:ring-indigo-200"
              onClick={SubmitverifyOtp}
            >
              Verify Code
            </button>

            <p className="mt-4 text-sm text-slate-500">
              Didn’t receive a code?{" "}
              <button className="text-rose-800 font-semibold hover:underline">
                Resend
              </button>
            </p>
          </div>

        }

      </div>
    </div>
  )
}

export default SignupPage