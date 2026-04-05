"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  RiDashboardLine,
  RiStore2Line,
  RiAddCircleLine,
  RiShoppingBag3Line,
  RiUserHeartLine,
  RiSettings4Line,
  RiLogoutBoxRLine,
  RiCloseLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine,
  RiArrowLeftSLine,
  RiArrowRightSLine
} from "react-icons/ri";
import { GiTatteredBanner } from "react-icons/gi";
import { MdOutlineCategory, MdOutlineQueryBuilder } from "react-icons/md";
import { BsCollectionFill } from "react-icons/bs";
import { RiCoupon3Fill } from "react-icons/ri";
import { ImBlogger2 } from "react-icons/im";


import axios from "axios";
import { base_url } from "@/app/components/urls";
import { toast } from "react-toastify";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);
const [isMobileOpen,setIsMobileOpen]= useState(false)
const [isCollapsed,setIsCollapsed]=useState(false)
  // Auto-close mobile sidebar on route change
  // useEffect(() => {
    // setIsMobileOpen(false);

  // }, [pathname]);

  const menuItems = [
    { name: "Dashboard", icon: <RiDashboardLine size={22} />, path: "/admin" },
    { name: "Categorys", icon: <MdOutlineCategory size={22} />, path: "/admin/categorys" },
    { name: "Collections", icon: <BsCollectionFill size={22} />, path: "/admin/collections" },

    { name: "All Products", icon: <RiStore2Line size={22} />, path: "/admin/products" },
    { name: "Create Product", icon: <RiAddCircleLine size={22} />, path: "/admin/products/create" },
    { name: "Orders", icon: <RiShoppingBag3Line size={22} />, path: "/admin/orders" },
    { name: "Customers", icon: <RiUserHeartLine size={22} />, path: "/admin/customers" },
     { name: "Query", icon: <MdOutlineQueryBuilder size={22} />, path: "/admin/contacts" },
          { name: "Coupon Code", icon: <RiCoupon3Fill size={22} />, path: "/admin/coupon-code" },

    { name: "Blog", icon: <ImBlogger2 size={22} />, path: "/admin/blog" },
  ];


  const fetchAdmin= async()=>{
    try {
      const response = await axios.get(`${base_url}/user/admin/verify`)
      const data = await response.data;
      if(!data.success){
        router.push("/admin/login")
      }
    } catch (error) {
     router.push("/admin/login")
    }
  }


useEffect(()=>{
  fetchAdmin()
},[ ])


