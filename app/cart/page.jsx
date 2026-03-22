'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  FaTrash, 
  FaMinus, 
  FaPlus, 
  FaArrowRight, 
  FaLock, 
  FaGift, 
  FaArrowLeft 
} from 'react-icons/fa';
import axios from 'axios';
import { base_url, img_url } from '../components/urls';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { HiOutlineHeart } from 'react-icons/hi';

const CartPage = () => {
const route = useRouter()

  const [cartItems,setAllcart]=useState()





  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

const fetchCart=async()=>{
  try {
    const response = await axios.get(`${base_url}/cart/get`)
    const data = await response.data
    setAllcart(data.items)
  } catch (error) {
    toast.error(error.response.data.message)
    route.push("/login")
  }
}

useEffect(()=>{
  fetchCart()
},[])



  if ( !cartItems || cartItems?.items?.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-24 h-24 bg-stone-200 rounded-full flex items-center justify-center mb-6 text-stone-400">
           <FaGift size={40} />
        </div>
        <h2 className="text-3xl font-serif text-indigo-900 mb-2">Your cart is empty</h2>
        <p className="text-stone-600 mb-8 max-w-md">
          It looks like you haven't added any traditional wear to your bag yet.
        </p>
        <Link href="/" className="bg-black text-white px-8 py-3 rounded hover:bg-indigo-800 transition-colors flex items-center gap-2">
          <FaArrowLeft /> Start Shopping
        </Link>
      </div>
    );
  }



const updateQuantityAdd=async(id)=>{

  try {
    const response = await axios.put(`${base_url}/cart/increment/quantity/${id}`)
    const data = await response.data;
setAllcart(data.items)
 fetchCart()
  } catch (error) {
    toast.error(error.response.data.message)
  }
}

const updateQuantitysub = async(id)=>{

  try {
    const response = await axios.put(`${base_url}/cart/decrement/quantity/${id}`)
    const data = await response.data;
 fetchCart()
  } catch (error) {
    toast.error(error.response.data.message)
  }
}

const removeItem=async(id)=>{
 try {
    const response = await axios.delete(`${base_url}/cart/delete/${id}`)
    const data = await response.data;

 fetchCart()
  } catch (error) {
    toast.error(error.response.data.message)
  }
}



const handelMovetowishlist=async(id)=>{
   try {
    const response = await axios.put(`${base_url}/cart/movetowishlist/${id}`)
    const data = await response.data;
    toast.success(data.message)
 fetchCart()
  } catch (error) {
    toast.error(error.response.data.message)
  }
}

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl md:text-4xl font-serif text-indigo-900 mb-8 border-b border-stone-200 pb-4">
          Shopping Cart <span className="text-lg font-sans text-stone-500 font-normal">({cartItems?.items?.length} items)</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* --- LEFT COLUMN: Cart Items --- */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems?.items?.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 flex flex-col sm:flex-row gap-6 transition-all hover:shadow-md">
                
                {/* Product Image */}
                <div className="w-full sm:w-32 h-52 md:h-32 bg-stone-100 rounded-lg overflow-hidden shrink-0">
                  <img 
                    src={`${img_url}/${item.product.images[0]}`} 
                    alt={item.title} 
                    className="w-full h-full object-contain omd:bject-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-stone-800 font-serif">{item.product.title}</h3>
                      <button 
                        onClick={() => removeItem(item._id)}
                        className="text-stone-400 hover:text-indigo-900 transition-colors p-1"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <p className="text-sm text-white mt-1 uppercase bg-indigo-800 w-fit px-3 "> {item.size}</p>
                  </div>

                  <div onClick={()=>handelMovetowishlist(item._id)} className='flex  items-center gap-1  cursor-pointer w-fit my-2'>
                    move to wishlist  <HiOutlineHeart />
                    </div>

                  <div className="flex justify-between items-end ">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                      <button 
                        onClick={() => updateQuantitysub(item._id)}
                        className="px-3 py-1 hover:bg-stone-200 text-stone-600 transition-colors"
                      >
                        <FaMinus size={10} />
                      </button>
                      <span className="px-3 font-medium text-sm w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantityAdd(item._id)}
                        className="px-3 py-1 hover:bg-stone-200 text-stone-600 transition-colors"
                      >
                        <FaPlus size={10} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                       <p className="font-bold text-lg text-indigo-900">{formatPrice(item.price * item.quantity)}</p>
                       {item.quantity > 1 && (
                         <p className="text-xs text-stone-400">{formatPrice(item.price)} each</p>
                       )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link href="/" className="inline-flex items-center text-indigo-900 hover:text-indigo-700 font-medium mt-4">
              <FaArrowLeft className="mr-2" size={12} /> Continue Shopping
            </Link>
          </div>

          {/* --- RIGHT COLUMN: Order Summary --- */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-stone-100 sticky top-4">
              <h2 className="text-xl font-bold font-serif text-stone-800 mb-6">Order Summary</h2>

              <div className="space-y-3 text-stone-600 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-800">{formatPrice(cartItems.totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Estimate</span>
                 
                    <span className="text-green-700 font-medium">Free</span>
                
                </div>
                <div className="flex justify-between">
                  <span>Shipping (fix)</span>
                  <span>{formatPrice(99)}</span>
                </div>
              </div>

              {/* Gift Wrap Option */}
             
              <div className="border-t border-stone-200 pt-4 mb-6">
                <div className="flex justify-between items-center text-lg font-bold text-stone-900">
                  <span>Total</span>
                  <span>{formatPrice(cartItems.totalPrice+99)}</span>
                </div>
                <p className="text-xs text-stone-400 mt-1 text-right">Inclusive of all taxes</p>
              </div>

              <Link  href={"/checkout"} className="w-full bg-black text-white py-4 rounded-lg hover:bg-indigo-800 transition-colors flex items-center justify-center gap-2 font-semibold shadow-lg shadow-indigo-900/20">
                Proceed to Checkout <FaArrowRight />
              </Link>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-stone-500">
                <FaLock /> Secure Checkout
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CartPage