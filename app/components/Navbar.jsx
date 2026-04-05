"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoMenu, IoClose, IoChevronDown } from "react-icons/io5";
import { HiOutlineShoppingBag, HiOutlineHeart, HiOutlineUser, HiOutlineSearch } from "react-icons/hi";
import axios from 'axios';
import { base_url } from './urls';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from './Store/slices/CategorySlice';
import SearchSection from './SearchSection';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileCatOpen, setIsMobileCatOpen] = useState(false); 
  const [user, setUser] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); 
  
  const path = usePathname();
  const { categories, loading } = useSelector(state => state.category);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) setIsMobileCatOpen(false); 
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${base_url}/user/user/get`);
      const data = await response.data;
      if (data.success) {
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
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'All T-Shirts', path: '/products' },
    { name: 'The Journal', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  // --- CLEAN CONDITIONAL STYLING LOGIC ---
  const isHomePage = path === "/";

  // 1. Background & Position
  let navBackgroundClass = "";
  if (isHomePage) {
    navBackgroundClass = isScrolled 
      ? 'fixed top-0 bg-black backdrop-blur-xl saturate-150 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' 
      : 'fixed top-0 bg-transparent border-b border-transparent';
  } else {
    // Other pages: Solid white, sticky so it doesn't cover top page content
    navBackgroundClass = 'sticky top-0 bg-white border-b border-gray-100 shadow-sm';
  }

  // 2. Text, Logo, and Icon Colors
  const textColorClass = isHomePage ? 'text-white' : 'text-gray-900';
  const hoverColorClass = isHomePage ? 'hover:text-indigo-400' : 'hover:text-indigo-600';
  const borderDividerClass = isHomePage ? 'border-white/20' : 'border-gray-200';
  const logoClass = isHomePage ? 'brightness-0 invert opacity-90 hover:opacity-100' : 'opacity-100';

  return (
    <header className={`w-full z-50 font-sans transition-all duration-500 ease-in-out selection:bg-indigo-500/30 selection:text-white ${navBackgroundClass}`}>
      
      {searchToggle &&  <SearchSection onClose={() => setSearchToggle(false)} />}
      
      {/* Top Banner - Keeps the dark premium feel globally */}
      <div className="bg-gradient-to-r from-gray-950 via-black to-gray-950 text-white/90 text-[10px] lg:text-xs py-2.5 px-2 text-center tracking-[0.25em] font-medium uppercase shadow-sm whitespace-nowrap overflow-hidden text-ellipsis border-b border-white/5">
        Free Shipping on all pre-paid orders
      </div>

      <div className="container mx-auto px-4 ">
        <div className="flex justify-between items-center h-20">

          {/* Mobile Menu Toggle */}
          <div className="flex items-center lg:hidden">
            <button 
              onClick={toggleMenu} 
              className={`${textColorClass} ${hoverColorClass} transition-colors duration-300 text-3xl focus:outline-none`}
            >
              {isMenuOpen ? <IoClose /> : <IoMenu />}
            </button>
          </div>

          {/* Logo Section */}
          <div className="lg:flex-none flex justify-center lg:justify-start">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <img 
                src="/logo.webp" 
                alt="Brand Logo" 
                className={`h-10 lg:h-12 object-contain cursor-pointer transition-all duration-500 ${logoClass}`} 
              />
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center justify-center space-x-10">
            
            <Link href="/" className={`${textColorClass} ${hoverColorClass} font-bold text-[13px] uppercase tracking-widest transition-all duration-300 relative group whitespace-nowrap opacity-80 hover:opacity-100`}>
              Home
              <span className="absolute -bottom-2 left-1/2 w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
            </Link>

            {/* Category Dropdown */}
            <div className="relative group">
              <span className={`${textColorClass} ${hoverColorClass} font-bold text-[13px] uppercase tracking-widest transition-all duration-300 cursor-pointer flex items-center gap-1 whitespace-nowrap opacity-80 hover:opacity-100`}>
                Category
              </span>
              <span className="absolute -bottom-2 left-1/2 w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>

              {/* Glass Dropdown Box (Always white/glass so text is visible) */}
              <div className="absolute top-full -left-4 pt-6 w-auto min-w-[16rem] opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out z-50">
                <div className="bg-white/90 backdrop-blur-2xl border border-gray-200 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                  <div className="p-2 flex flex-col">
                    {!loading && categories?.length > 0 ? (
                      categories.map((item, index) => (
                        <Link 
                          key={index} 
                          href={`/products?category=${item._id}`}
                          className="group/link flex items-center justify-between px-4 py-3 text-xs font-bold text-gray-700 uppercase tracking-widest hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300 rounded-xl whitespace-nowrap gap-4"
                        >
                          <span className="transform transition-transform duration-300 whitespace-nowrap group-hover/link:translate-x-1">
                            {item.title}
                          </span>
                          <span className="opacity-0 -translate-x-4 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300 text-indigo-500 font-black">
                            →
                          </span>
                        </Link>
                      ))
                    ) : (
                      <div className="px-4 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest animate-pulse whitespace-nowrap">
                        Loading...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Links */}
            {navLinks.map((link, index) => (
              <Link 
                key={index} 
                href={link.path} 
                className={`${textColorClass} ${hoverColorClass} font-bold text-[13px] uppercase tracking-widest transition-all duration-300 relative group whitespace-nowrap opacity-80 hover:opacity-100`}
              >
                {link.name}
                <span className="absolute -bottom-2 left-1/2 w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
              </Link>
            ))}
          </nav>

          {/* User Actions - Desktop */}
          <div className={`hidden lg:flex justify-end items-center space-x-6 ${textColorClass} opacity-90`}>
            <button onClick={() => setSearchToggle(true)} className={`${hoverColorClass} hover:scale-110 transition-all duration-300`}>
              <HiOutlineSearch size={22} strokeWidth={1.5} />
            </button>
            <Link href={user ? "/wishlist" : "/login"} className={`${hoverColorClass} hover:scale-110 transition-all duration-300`}>
              <HiOutlineHeart size={22} strokeWidth={1.5} />
            </Link>
            <Link href={user ? "/user" : "/login"} className={`${hoverColorClass} hover:scale-110 transition-all duration-300`}>
              <HiOutlineUser size={22} strokeWidth={1.5} />
            </Link>
            <Link href={user ? "/cart" : "/login"} className={`relative ${hoverColorClass} hover:scale-110 transition-all duration-300 flex items-center gap-2 border-l ${borderDividerClass} pl-6`}>
              <HiOutlineShoppingBag size={22} strokeWidth={1.5} />
            </Link>
          </div>

          {/* Mobile/Tab Actions */}
          <div className={`flex justify-end lg:hidden ${textColorClass} space-x-4 opacity-90`}>
             <button onClick={() => setSearchToggle(true)} className={`${hoverColorClass} transition-colors`}>
              <HiOutlineSearch size={24} strokeWidth={1.5} />
             </button>
             <Link href={user ? "/cart" : "/login"} className={`relative ${hoverColorClass} transition-colors`}>
                <HiOutlineShoppingBag size={24} strokeWidth={1.5} />
                <span className="absolute -top-1.5 -right-1.5 bg-indigo-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-black shadow-[0_0_10px_rgba(99,102,241,0.8)]">
                  2
                </span>
             </Link>
          </div>

        </div>
      </div>

     {/* Mobile Menu (Always Solid/Glass Light so text is legible) */}
     <div className={`lg:hidden absolute w-full bg-white/95 backdrop-blur-2xl border-b border-gray-200 shadow-[0_8px_32px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-500 ease-in-out origin-top ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-8 flex flex-col h-[calc(100vh-100px)] overflow-y-auto">
          
          <div className="space-y-6 flex-grow">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-black text-gray-900 uppercase tracking-widest hover:text-indigo-600 transition-colors whitespace-nowrap">
              Home
            </Link>

            <div>
              <button 
                onClick={() => setIsMobileCatOpen(!isMobileCatOpen)}
                className="w-full flex items-center justify-between text-2xl font-black text-gray-900 uppercase tracking-widest hover:text-indigo-600 transition-colors whitespace-nowrap"
              >
                Category
                <IoChevronDown className={`transform transition-transform duration-300 flex-shrink-0 ${isMobileCatOpen ? 'rotate-180 text-indigo-600' : ''}`} size={24}/>
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isMobileCatOpen ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col space-y-3 pl-4 border-l-2 border-indigo-200">
                  {!loading && categories?.length > 0 ? (
                    categories.map((item, index) => (
                      <Link 
                        key={index} 
                        href={`/products?category=${item._id}`}
                        onClick={() => {setIsMenuOpen(false); setIsMobileCatOpen(false);}}
                        className="text-sm font-bold text-gray-600 uppercase tracking-widest hover:text-indigo-600 hover:translate-x-1 transition-all duration-300 py-1 whitespace-nowrap"
                      >
                        {item.title}
                      </Link>
                    ))
                  ) : (
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Loading...</span>
                  )}
                </div>
              </div>
            </div>

            {navLinks.map((link, index) => (
              <Link 
                key={index} 
                href={link.path} 
                onClick={() => setIsMenuOpen(false)}
                className="block text-2xl font-black text-gray-900 uppercase tracking-widest hover:text-indigo-600 transition-colors whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 grid grid-cols-2 gap-4 pb-8">
             <Link href={user ? "/user" : "/login"} onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center space-x-2 bg-gray-900 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all duration-300 whitespace-nowrap">
               <HiOutlineUser size={18}/> <span>Account</span>
             </Link>
             <Link href={user ? "/wishlist" : "/login"} onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center space-x-2 bg-white/50 backdrop-blur-md border border-gray-300 text-gray-800 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:border-indigo-600 hover:text-indigo-600 hover:shadow-lg transition-all duration-300 whitespace-nowrap">
               <HiOutlineHeart size={18}/> <span>Wishlist</span>
             </Link>
          </div>

        </div>
      </div> 
    </header>
  );
};

export default Navbar;