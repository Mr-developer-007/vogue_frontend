"use client"
import React from 'react';
import Link from 'next/link';
import { 
  HiArrowRight, 
  HiOutlineShieldCheck, 
  HiOutlineSparkles, 
  HiOutlineSun,
  HiOutlineCloud,
  HiOutlineBriefcase,
  HiOutlineArrowsExpand
} from "react-icons/hi";

const BrandStory = () => {
  return (
    <section className="py-24 bg-[#fafafa] overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* 1. Visual Composition */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative h-[500px] md:h-[650px] w-full">
              {/* Floating Background Element */}
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-60 animate-pulse"></div>

              {/* Main Image */}
              <div className="absolute top-0 left-0 w-[85%] h-[80%] z-10 shadow-2xl rounded-3xl overflow-hidden border border-white/50">
                <img
                  src="/siteimages/t1.webp"
                  alt="Vogue Wardrobe Premium Streetwear"
                  className="object-cover  object-top-left  w-full h-full transition-transform duration-1000 hover:scale-110"
                />
              </div>

              {/* Secondary Detail Image */}
              <div className="absolute bottom-4 right-0 w-1/2 h-1/2 z-20 border-[12px] border-white shadow-2xl rounded-3xl overflow-hidden hidden md:block">
                <img
                  src="/siteimages/t2.webp"
                  alt="Fabric detail"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Exclusive Badge */}
              <div className="absolute top-10 right-4 z-30 bg-white/90 backdrop-blur-md border border-indigo-100 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow">
                <div className="bg-indigo-600 p-2 rounded-lg text-white">
                  <HiOutlineShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-tighter font-bold text-indigo-600">Exclusive Quality</p>
                  <p className="text-sm font-bold text-gray-900">Rare Market Fabric</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Content Section */}
          <div className="w-full lg:w-1/2">
            <header className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-indigo-600 text-[11px] font-bold tracking-[0.2em] uppercase mb-6 border border-indigo-100 rounded-full shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                </span>
                Vogue Wardrobe
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight">
                Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Comfort</span>, Styled for Life.
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Crafted using our signature <strong>Cotton, Matty, and Lycra blend</strong>. This premium 230 GSM fabric is unique, offering a perfect balance of durability and a rich, structured feel that is not easily found elsewhere.
              </p>
            </header>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-indigo-600 group-hover:scale-110 transition-transform"><HiOutlineSparkles size={22} /></div>
                  <h4 className="font-bold text-gray-900">Bubble-Free Finish</h4>
                </div>
                <p className="text-sm text-gray-500">No pilling even after multiple washes, ensuring a consistently clean look.</p>
              </div>
              
              <div className="group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-indigo-600 group-hover:scale-110 transition-transform"><HiOutlineBriefcase size={22} /></div>
                  <h4 className="font-bold text-gray-900">Versatile Look</h4>
                </div>
                <p className="text-sm text-gray-500">Effortlessly transitions to suit both casual and semi-formal styles.</p>
              </div>

              <div className="group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-indigo-600 group-hover:scale-110 transition-transform"><HiOutlineCloud size={22} /></div>
                  <h4 className="font-bold text-gray-900">All-Day Comfort</h4>
                </div>
                <p className="text-sm text-gray-500">Soft, breathable texture designed for maximum comfort throughout the day.</p>
              </div>

              <div className="group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-indigo-600 group-hover:scale-110 transition-transform"><HiOutlineArrowsExpand size={22} /></div>
                  <h4 className="font-bold text-gray-900">Stretchable Fit</h4>
                </div>
                <p className="text-sm text-gray-500">Provides flexibility and ease of movement while maintaining its tailored shape.</p>
              </div>
            </div>

            {/* Care Instruction */}
            <div className="mb-10 p-5 bg-amber-50/50 border border-amber-100 rounded-2xl flex gap-4 items-start">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-700 mt-1">
                <HiOutlineSun size={20} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-amber-800 mb-1">Care Instructions</p>
                <p className="text-sm text-amber-900/80 leading-snug">
                  To preserve fabric integrity, <strong>do not dry in direct sunlight</strong>. Always prefer shade drying to maintain the premium quality and fit.
                </p>
              </div>
            </div>

            {/* CTA & Stats */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <Link href="/about" className="group relative inline-flex items-center justify-center gap-3 bg-gray-900 text-white px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-indigo-600 transition-all duration-500 rounded-full overflow-hidden">
                <span className="relative z-10">Our Fabric Story</span>
                <HiArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" size={18} />
              </Link>

              <div className="flex items-center gap-6 border-l border-gray-200 pl-8">
                <div>
                  <p className="text-2xl font-black text-gray-900">230</p>
                  <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">GSM Weight</p>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div>
                  <p className="text-2xl font-black text-gray-900">Lycra</p>
                  <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Premium Blend</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default BrandStory;