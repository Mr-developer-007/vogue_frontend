'use client'; 

import React, { useRef } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { motion, useInView } from 'framer-motion';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Icons & Components
import { HiArrowNarrowRight } from "react-icons/hi";
import TagLineCompo from './TagLineCompo';
import { img_url } from './urls';

/* --- Configurations --- */
const SWIPER_BREAKPOINTS = {
  320: { slidesPerView: 1.5, spaceBetween: 16 },
  480: { slidesPerView: 2, spaceBetween: 20 },
  768: { slidesPerView: 3, spaceBetween: 24 },
  1024: { slidesPerView: 4, spaceBetween: 30 },
  1280: { slidesPerView: 5, spaceBetween: 30 },
};

const Category = () => {
  const { categories, loading } = useSelector((state) => state.category);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // --- Loading State (Skeleton) ---
  if (loading) {
    return (
      <div className="py-10 bg-[#fafafa]">
        <div className="container mx-auto px-4 lg:px-8">
          <TagLineCompo tag="Curated Collections" heading="Shop by Category" />
          
          <div className="flex gap-6 overflow-hidden mt-12">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full min-w-[200px] md:min-w-[250px] flex flex-col gap-4 animate-pulse">
                <div className="w-full aspect-[4/5] bg-stone-200 rounded-sm" />
                <div className="w-3/4 h-4 bg-stone-200 mx-auto rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- Main Content ---
  return (
    <section
      ref={sectionRef}
      className="relative py-10 bg-[#fafafa] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-stone-200/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        <TagLineCompo tag="Curated Collections" heading="Shop by Category" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 mt-12 relative z-10">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          breakpoints={SWIPER_BREAKPOINTS}
          spaceBetween={24}
          loop={categories?.length > 4}
          speed={1000}
          autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={true}
          className="category-swiper !pb-16"
        >
          {categories?.map((cat, index) => (
            <SwiperSlide key={cat._id}>
              <div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              >
                <Link
                  href={`/products?category=${cat._id}`}
                  className="group flex flex-col items-center cursor-pointer outline-none"
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-stone-100 rounded-sm mb-5">
                    <img
                      src={`${img_url}/${cat.image}`}
                      alt={cat.title}
                      className="w-full h-full object-cover transform transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-500 ease-out group-hover:bg-black/10" />
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex flex-col items-center text-center w-full px-2">
                    <h3 className="text-sm md:text-base font-serif tracking-[0.15em] uppercase text-stone-900 transition-colors duration-300 group-hover:text-amber-700">
                      {cat.title}
                    </h3>
                    
                    {/* Hover 'Explore' Link */}
                    <div className="h-6 mt-1 overflow-hidden flex items-center justify-center">
                      <span className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-stone-500 transform translate-y-full opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                        Explore <HiArrowNarrowRight className="text-amber-600" />
                      </span>
                    </div>

                    {/* Animated Underline */}
                    <div className="h-[1px] w-0 bg-amber-600 mt-2 transition-all duration-500 ease-out group-hover:w-12" />
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Swiper Custom Styles */}
      {/* <style jsx global>{`
        .category-swiper .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: #a8a29e;
          opacity: 0.4;
          transition: all 0.4s ease;
        }
        
        .category-swiper .swiper-pagination-bullet-active {
          width: 20px;
          background: #292524;
          opacity: 1;
          border-radius: 4px;
        }
        
        .category-swiper .swiper-button-prev,
        .category-swiper .swiper-button-next {
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(4px);
          border: 1px solid #e7e5e4;
          border-radius: 50%;
          color: #292524;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .category-swiper .swiper-button-prev:after,
        .category-swiper .swiper-button-next:after {
          font-size: 16px;
        }
        
        .category-swiper .swiper-button-prev:hover,
        .category-swiper .swiper-button-next:hover {
          background: #292524;
          color: #ffffff;
          border-color: #292524;
          transform: scale(1.05);
        }
        
        @media (max-width: 1024px) {
          .category-swiper .swiper-button-prev,
          .category-swiper .swiper-button-next {
            display: none !important;
          }
        }
      `}</style> */}
    </section>
  );
};

export default Category;