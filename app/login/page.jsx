'use client'

import React, { useState } from 'react'
import { FiMail, FiLock, FiEye, FiEyeOff, FiShoppingBag } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import { GoogleLogin } from '@react-oauth/google'
import { base_url } from '../components/urls'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const route = useRouter()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
try {
  const response = await axios.post(`${base_url}/user/user/login`,formData)
  const data = await response.data;
  
  if (data.success) {
        toast.success(data.message)
        route.back()
      } else {
        toast.error(data.message)
      }
} catch (error) {
        toast.error(error.response.data.message)

}


  };

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
        route.back()
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.response.data.message)
    }
  };



  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4">
      {/* Card Container */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header Section */}
        <div className="px-8 pt-10 pb-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-rose-100 rounded-full text-rose-800">
               <FiShoppingBag size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-rose-800 font-serif tracking-wide">
            VIRASAT
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Welcome back to timeless elegance.
          </p>
        </div>

        {/* Form Section */}
        <div className="px-8 pb-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-rose-800" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-800 focus:border-transparent transition duration-200"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-xs font-semibold text-rose-800 hover:text-rose-600">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-rose-800" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-800 focus:border-transparent transition duration-200"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-rose-800 cursor-pointer"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-rose-800 text-white font-semibold py-3 rounded-lg hover:bg-black transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 flex items-center justify-between">
            <span className="border-b w-1/5 border-gray-300"></span>
            <span className="text-xs text-gray-400 uppercase">Or continue with</span>
            <span className="border-b w-1/5 border-gray-300"></span>
          </div>

 <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Google Login Failed")}
      />


          {/* Social Login */}
          {/* <div className="mt-6">
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 transition duration-200">
              <FcGoogle size={20} />
              <span className="text-gray-700 text-sm font-medium">Google</span>
            </button>
          </div> */}

          {/* Sign Up Link */}
          <div className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="font-bold text-rose-800 hover:underline">
              Create Account
            </a>
          </div>
        </div> 
      </div>
    </div>
  )
}

export default Login