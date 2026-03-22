"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaArrowRight } from 'react-icons/fa';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import axios from 'axios';
import { base_url, img_url } from './urls';

const HeroSlider = () => {
  

const allBanners =[
  {imagedesktop:"1.webp",
     imageMobile:"1.webp"},
  {
    imagedesktop:"2.webp",
        imageMobile:"2.webp"

  },
  {
    imagedesktop:"3.webp",
    imageMobile:"3.webp"
  }
]

  return (
    <div className="w-full h-[80vh] min-h-[500px] max-h-[700px] relative overflow-hidden ">
      <Swiper
        spaceBetween={0}
     
        loop={true}
      
        autoplay={{
          delay: 4000,
       
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="w-full h-full"
      >
        {allBanners.length >0 && allBanners?.map((slide,index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
         
            <div className=" hidden md:block w-full h-full">
              <img 
                src={`/banner/desktop/${slide.imagedesktop}`} 
               
                className="w-full h-full"
                loading="eager"
              />
            
            </div>

            <div className="  md:hidden absolute inset-0 w-full h-full">
              <img 
                src={`/banner/mobile/${slide.imageMobile}`} 
             
                className="w-full h-full "
                loading="eager"
              />
             
            </div>

           
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Styles */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
          width: 10px;
          height: 10px;
          margin: 0 6px !important;
        }
        
        .swiper-pagination-bullet-active {
          background: black;
          opacity: 1;
          width: 30px;
          border-radius: 5px;
        }
        
        .swiper-pagination {
          bottom: 20px !important;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;