import React from 'react';
import Link from 'next/link';
import { HiArrowRight } from "react-icons/hi";

import axios from 'axios';
import { base_url,img_url } from '../components/urls';

const BlogSection = async () => {

  const response = await axios.get(`${base_url}/blog/get`);
  const { data } = response.data;

  return (
    <section className="py-10 bg-gradient-to-b from-white via-stone-50 to-white border-b border-stone-200">
      
    

      <div className="container mx-auto px-4 ">
        
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {data?.map((article) => (
            
            <Link 
            href={`/blog/${article.slug}`}
              key={article._id}
              className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-700 hover:-translate-y-2"
            >

              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={`${img_url}/${article.image}`} 
                  alt={article.title}
                  className="w-full h-full object-cover transition duration-[1200ms] ease-out group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition duration-700" />

                {/* Category */}
                <div className="absolute top-5 left-5 px-3 py-1 text-[10px] tracking-[0.2em] uppercase bg-white/90 backdrop-blur-md text-black rounded-full shadow-sm">
                  {article.type}
                </div>

                {/* Title on Image (premium feel) */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl md:text-2xl font-serif text-white leading-tight tracking-wide group-hover:underline">
                    <Link href={`/blog/${article.slug}`} className='cursor-pointer'>
                      {article.title}
                    </Link>
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-7 flex flex-col flex-grow bg-white">

                <p className="text-[11px] tracking-[0.25em] text-stone-400 uppercase mb-4">
                  {article.date || "Editorial"}
                </p>

                <p className="text-stone-600 text-sm leading-relaxed mb-8 flex-grow">
                  {article.shortdes}
                </p>

                {/* Read More */}
                <Link 
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-2 text-xs tracking-[0.2em] font-semibold text-stone-900 group-hover:text-black transition"
                >
                  Read Article
                  <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

              </div>

              {/* Border Glow */}
              <div className="absolute inset-0 rounded-2xl border border-stone-200 group-hover:border-black/30 transition duration-500" />

            </Link>
          ))}
        </div>

      

      </div>
    </section>
  );
};

export default BlogSection;