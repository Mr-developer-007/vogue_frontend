import React from 'react';
import { FiFeather, FiAward, FiTag, FiHeart } from 'react-icons/fi';

export default function AboutUs() {
  return (
    <div className="bg-neutral-50 min-h-screen text-neutral-800 font-sans selection:bg-neutral-900 selection:text-white">
      
      {/* Hero Section */}
      <section className="bg-neutral-950 text-white py-24 px-6 sm:px-12 lg:px-24 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h4 className="uppercase tracking-[0.2em] text-sm text-neutral-400 font-semibold">
            About The Vogue Wardrobe
          </h4>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight">
            More Than Just a T-Shirt. <br className="hidden md:block" />
            <span className="font-semibold italic">It&apos;s a Feeling.</span>
          </h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center space-y-6 text-lg text-neutral-600 leading-relaxed">
        <p>
          At <strong className="text-neutral-900 font-semibold">The Vogue Wardrobe</strong>, we believe looking premium shouldn&apos;t come with a premium price tag.
        </p>
        <p>
          We started with a simple thought: Why should comfort, quality, and style be limited to expensive brands? Every day, people spend thousands on clothing hoping to get that perfect fit, luxurious feel, and confidence boost. We wanted to change that.
        </p>
        <p>
          That&apos;s why we created The Vogue Wardrobe — a brand focused on delivering premium-quality polo t-shirts that feel luxurious, look stylish, and remain affordable for everyone.
        </p>
      </section>

      {/* Vision & Mission Grid */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
        <div className="bg-white p-10 md:p-14 rounded-2xl shadow-[0_4px_40px_-15px_rgba(0,0,0,0.05)] border border-neutral-100">
          <h2 className="text-2xl font-semibold mb-4 text-neutral-900">Our Vision</h2>
          <p className="text-xl font-medium text-neutral-700 mb-4">
            To make premium fashion accessible to every wardrobe.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            We envision a world where people don&apos;t have to choose between quality and affordability. Our goal is to create clothing that delivers the same confidence, comfort, and sophistication often associated with luxury brands—without the luxury price tag.
          </p>
        </div>

        <div className="bg-white p-10 md:p-14 rounded-2xl shadow-[0_4px_40px_-15px_rgba(0,0,0,0.05)] border border-neutral-100">
          <h2 className="text-2xl font-semibold mb-4 text-neutral-900">Our Mission</h2>
          <p className="text-xl font-medium text-neutral-700 mb-4">
            To provide premium-quality apparel that feels luxurious, fits perfectly, and remains affordable for everyday wear.
          </p>
          <p className="text-neutral-600 leading-relaxed">
            From fabric selection to stitching and finishing, every detail is carefully considered to ensure you receive exceptional value without compromising on comfort or style.
          </p>
        </div>
      </section>

      {/* The Vogue Experience */}
      <section className="bg-neutral-900 text-neutral-100 py-20 px-6 mt-12">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold text-white">The Vogue Experience</h2>
            <p className="text-lg text-neutral-400">We often hear the same thing from our customers:</p>
            <blockquote className="text-2xl md:text-3xl font-light italic text-white py-6">
              &quot;The moment I wore it, I felt the difference.&quot;
            </blockquote>
            <p className="text-neutral-400">That&apos;s exactly what we strive for.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
            <div className="border-l-2 border-neutral-700 pl-4">
              <span className="block text-sm text-neutral-400 uppercase tracking-wider mb-1">Step 01</span>
              <p className="text-white font-medium">The first touch should feel soft.</p>
            </div>
            <div className="border-l-2 border-neutral-700 pl-4">
              <span className="block text-sm text-neutral-400 uppercase tracking-wider mb-1">Step 02</span>
              <p className="text-white font-medium">The first wear should feel comfortable.</p>
            </div>
            <div className="border-l-2 border-neutral-700 pl-4">
              <span className="block text-sm text-neutral-400 uppercase tracking-wider mb-1">Step 03</span>
              <p className="text-white font-medium">The first look should feel confident.</p>
            </div>
          </div>

          <p className="max-w-2xl mx-auto text-neutral-400 leading-relaxed pt-8">
            Our polo t-shirts are designed to make you feel effortlessly stylish while staying comfortable throughout your day. Whether you&apos;re heading to work, meeting friends, traveling, or simply relaxing, we want our clothing to become the piece you reach for again and again.
          </p>
        </div>
      </section>

      {/* What Makes Us Different? */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900">What Makes Us Different?</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="text-center group">
            <div className="w-16 h-16 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
              <FiFeather className="w-7 h-7 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-neutral-900">Premium Fabric</h3>
            <p className="text-neutral-600">Carefully selected fabrics that offer softness, breathability, durability, and all-day comfort.</p>
          </div>

          {/* Feature 2 */}
          <div className="text-center group">
            <div className="w-16 h-16 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
              <FiAward className="w-7 h-7 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-neutral-900">Luxury Feel</h3>
            <p className="text-neutral-600">Designed to deliver a premium look and feel that rivals high-end brands.</p>
          </div>

          {/* Feature 3 */}
          <div className="text-center group">
            <div className="w-16 h-16 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
              <FiTag className="w-7 h-7 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-neutral-900">Affordable Pricing</h3>
            <p className="text-neutral-600">Luxury-inspired fashion without the unnecessary markups.</p>
          </div>

          {/* Feature 4 */}
          <div className="text-center group">
            <div className="w-16 h-16 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-300">
              <FiHeart className="w-7 h-7 text-neutral-700 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-neutral-900">Everyday Confidence</h3>
            <p className="text-neutral-600">Because great clothing isn&apos;t just about how it looks—it&apos;s about how it makes you feel.</p>
          </div>
        </div>
      </section>

      {/* Our Promise / Outro */}
      <section className="bg-neutral-100 py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-semibold text-neutral-900">Our Promise</h2>
          <p className="text-lg text-neutral-700 leading-relaxed">
            At The Vogue Wardrobe, we&apos;re not just selling t-shirts. We&apos;re creating everyday essentials that help people look better, feel more confident, and experience premium comfort without overspending.
          </p>
          <p className="text-xl font-medium text-neutral-900 pt-4">
            Because we believe everyone deserves a touch of luxury—every single day.
          </p>
          
          <div className="pt-12 border-t border-neutral-300 mt-12">
            <h3 className="text-2xl font-semibold text-neutral-900 mb-2">Welcome to The Vogue Wardrobe.</h3>
            <p className="text-neutral-600 uppercase tracking-[0.15em] text-sm font-medium">
              Premium Comfort &bull; Timeless Style &bull; Affordable Luxury
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}