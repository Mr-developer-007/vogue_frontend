"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HiArrowRight,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineSun,
  HiOutlineCloud,
  HiOutlineBriefcase,
  HiOutlineArrowsExpand,
} from "react-icons/hi";

const BrandStory = () => {
  return (
    <section className="relative py-28 md:py-36  overflow-hidden font-sans selection:bg-amber-900/50 selection:text-amber-100">
      {/* Subtle radial glow in the center for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/20 via-transparent to-transparent pointer-events-none" />

      {/* Very faint, sophisticated damask/gold pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3E%3Cpath fill='none' stroke='%23C7A353' stroke-width='0.5' d='M0 400 L800 400 M400 0 L400 800 M200 200 L600 600 M200 600 L600 200' /%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "80px",
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 ">
          
          {/* 1. Visual Composition – High-End Editorial Style */}
          <div className="w-full  relative">
            <div className="relative h-[500px] md:h-[650px] w-full">
              {/* Outer architectural accent frame */}
              <div className="absolute -inset-4 border border-neutral-800/60 rounded-sm pointer-events-none hidden md:block" />

              {/* Main Image */}
              <div className=" top-0 left-0 w-[80%] h-[85%] z-10 shadow-2xl bg-neutral-900 border border-neutral-800 group overflow-hidden">
                <Image
                  src="/siteimages/t1.webp"
                  alt="Vogue Wardrobe Premium Streetwear"
                  fill
                  // sizes="(max-width: 768px) 85vw, 40vw"
                  className="object-center object-contain  "
                  priority
                />
                {/* Cinematic shadow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              </div>

              {/* Secondary Detail Image – Matted Gallery Style */}
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 z-20  p-2 md:p-3 border border-neutral-800 shadow-2xl md:block hidden">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/siteimages/t2.webp"
                    alt="Fabric detail"
                    fill
                    sizes="(max-width: 1024px) 0vw, 25vw"
                    className="object-cover transition-transform duration-1000 hover:scale-110"
                  />
                </div>
              </div>

             
            </div>
          </div>

          {/* 2. Content Section – Stark, high-contrast typography */}
          <div className="w-full  ">
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-10 bg-amber-500/50" />
                <span className="text-[10px] font-medium tracking-[0.3em] text-amber-500/80 uppercase">
                  Vogue Wardrobe
                </span>
              </div>

              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-tight">
                Engineered for <span className="italic text-amber-500">Comfort.</span>
                <br />
                <span className="">Styled for Life.</span>
              </h2>

              <p className="text-neutral-400 text-lg leading-relaxed mt-8 font-light max-w-lg">
                Crafted using our signature{" "}
                <strong className=" font-normal">
                  Cotton, Matty, and Lycra blend
                </strong>
                . This premium 230 GSM fabric offers an unparalleled balance of
                durability and a rich, structured feel reserved for the finest wardrobes.
              </p>
            </header>

            {/* Feature Grid – Minimalist lines */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 mb-14">
              {[
                {
                  icon: HiOutlineSparkles,
                  title: "Bubble-Free Finish",
                  desc: "Pristine look maintained through countless washes, ensuring zero pilling.",
                },
                {
                  icon: HiOutlineBriefcase,
                  title: "Versatile Elegance",
                  desc: "Effortlessly transitions between relaxed casual and semi-formal settings.",
                },
                {
                  icon: HiOutlineCloud,
                  title: "All-Day Comfort",
                  desc: "Exceptionally soft, breathable architecture for uncompromising daily wear.",
                },
                {
                  icon: HiOutlineArrowsExpand,
                  title: "Tailored Stretch",
                  desc: "Engineered flexibility that honors and maintains its structural silhouette.",
                },
              ].map((feature, idx) => (
                <div key={idx} className="group border-t border-neutral-800 pt-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-amber-500/70 transition-colors duration-300 group-hover:text-amber-400">
                      <feature.icon size={20} />
                    </div>
                    <h4 className="font-serif text-lg  tracking-wide">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-neutral-500 text-sm leading-relaxed font-light pr-4">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Care Instruction – Museum block style */}
            <div className="mb-14 border-l border-amber-500/50 pl-6 py-1">
              <div className="flex items-center gap-2 mb-3">
                <HiOutlineSun size={16} className="text-amber-500/80" />
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-300">
                  Artisan Care Instructions
                </p>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed font-light max-w-md">
                To preserve structural integrity, <span className="">avoid direct sunlight</span>. 
                Shade drying is highly recommended to maintain its premium grade and bespoke fit.
              </p>
            </div>

            {/* CTA & Stats */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-12">
              <Link
                href="/about"
                className="group relative inline-flex items-center justify-center gap-4 border border-amber-500/40 bg-transparent text-amber-500 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-amber-500 hover:text-black transition-all duration-500"
              >
                <span>Discover the Fabric</span>
                <HiArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={16}
                />
              </Link>

              <div className="flex items-center gap-8">
                <div>
                  <p className="text-3xl font-serif  mb-1">230</p>
                  <p className="text-[9px] text-neutral-500 uppercase tracking-[0.2em]">
                    GSM Weight
                  </p>
                </div>
                <div className="w-px h-10 bg-neutral-800" />
                <div>
                  <p className="text-3xl font-serif  italic mb-1">
                    Lycra
                  </p>
                  <p className="text-[9px] text-neutral-500 uppercase tracking-[0.2em]">
                    Premium Blend
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;