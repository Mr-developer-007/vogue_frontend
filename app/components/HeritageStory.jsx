"use client"

import React from 'react';

import Link from 'next/link';

import { HiArrowRight, HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineSun } from "react-icons/hi";



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

src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop"

alt="Premium streetwear"

className="object-cover w-full h-full transition-transform duration-1000 hover:scale-110"

/>

</div>


{/* Secondary Detail Image */}

<div className="absolute bottom-4 right-0 w-1/2 h-1/2 z-20 border-[12px] border-white shadow-2xl rounded-3xl overflow-hidden hidden md:block">

<img

src="https://images.unsplash.com/photo-1618354691229-88d47f285158?q=80&w=1915&auto=format&fit=crop"

alt="Fabric detail"

className="w-full h-full object-cover"

/>

</div>



{/* Exclusive Badge (From Note: "Not easily available") */}

<div className="absolute top-10 right-4 z-30 bg-white/90 backdrop-blur-md border border-indigo-100 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow">

<div className="bg-indigo-600 p-2 rounded-lg text-white">

<HiOutlineShieldCheck size={20} />

</div>

<div>

<p className="text-[10px] uppercase tracking-tighter font-bold text-indigo-600">Availability</p>

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

The Collection

</div>

<h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-[1.1] mb-6 tracking-tight">

Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Comfort</span>, Built for the Streets.

</h2>

<p className="text-gray-600 text-lg leading-relaxed">

We don't just make clothes; we source textiles that are <strong>not easily available in the market</strong>. Experience a unique stretchable fit that holds its shape wash after wash.

</p>

</header>



{/* Feature Grid (Incorporating "Good Points" from Note) */}

<div className="grid grid-cols-2 gap-6 mb-10">

<div className="group">

<div className="flex items-center gap-3 mb-2">

<div className="text-indigo-600 group-hover:scale-110 transition-transform"><HiOutlineSparkles size={22} /></div>

<h4 className="font-bold text-gray-900">Bubble-Free</h4>

</div>

<p className="text-sm text-gray-500">Anti-pilling technology keeps the surface smooth forever.</p>

</div>

<div className="group">

<div className="flex items-center gap-3 mb-2">

<div className="text-indigo-600 group-hover:scale-110 transition-transform"><HiOutlineShieldCheck size={22} /></div>

<h4 className="font-bold text-gray-900">Versatile Looks</h4>

</div>

<p className="text-sm text-gray-500">Minimalist design that transitions from gym to gala.</p>

</div>

<div className="group">

<div className="flex items-center gap-3 mb-2">

<div className="text-indigo-600 group-hover:scale-110 transition-transform"><HiOutlineSparkles size={22} /></div>

<h4 className="font-bold text-gray-900">Comfort Feel</h4>

</div>

<p className="text-sm text-gray-500">Buttery soft 240 GSM combed cotton against your skin.</p>

</div>

<div className="group">

<div className="flex items-center gap-3 mb-2">

<div className="text-indigo-600 group-hover:scale-110 transition-transform"><HiOutlineSparkles size={22} /></div>

<h4 className="font-bold text-gray-900">Stretchable</h4>

</div>

<p className="text-sm text-gray-500">Premium fabric memory for ultimate freedom of movement.</p>

</div>

</div>



{/* Care Instruction (The "Never Do That" Section) */}

<div className="mb-10 p-5 bg-amber-50/50 border border-amber-100 rounded-2xl flex gap-4 items-start">

<div className="bg-amber-100 p-2 rounded-lg text-amber-700 mt-1">

<HiOutlineSun size={20} />

</div>

<div>

<p className="text-xs font-black uppercase tracking-widest text-amber-800 mb-1">Pro Care Tip</p>

<p className="text-sm text-amber-900/80 leading-snug">

To preserve fabric integrity, <strong>never dry in direct sunlight</strong> right after washing—especially in harsh sun.

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

<p className="text-2xl font-black text-gray-900">240</p>

<p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">GSM Weight</p>

</div>

<div className="w-px h-8 bg-gray-200"></div>

<div>

<p className="text-2xl font-black text-gray-900">100%</p>

<p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Stretch Memory</p>

</div>

</div>

</div>



</div>

</div>

</div>



{/* Adding custom animation to Tailwind config would be needed for 'bounce-slow' */}

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