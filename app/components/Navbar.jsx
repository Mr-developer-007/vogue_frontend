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

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileCatOpen, setIsMobileCatOpen] = useState(false); // For mobile category accordion
  const [user, setUser] = useState(false);
  const [searchToggle,setSearchToggle] = useState(false)
  const { categories, loading } = useSelector(state => state.category);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Reset category accordion when menu closes
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

  const navLinks = [
    { name: 'All T-Shirts', path: '/products' },
    { name: 'The Journal', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b-2 border-gray-100 sticky top-0 z-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
   {searchToggle &&  <SearchSection  onClose={()=>setSearchToggle(false)}  /> }
      <div className="bg-gray-950 text-white text-[10px] lg:text-xs py-2.5 px-2 text-center tracking-[0.25em] font-bold uppercase shadow-sm whitespace-nowrap overflow-hidden text-ellipsis">
        Free Shipping on all pre-paid orders
      </div>

      <div className="container mx-auto px-4 ">
        <div className="flex justify-between items-center  h-20">

       
          <div className=" flex items-center lg:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-gray-900 hover:text-indigo-600 transition-colors text-3xl focus:outline-none"
            >
              {isMenuOpen ? <IoClose /> : <IoMenu />}
            </button>
          </div>

          {/* Logo Section (Center on Mobile/Tab, Left on Desktop) */}
          <div className="  lg:flex-none flex justify-center  lg:justify-start">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <img 
                src="/logo.webp" 
                alt="Brand Logo" 
                className="h-10 lg:h-12 object-contain cursor-pointer" 
              />
            </Link>
          </div>

          {/* Navigation Links - Desktop (Center) */}
          <nav className="hidden lg:flex items-center  justify-center space-x-10">
            
            {/* Home Link */}
            <Link href="/" className="text-gray-900 hover:text-indigo-600 font-black text-[13px] uppercase tracking-widest transition-colors duration-300 relative group whitespace-nowrap">
              Home
              <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Category Dropdown */}
            <div className="relative group">
              <span className="text-gray-900 group-hover:text-indigo-600 font-black text-[13px] uppercase tracking-widest transition-colors duration-300 cursor-pointer flex items-center gap-1 whitespace-nowrap">
                Category
              </span>
              <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>

              {/* Dropdown Box */}
              <div className="absolute top-full -left-4 pt-6 w-auto min-w-[16rem] opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-3 group-hover:translate-y-0 transition-all duration-300 z-50">
                <div className="bg-white border-2 border-gray-100 rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
                  <div className="h-1 w-full bg-indigo-600"></div>
                  <div className="p-2 flex flex-col">
                    {!loading && categories?.length > 0 ? (
                      categories.map((item, index) => (
                        <Link 
                          key={index} 
                          href={`/products?category=${item._id}`}
                          className="group/link flex items-center justify-between px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-widest hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 rounded-lg whitespace-nowrap gap-4"
                        >
                          <span className="transform transition-transform duration-200 whitespace-nowrap">
                            {item.title}
                          </span>
                          <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-indigo-600 font-black">
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
                className="text-gray-900 hover:text-indigo-600 font-black text-[13px] uppercase tracking-widest transition-colors duration-300 relative group whitespace-nowrap"
              >
                {link.name}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* User Actions - Desktop (Right) */}
          <div className="hidden lg:flex  justify-end items-center space-x-6 text-gray-900">
            <button onClick={()=>setSearchToggle(true)} className="hover:text-indigo-600 hover:-translate-y-0.5 transition-all duration-300">
              <HiOutlineSearch size={22} />
            </button>
            <Link href={user ? "/wishlist" : "/login"} className="hover:text-indigo-600 hover:-translate-y-0.5 transition-all duration-300">
              <HiOutlineHeart size={22} />
            </Link>
            <Link href={user ? "/user" : "/login"} className="hover:text-indigo-600 hover:-translate-y-0.5 transition-all duration-300">
              <HiOutlineUser size={22} />
            </Link>
            <Link href={user ? "/cart" : "/login"} className="relative hover:text-indigo-600 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 border-l-2 border-gray-100 pl-6">
              <HiOutlineShoppingBag size={22} />
              {/* Vibrant Notification Badge */}
              
            </Link>
          </div>

          {/* Mobile/Tab Actions (Right on Mobile/Tab) */}
          <div className=" flex justify-end lg:hidden text-gray-900 space-x-4">
             <button onClick={()=>setSearchToggle(true)} className="hover:text-indigo-600 transition-colors">
              <HiOutlineSearch size={24} />
             </button>
             <Link href={user ? "/cart" : "/login"} className="relative hover:text-indigo-600 transition-colors">
                <HiOutlineShoppingBag size={24} />
                <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-black">
                  2
                </span>
             </Link>
          </div>

        </div>
      </div>

     <div className={`lg:hidden absolute w-full bg-white border-b-2 border-gray-100 shadow-2xl overflow-hidden transition-all duration-300 ease-in-out origin-top ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
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
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileCatOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                <div className="flex flex-col space-y-3 pl-4 border-l-2 border-indigo-100">
                  {!loading && categories?.length > 0 ? (
                    categories.map((item, index) => (
                      <Link 
                        key={index} 
                      
                       href={`/products?category=${item._id}`}
                        onClick={() => {setIsMenuOpen(false),setIsMobileCatOpen(false)}}
                        className="text-sm font-bold text-gray-500 uppercase tracking-widest hover:text-indigo-600 py-1 whitespace-nowrap"
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
          
          <div className="mt-8 pt-8 border-t-2 border-gray-100 grid grid-cols-2 gap-4 pb-8">
             <Link href={user ? "/user" : "/login"} onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center space-x-2 bg-gray-900 text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors shadow-lg whitespace-nowrap">
               <HiOutlineUser size={18}/> <span>Account</span>
             </Link>
             <Link href={user ? "/wishlist" : "/login"} onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center space-x-2 bg-gray-50 border-2 border-gray-200 text-gray-900 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:border-indigo-600 hover:text-indigo-600 transition-colors whitespace-nowrap">
               <HiOutlineHeart size={18}/> <span>Wishlist</span>
             </Link>
          </div>

        </div>
      </div> 
    </header>
  );
};

export default Navbar;