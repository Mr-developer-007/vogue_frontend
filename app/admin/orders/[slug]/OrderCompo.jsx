"use client"
import { base_url, img_url } from '@/app/components/urls'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { 
  FiLoader, 
  FiCalendar, 
  FiUser, 
  FiCreditCard, 
  FiBox, 
  FiArrowLeft,
  FiMapPin,
  FiPhone
} from 'react-icons/fi'
import Link from 'next/link'
import { toast } from 'react-toastify'

const OrderCompo = ({ slug }) => {
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState(null)
  const [trackingNumber,setTrackingNumber]=useState("")

  const fetchOrder = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${base_url}/order/getorder/${slug}`)
      const data = response.data;
      
      // Checking for both possible API response structures
      if (data.success && data.order) {
        setOrder(data.order)
      } else if (data._id) {
        setOrder(data) // Fallback if the API returns the object directly
      } else {
        setOrder(data) // Final fallback based on your raw JSON
      }
    } catch (error) {
      console.error("Failed to fetch order:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (slug) fetchOrder()
  }, [slug])

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const getPaymentBadge = (status) => {
    if (!status) return null;
    const s = status.toLowerCase()
    if (s === 'paid') return <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 uppercase tracking-wider">Paid</span>
    if (s === 'pending') return <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 uppercase tracking-wider">Pending</span>
    return <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800 uppercase tracking-wider">{status}</span>
  }


  const getStatusBadge = (status) => {
    if (!status) return null;
    const s = status.toLowerCase()
    if (s === 'confirmed' || s === 'delivered') return <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 uppercase tracking-wider">{status}</span>
    if (s === 'processing') return <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 uppercase tracking-wider">{status}</span>
    if (s === 'pending') return <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 uppercase tracking-wider">{status}</span>
    return <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800 uppercase tracking-wider">{status}</span>
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <FiLoader className="animate-spin text-4xl text-gray-400 mb-4" />
        <p className="text-gray-500 font-medium">Loading order details...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <FiBox className="text-6xl text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Not Found</h2>
        <p className="text-gray-500 mb-6">We couldn't find an order matching this ID.</p>
        <Link href="/admin/orders" className="text-blue-600 hover:underline">Return to Orders List</Link>
      </div>
    )
  }

  const updateOrderStatus=async(info)=>{
    try {
      setLoading(true)
      const response = await axios.put(`${base_url}/order/updateorderstatus/${slug}`,{info})
      const data = await response.data;
      if(data.success){
        toast.success(data.message)
        fetchOrder()
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }


 const updatePaymentStatus=async(info)=>{
    try {
      setLoading(true)
      const response = await axios.put(`${base_url}/order/updatepaymentstatus/${slug}`,{info})
      const data = await response.data;
      if(data.success){
        toast.success(data.message)
        fetchOrder()
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }


  const updateStatus=async(info)=>{
    try {
      setLoading(true)
      const response = await axios.put(`${base_url}/order/updatestatus/${slug}`,{info})
      const data = await response.data;
      if(data.success){
        toast.success(data.message)
        fetchOrder()
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

 const updateTrackingNumber=async()=>{
    try {if(trackingNumber.length <4 )return ;

      setLoading(true)
      const response = await axios.put(`${base_url}/order/updateTrackingNumber/${slug}`,{info:trackingNumber})
      const data = await response.data;
      if(data.success){
        toast.success(data.message)
        fetchOrder()
        setTrackingNumber("")
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }


  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 font-sans">
      
      {/* Back Button */}
      <Link href="/admin/orders" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <FiArrowLeft className="mr-2" /> Back to Orders
      </Link>

      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            Order #{order._id?.slice(-8).toUpperCase()}
          </h1>
          <p className="text-gray-500 flex items-center gap-2 text-sm">
            <FiCalendar /> Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div> {order?.trackingid ? `Tracking No :${order?.trackingid}`:""} </div>
          {getPaymentBadge(order.paymentStatus)}
          {getStatusBadge(order.orderStatus)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Items */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FiBox className="text-gray-500" /> Items in Order
              </h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {order.orderItems?.map((item) => (
                  <div key={item._id} className="flex flex-col sm:flex-row items-start gap-6 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                    
                    {/* Item Image */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                      <img 
                        src={`${img_url}/${item.image}`} 
                        alt={item.product?.title || "Product"} 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-grow">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.product?.title || "Unknown Product"}
                      </h4>
                      <div className="text-sm text-gray-500 space-y-1 mb-3">
                        <p>SKU: {item.product?.sku || "N/A"}</p>
                        <p>Size: <span className="uppercase font-medium text-gray-700">{item.size}</span></p>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="text-left sm:text-right w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
                      <p className="text-lg font-bold text-gray-900">₹{item.price * item.quantity}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.quantity} × ₹{item.price}
                      </p>
                    </div>

                  </div>
                ))}
              </div>
            </div>

           
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    
    {/* Order Status */}
    <div className="flex flex-col gap-2">
      <label htmlFor="orderStatus" className="text-sm font-medium text-gray-700">Order Status</label>
      <select 
        id="orderStatus" 
        value={order.orderStatus} 
        onChange={(e) => updateOrderStatus(e.target.value)}
        className="block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
      >
        <option value="processing">Processing</option>
        <option value="confirmed">Confirmed</option>
        <option value="shipped">Shipped</option>
        <option value="out_for_delivery">Out for Delivery</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>

    {/* Payment Status */}
    <div className="flex flex-col gap-2">
      <label htmlFor="paymentStatus" className="text-sm font-medium text-gray-700">Payment Status</label>
      <select 
        id="paymentStatus" 
        value={order.paymentStatus} 
        onChange={(e) => updatePaymentStatus(e.target.value)}
        className="block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
      >
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
        <option value="failed">Failed</option>
      </select>
    </div>

    {/* General Status */}
    <div className="flex flex-col gap-2">
      <label htmlFor="Status" className="text-sm font-medium text-gray-700">Overall Status</label>
      <select 
        id="Status" 
        value={order.status} 
        onChange={(e) => updateStatus(e.target.value)}
        className="block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="failed">Failed</option>
      </select>
    </div>

   
    <div className="flex flex-col gap-2">
      <label htmlFor="tracking" className="text-sm font-medium text-gray-700">Tracking Number</label>
      <div className="flex gap-2">
        <input 
          type="text" 
          id="tracking"
          placeholder="Enter ID..." 
          value={trackingNumber} 
          onChange={(e) => setTrackingNumber(e.target.value)}
          className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        />
        <button 
          onClick={updateTrackingNumber}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
        >
          Update
        </button>
      </div>
    </div>

  </div>
</div>
        </div>




        {/* Right Column: Customer, Shipping & Summary */}
        <div className="space-y-8">
          
          {/* Customer Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FiUser className="text-gray-500" /> Customer
              </h2>
            </div>
            <div className="p-6 text-sm text-gray-700 space-y-4">
              <div>
                <p className="text-gray-400 font-medium mb-1">Name</p>
                <p className="font-semibold text-gray-900 capitalize">{order.user?.name || "Guest User"}</p>
              </div>
              <div>
                <p className="text-gray-400 font-medium mb-1">Email</p>
                <p className="text-blue-600 hover:underline break-all">
                  <a href={`mailto:${order.user?.email}`}>{order.user?.email}</a>
                </p>
              </div>
            </div>
          </div>

          {/* NEW: Shipping Address */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FiMapPin className="text-gray-500" /> Shipping Address
              </h2>
            </div>
            <div className="p-6 text-sm text-gray-700 space-y-1.5 leading-relaxed">
              {order.address && typeof order.address === 'object' ? (
                <>
                  <p className="font-semibold text-gray-900 text-base mb-1">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p>{order.address.street1}</p>
                  {order.address.street2 && <p>{order.address.street2}</p>}
                  <p>{order.address.city}, {order.address.state} {order.address.zipCode}</p>
                  <p>{order.address.country}</p>
                  
                  <div className="pt-3 mt-3 border-t border-gray-100">
                    <p className="flex items-center gap-2 text-gray-600">
                      <FiPhone className="text-gray-400" /> 
                      {order.address.phoneNumber}
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-gray-500 italic">No address details available.</p>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FiCreditCard className="text-gray-500" /> Payment Summary
              </h2>
            </div>
            <div className="p-6 text-sm text-gray-600 space-y-3">
              
              <div className="flex justify-between items-center">
                <p>Subtotal ({order.orderItems?.reduce((acc, item) => acc + item.quantity, 0) || 0} items)</p>
                <p className="font-medium text-gray-900">₹{order.itemsPrice}</p>
              </div>
              
              {order.discountPrice > 0 && (
                <div className="flex justify-between items-center text-green-600">
                  <p>Discount</p>
                  <p className="font-medium">- ₹{order.discountPrice}</p>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <p>Shipping</p>
                <p className="font-medium text-gray-900">
                  {order.totalPrice - order.itemsPrice + order.discountPrice === 0 ? "Free" : `₹${order.totalPrice - order.itemsPrice + order.discountPrice}`}
                </p>
              </div>

              <hr className="my-4 border-gray-200" />
              
              <div className="flex justify-between items-center text-base">
                <p className="font-bold text-gray-900">Total Paid</p>
                <p className="font-black text-xl text-gray-900">₹{order.totalPrice}</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default OrderCompo