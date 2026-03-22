'use client';

import React from 'react';
import TagLineCompo from './TagLineCompo';
import { HiPlay, HiShoppingBag } from "react-icons/hi";

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const VideoReviews = () => {

  // Mock Data for a T-Shirt/Streetwear Site
  const videos = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1739&auto=format&fit=crop", 
      user: "Alex Chen",
      product: "Oversized Vintage Tee",
      price: "₹999",
      videoUrl: "#"
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1887&auto=format&fit=crop", 
      user: "Rahul Verma",
      product: "Heavyweight Boxy Fit",
      price: "₹1,299",
      videoUrl: "#"
    },
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1740&auto=format&fit=crop", 
      user: "Sarah Jones",
      product: "Essential Ribbed Tank",
      price: "₹599",
      videoUrl: "#"
    },
    {
      id: 4,
      thumbnail: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?q=80&w=1664&auto=format&fit=crop", 
      user: "Kabir Singh",
      product: "Graphic Street Tee",
      price: "₹1,099",
      videoUrl: "#"
    },
    {
      id: 5,
      thumbnail: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1887&auto=format&fit=crop", 
      user: "Priya Patel",
      product: "Washed Acid Drop",
      price: "₹1,499",
      videoUrl: "#"
    }
  ];

  return (
    <div className="bg-white border-b border-gray-100 py-16 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      <TagLineCompo 
        tag="Watch & Shop"
        heading="Real Fits, Real People"
      />

      <div className="max-w-7xl mx-auto px-4 mt-8">
        
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1.2} // Show part of the next slide on mobile to encourage scrolling
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            768: { slidesPerView: 3.2 },
            1024: { slidesPerView: 4 },
          }}
          style={{
            "--swiper-navigation-color": "#4f46e5", // Indigo-600
            "--swiper-pagination-color": "#4f46e5", // Indigo-600
            paddingBottom: "50px", // Space for pagination dots
            paddingLeft: "4px", // Prevent box-shadow cut off
            paddingRight: "4px"
          }}
        >
          {videos.map((item) => (
            <SwiperSlide key={item.id}>
              <VideoCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  )
}

// Separate Component for the Logic inside each slide
const VideoCard = ({ item }) => {
  return (
    <div className="relative group w-full aspect-[9/16] rounded-xl overflow-hidden border border-gray-200 bg-gray-50 cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300">
      
      {/* 1. Thumbnail Image (Colors restored, subtle brightness shift on hover) */}
      <img 
        src={item.thumbnail} 
        alt={item.user} 
        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 brightness-95 group-hover:brightness-105"
      />

      {/* 2. Play Button (Centered - Colorful) */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm border border-white/40">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white pl-1 shadow-[0_0_15px_rgba(79,70,229,0.5)]">
            <HiPlay size={18} />
          </div>
        </div>
      </div>

      {/* 3. Top User Tag */}
      <div className="absolute top-0 left-0 w-full p-4 z-10 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-full border border-white/50 overflow-hidden bg-white shadow-sm">
             <img src={item.thumbnail} alt="user" className="w-full h-full object-cover" />
           </div>
           <span className="text-white text-xs font-medium tracking-wider drop-shadow-md uppercase">
             @{item.user.replace(' ', '').toLowerCase()}
           </span>
        </div>
      </div>

      {/* 4. Bottom Product Card overlay */}
      <div className="absolute bottom-0 left-0 w-full p-3 z-20">
        <div className="bg-white/95 backdrop-blur-sm p-4 shadow-lg border border-gray-100/50 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 rounded-xl">
          <div className="flex items-center justify-between gap-3">
            
            <div className="flex-1 min-w-0">
              <h4 className="text-gray-900 font-bold text-sm truncate uppercase tracking-wide">
                {item.product}
              </h4>
              <p className="text-indigo-600 font-bold text-xs mt-0.5">
                {item.price}
              </p>
            </div>

            <button className="flex-shrink-0 bg-gray-50 text-gray-700 border border-gray-200 p-2.5 rounded-lg hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors shadow-sm">
              <HiShoppingBag size={18} />
            </button>
            
          </div>
        </div>
      </div>

    </div>
  );
}

export default VideoReviews;