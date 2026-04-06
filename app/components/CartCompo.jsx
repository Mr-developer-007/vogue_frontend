"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { FiShoppingBag, FiClock, FiTag } from 'react-icons/fi';
import { base_url, img_url } from './urls';

// Helper to format currency
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price || 0);
};

const CartSummary = ({ setCheckoutData, checkoutData, handelCheckout, handelAddDiscount }) => {
  const router = useRouter();
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${base_url}/cart/get`);
      const data = response.data;

      if (data.success) {
        setCartData(data.items);
    
        const orderItemsPayload = data.items.items.map(pdata => ({
          product: pdata.product._id,
          quantity: pdata.quantity,
          price: pdata.price,
          size: pdata.size,
          image: pdata.product.images[0]
        }));

        setCheckoutData(prev => ({
          ...prev,
          orderItems: orderItemsPayload,
          itemsPrice: data.items.totalPrice,
          totalPrice: data.items.totalPrice + 99 // Shipping logic
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

  const handelAddCouponCode = async () => {
    try {
      const response = await axios.post(`${base_url}/couponcode/apply`, { 
        couponcode: couponCode, 
        cartTotal: checkoutData.totalPrice 
      });
      const data = await response.data;
      
      if (data.success) {
        handelAddDiscount(data.discount);
        toast.success(data.message);
        setCouponCode("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid or expired code");
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-white rounded-3xl p-10 shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-100 flex flex-col items-center justify-center space-y-4 h-96 sticky top-10">
        <div className="w-10 h-10 border-2 border-gray-200 border-t-[#B5945C] rounded-full animate-spin"></div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Securing Order...</p>
      </div>
    );
  }

  if (!cartData || cartData.items.length === 0) {
    return null;
  }

  // Calculate final display totals
  const discountAmount = checkoutData?.discountPrice || 0;
  const finalTotal = checkoutData?.totalPrice - discountAmount;

  return (
    <div 
      className="w-full bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-100 overflow-hidden sticky top-10"
      style={{ '--primary': '#B5945C' }}
    >
      
      {/* --- HEADER --- */}
      <div className="p-8 pb-6 border-b border-gray-100">
        <h2 className="text-2xl font-serif font-light text-gray-900 tracking-tight flex items-center gap-3">
          <FiShoppingBag className="text-[var(--primary)]" /> Order Summary
        </h2>
        <p className="text-sm text-gray-400 font-light mt-2">Review your selections before completion.</p>
      </div>

      {/* --- ITEMS LIST --- */}
      <div className="p-8 space-y-6 max-h-[400px] overflow-y-auto custom-scrollbar">
        {cartData.items.map((item) => (
          <div key={item._id} className="flex gap-5 group">
            
            {/* Product Image */}
            <div className="relative h-24 w-20 flex-shrink-0 rounded-xl bg-[#FBFBFA] border border-gray-100 overflow-hidden">
              <img
                src={item.product.images?.[0] ? `${img_url}/${item.product.images[0]}` : '/placeholder.jpg'}
                alt={item.product.title}
                className="h-full w-full object-contain p-2 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-0 right-0 bg-white/90 backdrop-blur-sm border-b border-l border-gray-100 text-[10px] font-bold text-gray-900 px-2 py-1 rounded-bl-xl shadow-sm">
                x{item.quantity}
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-1 flex-col justify-center">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-relaxed group-hover:text-[var(--primary)] transition-colors">
                {item.product.title}
              </h3>
              
              <div className="mt-2 flex justify-between items-end">
                <div className="flex items-center gap-2">
                  {item.size && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-gray-50 px-2 py-1 rounded-sm border border-gray-100">
                      Size: {item.size}
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {formatPrice(item.product.sellingPrice)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- PRICING BREAKDOWN --- */}
      <div className="bg-[#FCFBFA] p-8 space-y-8 border-t border-gray-100">
        
      

        <div className="space-y-4 pt-2">
          <div className="flex justify-between text-sm text-gray-500 font-light">
            <span>Subtotal</span>
            <span className="text-gray-900 font-medium">{formatPrice(cartData.totalPrice)}</span>
          </div>
          
          <div className="flex justify-between text-sm text-gray-500 font-light">
            <span>Standard Shipping</span>
            <span className="text-gray-900 font-medium">₹99</span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between text-sm text-[var(--primary)] font-medium">
              <span className="flex items-center gap-1.5"><FiTag size={14} /> Discount Applied</span>
              <span>-{formatPrice(discountAmount)}</span>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-6 flex justify-between items-end">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total</span>
            <p className="text-[10px] text-gray-400 font-light mt-1">Includes all taxes</p>
          </div>
          <span className="text-3xl font-serif text-gray-900 tracking-tight">
            {formatPrice(finalTotal)}
          </span>
        </div>

        {/* --- CHECKOUT ACTION --- */}
        <div className="pt-2">
          <button  
            onClick={handelCheckout} 
            className="w-full h-14 bg-gray-900 text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] transition-all duration-300 hover:bg-[var(--primary)] hover:shadow-[0_6px_20px_rgb(181,148,92,0.3)] hover:-translate-y-0.5"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
      
      {/* --- FOOTER NOTE --- */}
      <div className="px-6 py-4 bg-white border-t border-gray-100 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400 flex items-center justify-center gap-2">
         <FiClock size={12} className="text-[var(--primary)]" /> 
         <span>Pieces reserved for 15 minutes</span>
      </div>

    </div>
  );
};

export default CartSummary;