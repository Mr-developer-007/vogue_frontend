'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import TagLineCompo from './TagLineCompo';
import { HiArrowRight } from "react-icons/hi";
import axios from 'axios';
import { base_url, img_url } from './urls';

const OurCollection = () => {
  const [allCollection, setAllCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCollection = async () => {
    try {
      const response = await axios.get(`${base_url}/collection/getcollection`);
      const data = await response.data;
      if (data.success) {
        setAllCollection(data.data);
      } else {
        setAllCollection([]);
      }
    } catch (error) {
      setAllCollection([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollection();
  }, []);

  return (
    <section className="py-24 bg-[#fafafa] relative overflow-hidden">
      
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-stone-200/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10">
        <TagLineCompo 
          tag="Explore India"
          heading="Regional Treasures"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 mt-16 relative z-10">

        {loading ? (
          /* Premium Loading Skeleton */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full aspect-[4/5] bg-stone-200 animate-pulse rounded-sm"></div>
            ))}
          </div>
        ) : (
          allCollection.length > 0 && (
            /* ================= Grid ================= */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {allCollection.map((item) => (
                <Link
                  key={item._id}
                  href={`/${item.slug || item._id}`} // Fixed dynamic href interpolation
                  className="group block w-full relative overflow-hidden rounded-sm bg-stone-100"
                >
                  <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] overflow-hidden">
                    
                    {/* Image with slow, cinematic zoom */}
                    <img
                      src={`${img_url}/${item.image}`}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                    />

                    {/* Rich Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700 ease-in-out"></div>

                    {/* Content Container */}
                    <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end items-center text-center">
                      
                      {/* Animated Color Accent Bar */}
                      <span 
                        className="block h-[2px] mb-6 rounded-full transition-all duration-700 ease-out w-8 group-hover:w-20" 
                        style={{ backgroundColor: item.color || '#e5e5e5' }} 
                      />

                      {/* Title */}
                      <h3 className="text-3xl lg:text-4xl font-serif text-white tracking-wide mb-3 transform transition-transform duration-700 ease-out group-hover:-translate-y-2">
                        {item.title}
                      </h3>

                      {/* Subtitle / Description */}
                      <p className="text-stone-300 text-xs md:text-sm tracking-[0.2em] uppercase mb-0 transform transition-all duration-700 ease-out group-hover:-translate-y-2 group-hover:text-white">
                        {item.des}
                      </p>

                      {/* Editorial Style "View Collection" Link */}
                      <div className="overflow-hidden mt-6">
                        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-white font-semibold transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 border-b border-transparent group-hover:border-white pb-1">
                          View Collection <HiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>

                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default OurCollection;