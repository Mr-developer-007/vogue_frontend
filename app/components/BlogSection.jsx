'use client';

import React from 'react';
import Link from 'next/link';
import { HiArrowRight } from "react-icons/hi";
import TagLineCompo from './TagLineCompo'; // Assuming this is in the same directory

const BlogSection = () => {
  // Mock Data tailored for a Streetwear / Premium T-shirt brand
  const articles = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1615&auto=format&fit=crop",
      category: "Fabric & Fit",
      date: "Mar 12, 2026",
      title: "The Heavyweight Era: Why 240 GSM Matters",
      excerpt: "Dive into the anatomy of the perfect t-shirt. Discover why thicker, heavier combed cotton creates a drape and durability that standard tees simply can't match.",
      slug: "/blog/heavyweight-era-240-gsm"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1620&auto=format&fit=crop",
      category: "Style Guide",
      date: "Feb 28, 2026",
      title: "Mastering the Oversized Silhouette",
      excerpt: "Oversized isn't just about sizing up. Learn how to style drop shoulders and boxy fits for a clean, intentional streetwear aesthetic this season.",
      slug: "/blog/mastering-oversized-silhouette"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1587&auto=format&fit=crop",
      category: "Behind The Drop",
      date: "Feb 15, 2026",
      title: "Inside the Studio: The Acid Wash Process",
      excerpt: "Take an exclusive look behind the scenes. See how our artisans individually garment-wash each piece to achieve that perfect vintage fade without compromising the fabric.",
      slug: "/blog/inside-studio-acid-wash"
    }
  ];

  return (
    <section className="py-24 bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900 border-b border-gray-100">
      
      {/* Section Header using your updated TagLineCompo */}
      <TagLineCompo 
        tag="The Journal" 
        heading="Culture & Editorials" 
      />

      <div className="max-w-7xl mx-auto px-4 mt-12">
        
        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div 
              key={article.id} 
              className="group flex flex-col bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-indigo-600 hover:shadow-xl hover:shadow-indigo-600/10 transition-all duration-300"
            >
              
              {/* Image Container with Zoom effect */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Floating Category Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-sm">
                  {article.category}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  {article.date}
                </p>
                
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-wide leading-tight mb-4 group-hover:text-indigo-600 transition-colors duration-300">
                  <Link href={article.slug}>
                    {article.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 text-sm font-medium leading-relaxed mb-8 flex-grow">
                  {article.excerpt}
                </p>
                
                {/* Read More Link */}
                <div className="mt-auto">
                  <Link 
                    href={article.slug} 
                    className="inline-flex items-center gap-2 text-xs font-black text-gray-900 uppercase tracking-widest group-hover:text-indigo-600 transition-colors"
                  >
                    Read Article 
                    <HiArrowRight className="transform group-hover:translate-x-1 transition-transform" size={16} />
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Link 
            href="/blog" 
            className="inline-flex items-center justify-center gap-3 bg-gray-50 text-gray-900 border-2 border-gray-200 px-8 py-4 text-sm font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-600/30 transition-all duration-300 rounded-xl"
          >
            View All Editorials <HiArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default BlogSection;