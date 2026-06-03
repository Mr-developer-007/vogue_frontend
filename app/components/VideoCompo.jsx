"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { base_url } from '@/app/components/urls'
import { FiShoppingBag, FiArrowRight } from 'react-icons/fi'

// --- Premium Skeleton Loader ---
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse border border-neutral-100">
    <div className="aspect-[9/16] bg-neutral-200" />
    <div className="p-5 flex justify-between items-center">
      <div className="w-1/2 h-4 bg-neutral-200 rounded-lg" />
      <div className="w-16 h-3 bg-neutral-200 rounded-full" />
    </div>
  </div>
)

const FeaturedVideos = () => {
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchVideo = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${base_url}/video/getall`)
      const data = response.data;
      
      if (data.success) {
        setVideos(data.videos || [])
      }
    } catch (error) {
      console.error("Failed to fetch videos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchVideo()
  }, [])

  // Do not render the section if there are no videos to show on the homepage
  if (!isLoading && videos.length === 0) return null;

  return (
    <section className="bg-[#FAFAFA] py-16 md:py-24 font-sans text-neutral-900">
      
      {/* --- Section Header --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            Shop The <span className="font-semibold italic">Look</span>
          </h2>
          <p className="text-neutral-500 mt-2 text-sm tracking-wide">
            See our premium collection in motion.
          </p>
        </div>
        <Link 
          href="/products" 
          className="group flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          View all pieces 
          <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* --- Main Grid Section --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-7">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          /* Premium Video Grid */
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-7">
            {videos.map((item, idx) => (
              <Link 
                href={item.product?.slug ? `/product/${item.product.slug}` : '#'}
                key={item._id} 
                className="group relative bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 ease-out hover:-translate-y-1 block"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                
                {/* --- Video Player (No Controls, Autoplay) --- */}
                <div className="relative aspect-[9/16] bg-neutral-900 overflow-hidden">
                  <video 
                    src={`${base_url}/video/watch/${item._id}`} 
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  
                  {/* Subtle Dark Overlays for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  {/* Price Tag Overlay (Bottom Left) */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="bg-white/10 backdrop-blur-md text-white text-sm font-semibold tracking-wide py-1.5 px-3.5 rounded-full border border-white/20 shadow-lg group-hover:bg-white/20 transition-colors">
                      ₹{item.product?.sellingPrice?.toLocaleString('en-IN') || "—"}
                    </span>
                  </div>

                  {/* "Shop Now" Hover Button (Glassmorphic) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold uppercase tracking-widest py-3 px-6 rounded-full shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <FiShoppingBag className="w-4 h-4" />
                      Shop Now
                    </div>
                  </div>
                </div>

                {/* --- Product Info Footer (Title Only) --- */}
                {/* <div className="p-4 md:p-5 flex items-center justify-between bg-white">
                  <h3 className="font-medium text-neutral-800 text-sm md:text-base leading-snug line-clamp-1 group-hover:text-black transition-colors pr-3">
                    {item.product?.title || "Premium Apparel"}
                  </h3>
                  
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-neutral-900 transition-colors flex items-center shrink-0">
                    Explore <FiArrowRight className="ml-1 w-3 h-3" />
                  </span>
                </div> */}
                
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}

export default FeaturedVideos