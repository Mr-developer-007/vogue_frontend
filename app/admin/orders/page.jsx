"use client"
import { base_url } from '@/app/components/urls'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FiEye, FiEdit2, FiTrash2, FiDownload, FiLoader } from 'react-icons/fi'

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
const [filter, setFilter] = useState("today") 
  const fetchOrder = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${base_url}/order/allorder?filter=${filter}`)
      const data = response.data;
      
      if (data.success) {
        setOrders(data.order)
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrder()
  }, [])
useEffect(() => {
  fetchOrder()
}, [filter])
  // Helper function to format dates 
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Helper function for Payment Status Badges
  const getPaymentBadge = (status) => {
    const s = status.toLowerCase()
    if (s === 'paid') return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Paid</span>
    if (s === 'pending') return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">{status}</span>
  }

  // Helper function for Order Status Badges
  const getStatusBadge = (status) => {
    const s = status.toLowerCase()
    if (s === 'confirmed' || s === 'delivered') return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">{status}</span>
    if (s === 'processing') return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 capitalize">{status}</span>
    if (s === 'pending') return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 capitalize">{status}</span>
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">{status}</span>
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <FiLoader className="animate-spin text-4xl text-gray-400 mb-4" />
        <p className="text-gray-500 font-medium">Loading admin data...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* Admin Page Header */}
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="mt-2 text-sm text-gray-600">
            A list of all orders in your store including their order ID, date, customer ID, and status.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
            <FiDownload className="mr-2 -ml-1 h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>
<div className="my-4  flex gap-3">
  <button
    onClick={() => setFilter("all")}
    className={`px-4 py-2 rounded-md text-sm ${filter === "all" ? "bg-black text-white" : "bg-gray-100"}`}
  >
    All
  </button>

  <button
    onClick={() => setFilter("today")}
    className={`px-4 py-2 rounded-md text-sm ${filter === "today" ? "bg-black text-white" : "bg-gray-100"}`}
  >
    Today
  </button>

  <button
    onClick={() => setFilter("week")}
    className={`px-4 py-2 rounded-md text-sm ${filter === "week" ? "bg-black text-white" : "bg-gray-100"}`}
  >
    This Week
  </button>
   <button
    onClick={() => setFilter("month")}
    className={`px-4 py-2 rounded-md text-sm ${filter === "month" ? "bg-black text-white" : "bg-gray-100"}`}
  >
    This Month
  </button>
</div>
      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            
            {/* Table Header */}
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-200 text-sm">
              {orders.length > 0 ? (
                orders.map((order) => {
                  // Calculate total quantity of items in this order
                  const totalItems = order.orderItems.reduce((acc, item) => acc + item.quantity, 0);

                  return (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      
                      {/* Order ID */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono font-medium text-gray-900">
                          #{order._id.slice(-6).toUpperCase()}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {formatDate(order.createdAt)}
                      </td>

                      {/* Customer ID (Sliced for brevity) */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-600 font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                          {order.user.slice(-8)}
                        </span>
                      </td>

                      {/* Items Count */}
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {totalItems} item{totalItems > 1 ? 's' : ''}
                      </td>

                      {/* Total Price */}
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        ₹{order.totalPrice}
                      </td>

                      {/* Payment Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getPaymentBadge(order.paymentStatus)}
                      </td>

                      {/* Order Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.orderStatus)}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end">
  <Link href={`/admin/orders/${order._id}`}
    className="text-gray-400 hover:text-indigo-600 transition-colors"
    title="View Details"
  >
    <FiEye size={18} />
  </Link>
</div>
                      </td>

                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    No orders found in the database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Simple Pagination/Footer Area */}
        {orders.length > 0 && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{orders.length}</span> orders
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminOrders