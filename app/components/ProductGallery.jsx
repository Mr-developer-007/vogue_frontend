import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import { img_url } from './urls';

const ProductGallery = ({ productData }) => {
  // State for synchronised thumbnail swiper
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // Combine thumbnail and additional images
  const allImages = [productData.thumbnail, ...productData.images];

  return (
    <div className="w-full">
      {/* ------------------------------------------- */}
      {/* MOBILE VIEW: Main Swiper + Thumbnail Strip  */}
      {/* ------------------------------------------- */}
      <div className="block md:hidden w-full">
        {/* Main Swiper */}
        <Swiper
          modules={[Thumbs, Pagination]}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          pagination={{ clickable: true, dynamicBullets: true }}
          spaceBetween={12}
          slidesPerView={1}
          className="mb-4 rounded-2xl overflow-hidden shadow-lg"
        >
          {allImages.map((img, idx) => (
            <SwiperSlide key={`mobile-main-${idx}`}>
              <div className="bg-white aspect-square">
                <img
                  src={`${img_url}/${img}`}
                  alt={`${productData.title || 'Product'} ${idx + 1}`}
                  className="w-full h-full object-cover p-3 mix-blend-multiply"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnail Strip (synchronised) */}
        <div className="px-2">
          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[Thumbs]}
            spaceBetween={8}
            slidesPerView="auto"
            watchSlidesProgress={true}
            className="thumbnail-swiper"
          >
            {allImages.map((img, idx) => (
              <SwiperSlide
                key={`mobile-thumb-${idx}`}
                style={{ width: '56px', height: '56px' }}
                className="!w-14 !h-14 rounded-xl overflow-hidden border-2 border-transparent opacity-60 transition-all duration-200 hover:opacity-90 [&.swiper-slide-thumb-active]:border-[var(--primary,#3b82f6)] [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:shadow-md"
              >
                <img
                  src={`${img_url}/${img}`}
                  alt={`thumb ${idx + 1}`}
                  className="w-full h-full object-cover p-1 mix-blend-multiply"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* ------------------------------------------- */}
      {/* DESKTOP VIEW: Two-column Grid                */}
      {/* ------------------------------------------- */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 gap-4">
          {allImages.map((img, idx) => (
            <div
              key={`desktop-${idx}`}
              className="overflow-hidden group rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={`${img_url}/${img}`}
                alt={`${productData.title || 'Product'} image ${idx + 1}`}
                className="w-full h-full object-cover p-2 mix-blend-multiply transition-transform duration-300 ease-out group-hover:scale-105 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;