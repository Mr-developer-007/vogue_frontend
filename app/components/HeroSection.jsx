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
    <div className="w-full  relative overflow-hidden ">
      {/* <Swiper
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
      `}</style> */}



<div className="relative w-full   h-[700px] md:h-[700px] overflow-hidden bg-black">



  <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>




  <video 
    autoPlay 
    loop 
    muted 
    playsInline 
    className="absolute top-0 left-0 w-full  z-0 hidden md:block"
  >
    <source src="/video/video1.mp4" type="video/mp4" />
    <track kind="captions" />
    Your browser does not support the video tag.
  </video>
  
  <video 
    autoPlay 
    loop 
    muted 
    playsInline 
    className="absolute top-0 left-0 w-full  z-0  md:hidden"
  >
    <source src="/video/video2.mp4" type="video/mp4" />
    <track kind="captions" />
    Your browser does not support the video tag.
  </video>


  {/* Hero Content */}
  <div className="h-full  flex flex-col justify-end pb-10  items-center text-white text-center px-4">
   
    <Link href={"/products"} className=" relative z-20  px-10 py-4 bg-white/10 backdrop-blur-md border border-white/40 hover:bg-white hover:text-black transition-all duration-500 font-bold uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]">
      Explore Collection
    </Link>
  </div>
</div>


    </div>
  );
};

export default HeroSlider;