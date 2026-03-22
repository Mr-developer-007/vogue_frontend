'use client'; // Required for Swiper interactions

import React from 'react';
import TagLineCompo from './TagLineCompo';
import Link from 'next/link';


// 1. Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import {  img_url } from './urls';
import { useSelector } from 'react-redux';

const Category = () => {

   const { categories, loading } = useSelector(state => state.category);


   

  return (
    <div className="py-16 bg-white border-b border-stone-100">
      
      <TagLineCompo 
        tag="Browse by Category"
        heading="Shop Essentials"
      />

      <div className="container mx-auto px-4  mt-10">
        
        {/* 2. Swiper Container */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          loop={true}
          speed={1000} // Smooth transition speed
          autoplay={{
            delay: 2500,
            disableOnInteraction: false, 
            pauseOnMouseEnter: true, // Stops when user hovers to click
          }}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 20 }, // Mobile
            640: { slidesPerView: 3, spaceBetween: 20 }, // Small Tablet
            768: { slidesPerView: 4, spaceBetween: 30 }, // Tablet
            1024: { slidesPerView: 6, spaceBetween: 40 }, // Desktop
          }}
          className="py-8" // Add padding to swiper to allow shadow to show
        >
         {categories.length > 0 &&
  categories.map((cat) => (
    <SwiperSlide key={cat._id}>
      <Link
        href={`/products?category=${cat._id}`}
        className="group flex flex-col items-center cursor-pointer"
      >
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 p-1 rounded-full border-2 border-stone-200 group-hover:border-black transition-colors duration-300">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <img
              src={`${img_url}/${cat.image}`}
             
              className="object-  w-full h-full group-hover:scale-110 transition-transform duration-500 ease-in-out"
             
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        </div>

        <h3 className="mt-4 text-base font-serif font-medium text-stone-700 group-hover:text-black transition-colors">
          {cat.title}
        </h3>
      </Link>
    </SwiperSlide>
  ))}

        </Swiper>
      </div>
    </div>
  )
}

export default Category;