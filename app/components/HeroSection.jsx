"use client"

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';

const HeroSlider = () => {
 

  return (
    <div className="w-full">
      
      {/* Slider Section */}
      <Link href={'/products'} className="w-full relative  hidden md:block ">
        {/* <Swiper
          spaceBetween={0}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false, // Keeps autoplaying after user swipes
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="w-full h-full"
        >
          {allBanners.length > 0 && allBanners.map((slide, index) => (
            <SwiperSlide key={index} className="relative w-full h-full">
              
              <Image 
                src={`/banner/mobile/${slide}`} 
                alt={`Hero Banner ${index + 1}`}
                fill
                priority={index === 0} // Load the first image instantly
                className=" object-center"
              />
              
            
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>

            </SwiperSlide>
          ))}
        </Swiper>

        <style jsx global>{`
          .swiper-pagination-bullet {
            background: white;
            opacity: 0.5;
            width: 8px;
            height: 8px;
            margin: 0 6px !important;
            transition: all 0.3s ease;
          }
          
          .swiper-pagination-bullet-active {
            background: white;
            opacity: 1;
            width: 28px;
            border-radius: 4px;
          }
          
          .swiper-pagination {
            bottom: 24px !important;
            z-index: 20;
          }
        `}</style> */}

         <img 
                src={`/banner/IMG_20260611_222114.png`} 
                alt={`Hero Banner `}
                
                priority 
                className=" w-full object-cover"
              />
      </Link>

     
      <Link href={'/products'} className="relative w-full h-[750px] overflow-hidden bg-neutral-950 md:hidden">

        <img 
                src={`/banner/IMG_20260611_222114.png`} 
                alt={`Hero Banner `}
                
                priority 
                className=" w-full object-cover"
              />
        
        {/* <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none"></div>
        
        <video  
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/video/video4.mp4" type="video/mp4" />
          <track kind="captions" />
          Your browser does not support the video tag.
        </video> */}
        
      </Link>

    </div>
  );
};

export default HeroSlider;