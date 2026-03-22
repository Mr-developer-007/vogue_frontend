import React from 'react';
import Link from 'next/link';
import { HiArrowRight } from "react-icons/hi";

const BrandStory = () => {
  return (
    <section className="py-20 bg-white overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* 1. The Image Grid (Colorful & Modern) */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative h-[450px] md:h-[550px] w-full">
              
              {/* Decorative Indigo Accent Box */}
              <div className="absolute top-8 -left-4 md:-left-8 w-full h-full border-2 border-indigo-100 rounded-2xl z-0"></div>

              {/* Main Image (Streetwear Lifestyle) */}
              <div className="absolute top-0 left-0 w-4/5 h-4/5 z-10 shadow-lg rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop" 
                  alt="Model wearing premium blank t-shirt"
                  className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                />
              </div>
              
              {/* Secondary Image (Apparel Detail / Stack of Tees) */}
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 z-20 border-8 border-white bg-gray-50 shadow-xl rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1618354691229-88d47f285158?q=80&w=1915&auto=format&fit=crop" 
                  alt="Stack of folded colorful t-shirts"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* 2. The Story Content */}
          <div className="w-full lg:w-1/2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold tracking-widest uppercase mb-6 border border-indigo-100 rounded-md">
              Designed For The Streets
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
              Crafting the <span className="italic text-indigo-600 font-medium">Perfect</span> Everyday Tee
            </h2>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
              Not all cotton is created equal. We obsessed over every detail—from the heavyweight, preshrunk fabric to the drop-shoulder seams—to bring you a fit that feels custom-made.
            </p>
            
            <p className="text-gray-500 text-sm mb-10 leading-relaxed">
              We believe in creating high-quality, durable streetwear that doesn't fade after one wash. When you wear our collection, you're wearing premium craftsmanship designed for everyday life.
            </p>

            <div className="flex flex-wrap items-center gap-8">
              <Link href="/about" className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-3.5 text-sm font-bold uppercase tracking-wide hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30 transition-all duration-300 rounded-lg">
                Our Fabric Story <HiArrowRight size={18} />
              </Link>
              
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-2xl font-black text-gray-900">100%</p>
                  <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest mt-1">Combed Cotton</p>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div>
                  <p className="text-2xl font-black text-gray-900">240</p>
                  <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest mt-1">GSM Premium</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default BrandStory;