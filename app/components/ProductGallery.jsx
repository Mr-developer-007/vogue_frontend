"use client";

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import { img_url } from './urls';
import ReviewSection from './ReviewSection';

const ProductGallery = ({ productData ,setZoomImgurl}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // Safety check in case productData hasn't loaded yet
  if (!productData) return null;

  // Combine images and filter out any undefined values
  const allImages = [productData.thumbnail, ...(productData.images || [])].filter(Boolean);

  return (
    <div className="w-full">
      {/* ------------------------------------------- */}
      {/* DESKTOP VIEW: Visible from md breakpoint    */}
      {/* ------------------------------------------- */}
      <div className="hidden md:flex gap-4">
        {/* Vertical thumbnails */}
        <div className="w-24 flex flex-col gap-3 overflow-y-auto max-h-[500px] scrollbar-hide pb-2">
          {allImages.map((img, idx) => (
            <button
              key={`desktop-thumb-${idx}`}
              onClick={() => setSelectedImage(idx)}
              className={`relative rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                selectedImage === idx
                  ? 'border-amber-500 shadow-lg opacity-100'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={`${img_url}/${img}`}
                alt={`thumb ${idx + 1}`}
                className="w-full aspect-square object-cover mix-blend-multiply"
              />
            </button>
          ))}
        </div>

        {/* Main image with hover zoom */}
        <div className="flex-1 bg-white rounded-2xl overflow-hidden group shadow-md">
          <div className="relative overflow-hidden w-full aspect-square">
            <img
              src={`${img_url}/${allImages[selectedImage]}`}
              alt={productData.title || 'Product'}
              className="w-full h-full object-contain p-4 mix-blend-multiply transition-transform duration-500 group-hover:scale-150 cursor-zoom-in"
            />
          </div>
        </div>
      </div>

      {/* ------------------------------------------- */}
      {/* MOBILE VIEW: Visible below md breakpoint    */}
      {/* ------------------------------------------- */}
      <div className="flex flex-col gap-3 md:hidden">
        {/* Main Swiper */}
        <Swiper
          spaceBetween={12}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true, dynamicBullets: true }}
          // Ensure Swiper only connects if thumbsSwiper is fully initialized
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[Pagination, Thumbs]}
          className="rounded-2xl shadow-md bg-white w-full"
        >
          {allImages.map((img, idx) => (
            <SwiperSlide key={`mobile-main-${idx}`}>
              <div className="aspect-square bg-white">
                <img
                  src={`${img_url}/${img}`}
                  alt={`slide ${idx + 1}`}
                  className="w-full h-full object-contain p-3 mix-blend-multiply"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnail strip */}
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView="auto"
          watchSlidesProgress={true}
          modules={[Thumbs]}
          className="thumbnail-swiper w-full"
        >
          {allImages.map((img, idx) => (
            <SwiperSlide 
              key={`mobile-thumb-${idx}`} 
              style={{ width: '70px' }}
              // Uses Tailwind arbitrary variants to target Swiper's active thumb class
              className="[&.swiper-slide-thumb-active>div]:border-amber-500 [&.swiper-slide-thumb-active>div]:opacity-100 [&.swiper-slide-thumb-active>div]:shadow-md"
            >
              <div className="rounded-xl overflow-hidden border-2 border-transparent opacity-60 transition-all cursor-pointer">
                <img
                  src={`${img_url}/${img}`}
                  alt={`thumb ${idx + 1}`}
                  className="w-full aspect-square object-cover p-1 mix-blend-multiply"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>


     
    </div>
  );
};

export default ProductGallery;