'use client'; // Required for Swiper

import React from 'react';
import TagLineCompo from './TagLineCompo';
import { HiStar, HiCheckCircle } from "react-icons/hi";
import { FaQuoteLeft } from "react-icons/fa";

// 1. Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// 2. Swiper CSS
import 'swiper/css';
import 'swiper/css/pagination';

const HappyClients = () => {

  const reviews = [
    {
      id: 1,
      name: "Simran Kaur",
      location: "Chandigarh",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
      rating: 5,
      date: "2 days ago",
      text: "The Phulkari dupatta I ordered is absolutely stunning! The colors are so vibrant, exactly like the photos. It feels like I'm wearing a piece of home. Highly recommend!"
    },
    {
      id: 2,
      name: "Priya Sharma",
      location: "Mumbai",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
      rating: 5,
      date: "1 week ago",
      text: "I was skeptical about ordering a heavy Lehenga online, but the fitting was perfect. The velvet fabric quality is premium and the embroidery is intricate. Will shop again."
    },
    {
      id: 3,
      name: "Anjali Mehta",
      location: "New Delhi",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
      rating: 4.5,
      date: "3 weeks ago",
      text: "Beautiful collection of oxidized jewelry. The necklace set adds such a royal touch to my simple sarees. Delivery was super fast to Delhi."
    },
    {
      id: 4,
      name: "Riya Kapoor",
      location: "Bangalore",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1887&auto=format&fit=crop",
      rating: 5,
      date: "1 month ago",
      text: "The fabric quality of the silk saree is top-notch. It drapes beautifully and the sheen is very elegant. Packaging was eco-friendly too!"
    },
    {
      id: 5,
      name: "Sneha Patel",
      location: "Ahmedabad",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop",
      rating: 5,
      date: "2 months ago",
      text: "Authentic Bandhani print! I gifted this to my mother and she absolutely loved it. The customer service team was very helpful with tracking."
    }
  ];

  return (
    <div className="py-20 bg-stone-50 border-b border-stone-200">
      

      <TagLineCompo 
        tag="Love from Customers"
        heading="Happy Clients"
      />

      <div className="container mx-auto px-4  mt-12">
        
        {/* 3. SWIPER COMPONENT */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          speed={1000}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 }, // Mobile
            768: { slidesPerView: 2 }, // Tablet
            1024: { slidesPerView: 3 }, // Desktop
          }}
          // Customizing Swiper Colors via CSS variables to match Rose-700
          style={{
            "--swiper-pagination-color": "#be123c", // rose-700
            "--swiper-pagination-bullet-inactive-color": "#a8a29e", // stone-400
            "--swiper-pagination-bullet-inactive-opacity": "0.5",
            "--swiper-pagination-bullet-size": "10px",
            "--swiper-pagination-bullet-horizontal-gap": "6px",
            paddingBottom: "50px" // Space for dots
          }}
          className="pb-12"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className="h-auto pb-4"> {/* pb-4 creates space for shadow */}
              
              <div 
                className="relative h-full bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:border-rose-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
              >
                
                <div>
                  {/* Decorative Quote Icon */}
                  <div className="absolute top-6 right-8 text-stone-100 group-hover:text-rose-50 transition-colors duration-300">
                    <FaQuoteLeft size={50} />
                  </div>

                  {/* Stars */}
                  <div className="relative z-10 flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <HiStar 
                        key={i} 
                        className={i < Math.floor(review.rating) ? "text-amber-500" : "text-stone-200"} 
                        size={18} 
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="relative z-10 text-stone-600 leading-relaxed mb-8 italic text-sm md:text-base">
                    "{review.text}"
                  </p>
                </div>

                {/* User Profile */}
                <div className="relative z-10 flex items-center gap-4 border-t border-stone-100 pt-6 mt-auto">
                  
                  {/* Avatar */}
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div>
                    <h4 className="font-serif text-stone-900 font-medium text-lg leading-none mb-1">
                      {review.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-stone-400">{review.location}</p>
                      <span className="text-stone-300">•</span>
                      {/* Verified Badge */}
                      <span className="flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        <HiCheckCircle size={12} /> Verified
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Bottom Trust Summary */}
        <div className="mt-8 text-center border-t border-stone-200 pt-8">
          <p className="text-stone-500 font-medium">
            Rated <span className="text-stone-900 font-bold text-lg">4.8/5</span> based on <span className="underline decoration-rose-700 underline-offset-4 decoration-2">1,200+ Reviews</span>
          </p>
        </div>

      </div>
    </div>
  )
}

export default HappyClients;