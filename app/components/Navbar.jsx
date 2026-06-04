"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from './Store/slices/CategorySlice';
import axios from 'axios';
import { base_url } from './urls';
import { HiOutlineShoppingBag, HiOutlineUser, HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [user, setUser] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const dispatch = useDispatch();
  const { categories, loading } = useSelector(state => state.category);
  const wishlist = useSelector(state => state.wishlist?.items || []);

  const path = usePathname();
  const isHomePage = path === "/";

  // --- Dynamic Styling Based on Scroll & Page ---
  let navBackgroundClass = "";
  let textColorClass = "";

  if (isHomePage) {
    navBackgroundClass = isScrolled 
      ? 'fixed top-0 bg-black backdrop-blur-xl saturate-150 border-b border-white/10 shadow-md' 
      : 'fixed top-0 bg-transparent border-b border-transparent';
    
    // Text is black when not scrolled, white when scrolled (matching the black bg)
    textColorClass = isScrolled ? 'text-white' : 'text-black'; 
  } else {
    navBackgroundClass = 'sticky top-0 bg-white border-b border-gray-100 shadow-sm';
    textColorClass = 'text-black'; // Using strict black instead of gray-900 for a sharper look
  }

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${base_url}/user/user/get`);
      if (response.data.success) {
        setUser(true);
      }
    } catch (error) {
      setUser(false);
    }
  };

  useEffect(() => {
    dispatch(getCategory());
    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [path]);

  // Premium Text Classes (Reusable)
  const premiumTextClass = "font-medium hover:text-indigo-500 transition-colors uppercase text-ase tracking-[0.15em]";

  return (
    <header className={`  text-xl font-serif w-full z-50   ${navBackgroundClass} ${textColorClass}`}>
      <div className='container mx-auto px-4 md:px-6 flex items-center justify-between h-24 relative'>
        
        {/* 1. MOBILE MENU TOGGLE (Left) */}
        <div className="flex lg:hidden items-center flex-1">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="hover:text-indigo-500 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <HiX size={30} /> : <HiMenu size={30} />}
          </button>
        </div>

        {/* 2. DESKTOP LEFT LINKS */}
        <div className='hidden lg:flex flex-1 gap-8 items-center'> 
          <Link href="/" className={premiumTextClass}>
            Home
          </Link>
          {!loading && categories?.map((item) => (
            <Link 
              key={item._id} 
              href={`/products?category=${item._id}`}
              className={premiumTextClass}
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* 3. CENTER LOGO */}
        <div className='flex justify-center flex-shrink-0'>
          <Link href="/">
            <img 
              src="/logo.webp" 
              alt="Brand Logo" 
              // Changed logic: Inverts to white ONLY when scrolled on homepage (black bg)
              className={`w-32 md:w-40 object-contain transition-all duration-300 ${isHomePage && isScrolled ? 'brightness-0 invert' : ''}`} 
            />
          </Link>
        </div>

        {/* 4. DESKTOP RIGHT LINKS & ICONS */}
        <div className='flex flex-1 gap-6 items-center justify-end'>
          <div className='hidden xl:flex gap-8 mr-4 items-center text-nowrap'>
            <Link href="https://www.shiprocket.in/shipment-tracking/" target='_blank' rel="noreferrer" className={premiumTextClass}>
              Track Order
            </Link>
            <Link href="/returns" className={premiumTextClass}>
             Returns 
            </Link>
          </div>
          
          <Link href={user ? "/user" : "/login"} className="hover:text-indigo-500 hover:scale-110 transition-all">
            <HiOutlineUser size={26}/> 
          </Link>
          <Link href={user ? "/cart" : "/login"} className="hover:text-indigo-500 hover:scale-110 transition-all relative">
            <HiOutlineShoppingBag size={26} />
          </Link>
        </div>
      </div>

      {/* 5. MOBILE DROPDOWN MENU */}
      <div className={`lg:hidden absolute w-full bg-white shadow-xl border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen py-6 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
        <div className="flex flex-col px-6 space-y-5 text-black">
          <Link href="/" className="font-medium text-lg uppercase  hover:text-indigo-600 border-b pb-3">
            Home
          </Link>
          
          <div className="font-semibold text-sm text-gray-400 uppercase  mt-2">Categories</div>
          <div className="flex flex-col space-y-4 pl-2">
            {!loading && categories?.map((item) => (
              <Link 
                key={item._id} 
                href={`/products?category=${item._id}`}
                className="font-medium text-base uppercase  hover:text-indigo-600 transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="font-semibold text-sm text-gray-400 uppercase  mt-4 pt-5 border-t">Quick Links</div>
          <Link href="https://www.shiprocket.in/shipment-tracking/" target='_blank' className="font-medium text-base uppercase  hover:text-indigo-600">
            Track Order
          </Link>
          <Link href="/returns" className="font-medium text-base uppercase  hover:text-indigo-600 pb-4 border-b">
            Returns And Exchange
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;