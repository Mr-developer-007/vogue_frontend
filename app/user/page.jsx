"use client"
import React, { useState } from 'react';
import { FaChevronRight, FaClock, FaEdit, FaHeart, FaMapPin, FaOpencart, FaUser } from 'react-icons/fa';
import { FiLogOut, FiPackage } from 'react-icons/fi';
import { BsShieldCheck } from 'react-icons/bs';
import Link from 'next/link';
import OrderCompo from './OrderCompo';
import AddressCompo from '../components/AddressCompo';
import DashBoard from './DashBoard';
import axios from 'axios';
import { base_url } from '../components/urls';
import { toast } from 'react-toastify';

const UserPage = () => {
const [detail,setDetail]=useState("dashboard")


const handelLogout = async (e)=>{
  e.preventDefault();
  try {
    const response = await axios.get(`${base_url}/user/user/logout`);
    const data = await response.data;
    if(data.success){
      toast.success(data.message)
      location.href="/"
    }
  } catch (error) {
    toast.error(error.response.data.message)
  }
}


  return (
    <div className="min-h-screen container mx-auto  py-8 px-4">
      <div className="maxxl mx-auto">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="flex flex-col md:flex-row gap-8">
          
          <aside className="w-full md:w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <ul className="flex flex-col">
                <li onClick={()=>setDetail("dashboard")}>
                  <button className={`w-full flex items-center gap-3 px-6 py-4 ${detail=="dashboard" ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600":""}  font-medium`}>
                    <FaUser size={20} /> Profile Dashboard
                  </button>
                </li>
                <li onClick={()=>setDetail("order")}>
                  <button className={`w-full flex items-center gap-3 px-6 py-4 ${detail=="order" ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600":""} `}>
                    <FiPackage size={20} /> My Orders
                  </button>
                </li>
                <li >

                  <Link  href={"/wishlist"} className="w-full flex items-center gap-3 px-6 py-4 text-gray-600 hover:bg-gray-50 transition-colors border-l-4 border-transparent">
                    <FaHeart size={20} /> Wishlist
                  </Link>
                </li>
 <li >

                  <Link  href={"/cart"} className="w-full flex items-center gap-3 px-6 py-4 text-gray-600 hover:bg-gray-50 transition-colors border-l-4 border-transparent">
                    <FaOpencart size={20} /> Cart
                  </Link>
                </li>

                <li>
                  <button onClick={()=>setDetail("address")} className={`w-full flex items-center gap-3 px-6 py-4 ${detail=="address" ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600":""}  font-medium`}>
                    <FaMapPin size={20} /> Saved Addresses
                  </button>
                </li>
                <li className="border-t border-gray-100 mt-2">
                  <button onClick={handelLogout} className="w-full flex items-center gap-3 px-6 py-4 text-red-600 hover:bg-red-50 transition-colors">
                    <FiLogOut size={20} /> Sign Out
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

         
          <main className="flex-1 space-y-6">
            
           


            { detail=="dashboard" &&

<DashBoard />
            }

             { detail=="order" &&

<OrderCompo />
            }


              { detail=="address" &&

<AddressCompo />
            }

          </main>



        </div>
      </div>
    </div>
  );
};

export default UserPage;