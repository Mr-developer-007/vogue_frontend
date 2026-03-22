"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { base_url, img_url } from "../components/urls";
import { 
  FiPackage, 
  FiMapPin, 
  FiCreditCard, 
  FiClock, 
  FiCheckCircle 
} from "react-icons/fi";
import { FaChevronRight, FaClock, FaEdit, FaHeart } from "react-icons/fa";
import { BsShieldCheck } from "react-icons/bs";

const DashBoard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
const [user,setUser]=useState()
console.log(user)
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${base_url}/order/get/?limit=6`);
      if (response.data.success) {
        setOrders(response.data.data);
        setUser(response.data.user)
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // Helper for status badge colors
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
      case "paid":
        return "bg-green-100 text-green-700 border-green-200";
      case "processing":
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (<>
   <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                 {user?.name.slice(0,2).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                  <p className="text-gray-500">{user?.email}</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                    <BsShieldCheck size={12} className="mr-1" /> Verified Buyer
                  </span>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all">
                <FaEdit size={16} /> Edit Profile
              </button>
            </div>

         
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Total Orders', value: '12', icon: <FiPackage />, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Awaiting Delivery', value: '2', icon: <FaClock />, color: 'text-orange-600', bg: 'bg-orange-50' },
                { label: 'Saved Items', value: '45', icon: <FaHeart />, color: 'text-red-600', bg: 'bg-red-50' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>{stat.icon}</div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                    <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

          
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Recent Orders</h3>
                <button className="text-indigo-600 text-sm font-medium hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                      <th className="px-6 py-3 font-semibold">Order ID</th>
                      <th className="px-6 py-3 font-semibold">Date</th>
                      <th className="px-6 py-3 font-semibold">Amount</th>
                      <th className="px-6 py-3 font-semibold">Status</th>
                      <th className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-indigo-600">{order._id}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}</td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">₹{order.totalPrice}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <FaChevronRight size={18} className="text-gray-400 inline" />
                        </td>
                      </tr>
                    ))} 
                  </tbody>
                </table>
              </div>
            </div> 
 
    </>
  );
};

export default DashBoard;