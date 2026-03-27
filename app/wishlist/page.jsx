'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  FaTrash, 
  FaArrowLeft, 
  FaHeartBroken, 
  FaEye
} from 'react-icons/fa';
import axios from 'axios';
import { base_url, img_url } from '../components/urls';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../components/Store/slices/WishlistSlice';

const WishlistPage = () => {
  const dispatch = useDispatch()
const state = useSelector(state=>state.wishlist.items)
 const [products,setProducts]=useState([ ])




  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const fetchWishlist = async (state)=>{
    try {
      const response = await axios.post(`${base_url}/wishlist/get`,{wishlistids:state})
      const data = await response.data;
      if(data.success){
setProducts(data.data)
      }
      console.log(data)
    } catch (error) {
      setProducts( [ ])
    }
  }


  
// useEffect(()=>{
//  dispatch()
// },[ ])

useEffect(()=>{
  if(state.length > 0){
fetchWishlist(state)

  }else{
    setProducts([ ])
  }
},[state])


  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4 text-center font-sans">
        <div className="w-20 h-20 bg-stone-200 rounded-full flex items-center justify-center mb-6 text-stone-400">
           <FaHeartBroken size={32} />
        </div>
        <h2 className="text-3xl font-serif text-indigo-900 mb-2">Your wishlist is empty</h2>
        <p className="text-stone-600 mb-8 max-w-md">
          Save your favorite traditional styles here to revisit them later.
        </p>
        <Link href="/" className="bg-black text-white px-8 py-3 rounded hover:bg-indigo-800 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-900/20">
          <FaArrowLeft /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-stone-200 pb-4">
          <h1 className="text-3xl font-serif text-indigo-900">
            My Wishlist
             <span className="text-lg font-sans text-stone-500 font-normal">({products.length})</span>
          </h1>
          <Link href="/" className="text-stone-500 hover:text-indigo-900 text-sm flex items-center gap-1 mt-2 md:mt-0 transition-colors">
            <FaArrowLeft /> Back to Shop
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((item) => (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-stone-100 group hover:shadow-lg transition-all duration-300 relative flex flex-col">
              
            
              <button 
                onClick={() => dispatch(removeFromWishlist(item._id))}
                className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-stone-400 hover:text-red-600 hover:bg-white transition-all shadow-sm"
                title="Remove from Wishlist"
              >
                <FaTrash size={12} />
              </button>

           
              <div className="relative h-64 overflow-hidden bg-stone-200">
                <img 
                  src={`${img_url}/${item.images[0]}`} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {!item.quantity && (
                  <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                    <span className="bg-stone-800 text-white text-xs font-bold px-3 py-1 uppercase tracking-widest">Out of Stock</span>
                  </div>
                )}
              </div>

              
              <div className="p-4 flex flex-col flex-1">
                <p className="text-xs text-stone-500 mb-1">{item.productfor}</p>
                <h3 className="font-serif text-lg text-stone-800 truncate mb-2">{item.title}</h3>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-bold text-indigo-900">{formatPrice(item.sellingPrice)}</span>
                  <span className="text-xs text-stone-400 line-through">{formatPrice(item.compareAtPrice)}</span>
                  <span className="text-xs text-green-700 font-medium ml-auto">
                    {Math.round(((item.compareAtPrice - item.sellingPrice) / item.compareAtPrice) * 100)}% OFF
                  </span>
                </div>

               
                <div className="mt-auto">
                   {item.quantity ? (
                     <Link 
                     href={`/product/${item?.slug}`}
                       className="w-full py-2 border border-indigo-900 text-indigo-900 rounded hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-wide"
                     >
                       <FaEye size={14} /> View
                     </Link>
                   ) : (
                     <button 
                       disabled 
                       className="w-full py-2 border border-stone-300 text-stone-400 rounded cursor-not-allowed text-sm font-medium uppercase tracking-wide"
                     >
                       Notify Me
                     </button>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div> 

      </div>
    </div>
  )
}

export default WishlistPage