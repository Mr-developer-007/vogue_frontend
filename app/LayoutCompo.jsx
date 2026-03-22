"use client"
import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { usePathname } from 'next/navigation'
import { Slide, ToastContainer } from 'react-toastify'
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from 'axios'
import { Provider } from 'react-redux'
import store from './components/Store/store'
axios.defaults.withCredentials = true

const LayoutCompo = ({ children }) => {
    const pathname = usePathname()
    useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  document.body.appendChild(script);
}, []);
  return (
    <> 
    <ToastContainer
position="top-center"
autoClose={1200}
hideProgressBar
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Slide}
/>
    <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        >
          <Provider store={store}>
      {!pathname.startsWith("/admin") && !pathname.startsWith("/login") && !pathname.startsWith("/signup") && <Navbar />}
        {children}
     {!pathname.startsWith("/admin") && !pathname.startsWith("/login") && !pathname.startsWith("/signup")  &&    <Footer /> }
</Provider>
     </GoogleOAuthProvider>
    </>
  )
}

export default LayoutCompo