const handelLogout= async()=>{
  try {
    const response = await axios.get(`${base_url}/user/admin/logout`);
    const data = await response.data;
    if(data.success){
      toast.success(data.message)
      router.push("/admin/login")
    }
  } catch (error) {
    toast.error(error.response.data.message)
  }
}

  return (
    <>
      {/* Improved Mobile Overlay with better animation */}
      <div
        className={` bg-black/50 transition-all duration-300 lg:hidden ${
          isMobileOpen 
            ? "opacity-100 visible backdrop-blur-sm" 
            : "opacity-0 invisible hidden"
        }`}
        onClick={() => setIsMobileOpen(false)}
      ></div>

      
      <aside
        className={` h-screen bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 
          ${isCollapsed ? "w-20" : "w-64"}
          shadow-lg lg:shadow-sm
        `}
        onMouseEnter={() => !isCollapsed && setIsHovered(true)}
        onMouseLeave={() => !isCollapsed && setIsHovered(false)}
      >
        {/* Header / Logo */}
        <div className={`flex items-center h-16 border-b border-slate-100 transition-all ${isCollapsed ? "justify-center px-0" : "justify-between px-6"}`}>
            
          <Link 
            href="/admin/dashboard" 
            className={`flex items-center gap-2 overflow-hidden whitespace-nowrap transition-all ${isCollapsed ? "px-2" : ""}`}
            onClick={() => setIsMobileOpen(false)}
          >
            <div className="min-w-[32px] h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-pink-600 flex items-center justify-center text-white font-bold font-serif text-lg shadow-sm">
           V
            </div>
            
            {/* Logo Text - Better animation on collapse */}
            <span className={`text-lg font-bold text-slate-800 font-serif tracking-tight transition-all duration-300 ${
              isCollapsed ? "opacity-0 w-0 scale-95" : "opacity-100 w-auto scale-100"
            }`}>
             vogue wardrobe
            </span>
          </Link>

          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsMobileOpen(false)} 
            className="lg:hidden text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <RiCloseLine size={22} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden">
          {/* Section Label with better animation */}
          <div className={`overflow-hidden transition-all duration-300 ${isCollapsed ? "h-0" : "h-6"}`}>
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-2">
              Menu
            </p>
          </div>

          {menuItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <div 
                key={item.path}
                className="relative"
                onMouseEnter={() => isCollapsed && setShowTooltip(item.name)}
                onMouseLeave={() => isCollapsed && setShowTooltip(null)}
              >
                <Link
                  href={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 font-medium rounded-xl transition-all duration-200 group
                    ${isActive 
                      ? "bg-gradient-to-r from-indigo-50 to-pink-50 text-indigo-700 border-l-4 border-indigo-500" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                    ${isCollapsed ? "justify-center px-2" : ""}
                  `}
                >
                  <span className={`transition-colors min-w-[24px] flex justify-center ${isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"}`}>
                    {item.icon}
                  </span>

                  {/* Link Text - Better animation */}
                  <span className={`whitespace-nowrap transition-all duration-300 overflow-hidden ${
                    isCollapsed ? "w-0 opacity-0 translate-x-2" : "w-auto opacity-100 translate-x-0"
                  }`}>
                    {item.name}
                  </span>

                  {/* Active indicator for collapsed mode */}
                  {isActive && isCollapsed && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  )}
                </Link>

                {/* Improved Tooltip for Collapsed Mode */}
                {isCollapsed && showTooltip === item.name && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl opacity-0 animate-fade-in pointer-events-none z-50 whitespace-nowrap">
                    {item.name}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-r-4 border-y-transparent border-r-slate-900"></div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="border-t border-slate-100 bg-white/95 backdrop-blur-sm">
          {/* Collapse Toggle Button - Improved */}
          <div className="p-3">
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex items-center justify-between w-full py-2.5 px-3 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200 group"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <div className="flex items-center gap-3">
                <div className={`transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}>
                  {isCollapsed ? <RiMenuUnfoldLine size={20} /> : <RiMenuFoldLine size={20} />}
                </div>
                <span className={`text-sm font-medium transition-all duration-300 overflow-hidden ${
                  isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
                }`}>
                  Collapse Menu
                </span>
              </div>
              {!isCollapsed && (
                <kbd className="text-xs px-1.5 py-1 bg-slate-100 rounded text-slate-500 border border-slate-200">
                  ⌘+B 
                </kbd>
              )}
            </button>
          </div>

          {/* Logout Button */}
          <div className="p-3 pt-0">
            <button onClick={handelLogout} className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200 group ${isCollapsed ? "justify-center px-2" : ""}`}>
              <RiLogoutBoxRLine size={20} />
              <span className={`transition-all duration-300 overflow-hidden ${
                isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              }`}>
                Sign Out
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Collapse Handle - More intuitive */}
        {!isCollapsed && (
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden lg:block">
            <button
              onClick={() => setIsCollapsed(true)}
              className="w-5 h-12 bg-white border border-slate-200 rounded-r-lg shadow-sm hover:shadow-md hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 flex items-center justify-center"
              aria-label="Collapse sidebar"
            >
              <RiArrowLeftSLine size={16} className="text-slate-500" />
            </button>
          </div>
        )}
      </aside>

      {/* Add CSS animation for tooltip */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-2px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.15s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Sidebar;