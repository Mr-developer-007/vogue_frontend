'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTiktok, // Swapped Pinterest for TikTok (more relevant for streetwear)
  FaTwitter,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcApplePay
} from "react-icons/fa";
import { useSelector } from 'react-redux';

const Footer = () => {
    const { categories, loading } = useSelector(state => state.category);

  return (
    <footer className="bg-gray-950 text-gray-400 font-sans border-t-[8px] border-indigo-600 selection:bg-indigo-500 selection:text-white">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          
          {/* 1. Brand & Bio */}
          <div className="space-y-6">
            {/* Logo Wrapper */}
            <div className="relative bg-white p-4 w-fit rounded-sm shadow-[4px_4px_0px_0px_rgba(79,70,229,1)]">
               {/* Replace with your actual logo */}
               <Image 
                src="/logo.webp" 
                alt="Brand Logo" 
                width={180} 
                height={60} 
                className="object-contain" 
               />
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed font-medium mt-4">
              Premium everyday essentials crafted for comfort and built for the streets. Heavyweight fabrics, perfect drops, and timeless fits.
            </p>

            {/* Social Icons - Edgy & Clean */}
            <div className="flex gap-3 pt-2">
              <SocialIcon icon={<FaInstagram />} />
              <SocialIcon icon={<FaTiktok />} />
              <SocialIcon icon={<FaTwitter />} />
              <SocialIcon icon={<FaFacebookF />} />
            </div>
          </div>

          {/* 2. Navigation Links (Streetwear Categories) */}
          <div className="flex gap-12 sm:gap-20">
            {/* Shop Links */}
            <div>
              <h4 className="text-white font-black text-lg mb-6 tracking-widest uppercase">Shop</h4>
              <ul className="space-y-4 text-sm font-medium">

{categories.length > 0 && categories.map((item)=><FooterLink key={item._id} href={`/products?category=${item._id}`}>{item.title}</FooterLink>)}

{/*                 
                <FooterLink href="/graphic">Graphic Tees</FooterLink>
                <FooterLink href="/hoodies">Hoodies & Sweats</FooterLink>
                <FooterLink href="/bottoms">Bottoms</FooterLink>
                <FooterLink href="/new">Latest Drops</FooterLink> */}
              </ul>
            </div>

            {/* Help Links */}
            <div>
              <h4 className="text-white font-black text-lg mb-6 tracking-widest uppercase">Support</h4>
              <ul className="space-y-4 text-sm font-medium">
                <FooterLink href="/track">Track Order</FooterLink>
                <FooterLink href="/shipping">Shipping Policy</FooterLink>
                <FooterLink href="/returns">Returns & Exchanges</FooterLink>
                <FooterLink href="/size-guide">Size Guide</FooterLink>
                <FooterLink href="/contact">Contact Us</FooterLink>
              </ul>
            </div>
          </div>

          {/* 3. Newsletter & Contact */}
          <div>
            <h4 className="text-white font-black text-lg mb-4 tracking-widest uppercase">Join The Club</h4>
            <p className="text-gray-400 text-sm mb-6 font-medium">
              Subscribe for early access to new drops, exclusive discounts, and community events.
            </p>
            
            {/* Edgy Form */}
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-800 rounded-sm focus:outline-none focus:border-indigo-500 text-white placeholder-gray-600 transition-colors uppercase tracking-wide text-sm font-bold"
              />
              <button className="w-full bg-indigo-600 text-white px-6 py-3.5 rounded-sm hover:bg-indigo-500 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] transition-all duration-300 uppercase tracking-widest text-sm font-black">
                Subscribe
              </button>
            </form>

            <div className="mt-8 text-xs font-bold tracking-widest text-gray-500 uppercase">
              <p>Creative District, Sector 17, CH</p>
              <p className="hover:text-indigo-400 cursor-pointer mt-2 transition-colors">support@yourbrand.com</p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Payment */}
      <div className="bg-black border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            <p className="text-xs text-gray-500 font-bold tracking-wider uppercase">
              &copy; {new Date().getFullYear()} Your Brand Name. All rights reserved.
            </p>

            <div className="flex gap-4 text-2xl text-gray-700">
              <FaCcVisa className="hover:text-white transition-colors cursor-pointer" />
              <FaCcMastercard className="hover:text-white transition-colors cursor-pointer" />
              <FaCcPaypal className="hover:text-white transition-colors cursor-pointer" />
              <FaCcApplePay className="hover:text-white transition-colors cursor-pointer" />
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
};

// ==================== Simple Helper Components ====================

const FooterLink = ({ href, children }) => (
  <li>
    <Link href={href} className="group flex items-center gap-3 hover:text-indigo-400 transition-colors duration-300">
       {/* Animated square bullet point */}
       <span className="h-1.5 w-1.5 bg-gray-800 group-hover:bg-indigo-500 transition-colors duration-300"></span>
       <span className="uppercase tracking-wide">{children}</span>
    </Link>
  </li>
);

const SocialIcon = ({ icon }) => (
  <a 
    href="#" 
    className="w-10 h-10 flex items-center justify-center border-2 border-gray-800 bg-gray-900 hover:bg-indigo-600 hover:border-indigo-600 text-gray-400 hover:text-white hover:-translate-y-1 transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;