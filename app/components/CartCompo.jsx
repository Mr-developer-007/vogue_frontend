"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { FiShoppingBag, FiPackage, FiClock } from 'react-icons/fi'
import { base_url, img_url } from './urls'
import { CiDiscount1 } from "react-icons/ci";

// Helper to format currency
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

const CartSummary = ({ setCheckoutData,checkoutData ,handelCheckout}) => {
  const router = useRouter();
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Assuming your images are served from the root of your backend
  // You might need to adjust this depending on your setup (e.g., http://localhost:5000/)
  const IMG_BASE_URL = base_url.replace('/api', ''); 

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${base_url}/cart/get`);
      const data = response.data;

      if (data.success) {
        setCartData(data.items);

        // --- CRITICAL FIX ---
        // Prepare the order items array first, then set state ONCE.
        // Doing this inside a forEach loop causes multiple re-renders and potential duplicates.
        const orderItemsPayload = data.items.items.map(pdata => ({
          product: pdata.product._id,
          quantity: pdata.quantity,
          price: pdata.price,
          size: pdata.size,
          image: pdata.product.images[0] // Useful to save snapshot of image in order model
        }));

        setCheckoutData(prev => ({
          ...prev,
          orderItems: orderItemsPayload,
          itemsPrice: data.items.totalPrice,
          totalPrice: data.items.totalPrice+99 // You can add shipping logic here later
        }));
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Please login to continue");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse bg-white p-6 rounded-2xl h-64 w-full border border-gray-100 flex items-center justify-center text-gray-400">
        Loading cart details...
      </div>
    );
  }

  if (!cartData || cartData.items.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
      
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <FiShoppingBag className="text-blue-600" /> Order Summary
        </h2>
        <p className="text-sm text-gray-500 mt-1">Check your items before proceeding</p>
      </div>

      {/* Items List */}
      <div className="p-6 space-y-6  overflow-y-auto custom-scrollbar">
        {cartData.items.map((item) => (
          <div key={item._id} className="flex gap-4">
            {/* Product Image */}
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                src={item.product.images?.[0] ? `${img_url}/${item.product.images[0]}` : '/placeholder.jpg'}
                alt={item.product.title}
                className="h-full w-full object-cover object-center"
              />
              <span className="absolute bottom-0 right-0 bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded-tl-md">
                x{item.quantity}
              </span>
            </div>

            {/* Product Details */}
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug">
                  {item.product.title}
                </h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                  {item.size && (
                    <span className="uppercase bg-gray-100 px-1.5 py-0.5 rounded">
                      Size: {item.size}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-end">
                <p className="text-sm font-semibold text-gray-900">
                  {formatPrice(item.product.sellingPrice)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Breakdown */}
      <div className="bg-gray-50 p-6 space-y-3 border-t border-gray-100">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium">{formatPrice(cartData.totalPrice)}</span>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span className="flex items-center gap-1"><FiPackage /> Shipping</span>
          <span className="text-green-600 font-medium">99</span>
        </div>


         {checkoutData.discountPrice > 0 &&  <div className="flex justify-between text-sm text-gray-600">
          <span className="flex items-center gap-1"><CiDiscount1 /> Discount</span>
          <span className="text-green-600 font-medium">-{checkoutData.discountPrice}</span>
        </div>
}

        <div className="border-t border-gray-200 my-2 pt-3 flex justify-between items-center">
          <span className="text-base font-bold text-gray-900">Total</span>
          <div className="text-right">
            <span className="text-xl font-bold text-blue-600">{formatPrice(checkoutData.totalPrice)}</span>
            <p className="text-[10px] text-gray-400">Including all taxes</p>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        {/* <div>
{checkoutData.discountPrice}
        </div> */}


      </div>
<div className='flex items-center justify-center my-4'>
    <button  onClick={handelCheckout} className='px-4 py-1 bg-indigo-500 rounded-2xl text-white cursor-pointer'>Checkout</button>
</div>
      
      <div className="px-6 py-3 bg-blue-50/50 border-t border-blue-100 text-xs text-blue-700 flex items-center justify-center gap-2">
         <FiClock /> Items are reserved for 15 minutes
      </div>

      
    </div>
  )
}

export default CartSummary