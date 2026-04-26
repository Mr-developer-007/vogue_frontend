'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTiktok,
  FaTwitter,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcApplePay,
  FaYoutube
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { useSelector } from 'react-redux';

const Footer = () => {
  const { categories } = useSelector(state => state.category);

  return (
    <footer className="bg-[#0a0a0a] text-stone-400 font-sans border-t border-white/10 selection:bg-stone-700 selection:text-white">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* 1. Brand & Bio (Spans 4 columns on desktop) */}
          <div className="md:col-span-4 flex flex-col items-start">
            
            {/* Logo - Inverted for Dark Background */}
            <Link href="/" className="inline-block opacity-90 hover:opacity-100 transition-opacity duration-300 mb-6">
               <img 
                src="/logo.webp" 
                alt="Brand Logo" 
                width={160} 
                height={50} 
                className="object-contain brightness-0 invert" 
               />
            </Link>
            
            <p className="text-sm leading-relaxed font-light mb-8 max-w-sm">
              Premium everyday essentials crafted for comfort and built to last. Exceptional fabrics, perfect drops, and timeless silhouettes.
            </p>

            {/* Elegant Social Icons */}
            <div className="flex gap-6 items-center">
              <SocialIcon href="#" icon={<FaInstagram size={18} />} />
              <SocialIcon href="#" icon={<FaYoutube size={18} />} />
              <SocialIcon href="#" icon={<FaTwitter size={18} />} />
              <SocialIcon href="#" icon={<FaFacebookF size={18} />} />
            </div>
          </div>

          {/* 2. Navigation Links (Spans 4 columns on desktop) */}
          <div className="md:col-span-4 flex gap-12 sm:gap-20">
            {/* Shop Links */}
            <div>
              <h4 className="text-white font-serif text-sm mb-6 tracking-[0.15em] uppercase">Shop</h4>
              <ul className="space-y-4">
                {categories?.length > 0 ? (
                  categories.map((item) => (
                    <FooterLink key={item._id} href={`/products?category=${item._id}`}>
                      {item.title}
                    </FooterLink>
                  ))
                ) : (
                  <>
                    <FooterLink href="/products">All Collections</FooterLink>
                    <FooterLink href="/new">New Arrivals</FooterLink>
                  </>
                )}
              </ul>
            </div>

            {/* Help Links */}
            <div>
              <h4 className="text-white font-serif text-sm mb-6 tracking-[0.15em] uppercase">Support</h4>
              <ul className="space-y-4">
                <FooterLink href="/track">Track Order</FooterLink>
                <FooterLink href="/shipping">Shipping Policy</FooterLink>
                <FooterLink href="/returns">Returns</FooterLink>
                <FooterLink href="/size-guide">Size Guide</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
              </ul>
            </div>
          </div>

          {/* 3. Newsletter & Contact (Spans 4 columns on desktop) */}
          <div className="md:col-span-4">
            <h4 className="text-white font-serif text-sm mb-6 tracking-[0.15em] uppercase">The Newsletter</h4>
            <p className="text-sm font-light mb-6">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            
            {/* Minimalist Premium Form */}
            <form className="relative group mb-8">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-transparent border-b border-stone-700 py-3 pr-10 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-white transition-colors duration-300"
                required
              />
              <button 
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white transition-colors duration-300"
              >
                <HiArrowRight size={20} />
              </button>
            </form>

            <div className="text-[11px] font-medium tracking-[0.1em] text-stone-500 uppercase space-y-2">
              <p>Creative District, Sector 17, CH</p>
              <a href="mailto:support@yourbrand.com" className="block hover:text-white transition-colors duration-300">
                support@yourbrand.com
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Payment */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            <p className="text-[11px] text-stone-500 font-medium tracking-widest uppercase">
              &copy; {new Date().getFullYear()} Your Brand. All rights reserved.
            </p>

            {/* Subtle Payment Icons */}
            <div className="flex gap-4 text-xl text-stone-600">
              <FaCcVisa className="hover:text-white transition-colors duration-300 cursor-pointer" />
              <FaCcMastercard className="hover:text-white transition-colors duration-300 cursor-pointer" />
              <FaCcPaypal className="hover:text-white transition-colors duration-300 cursor-pointer" />
              <FaCcApplePay className="hover:text-white transition-colors duration-300 cursor-pointer" />
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
};

// ==================== Premium Helper Components ====================

const FooterLink = ({ href, children }) => (
  <li>
    <Link 
      href={href} 
      className="group relative inline-block text-[13px] text-stone-400 hover:text-white transition-colors duration-300"
    >
       <span className="uppercase tracking-widest">{children}</span>
       {/* Elegant Animated Underline */}
       <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
    </Link>
  </li>
);

const SocialIcon = ({ href, icon }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-stone-500 hover:text-white hover:-translate-y-1 transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;