"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { base_url } from '@/app/components/urls'
import { toast } from 'react-toastify'
import { MdCancel } from 'react-icons/md'

const Page = () => {
  // Form State
  const [couponCode, setCouponCode] = useState({
    couponcode: "",
    min_order_amount: 0,
    type: "percentage",
    number: 0,
    usageLimit: 0,
    expiryDate: "",
  })

  // UI States
  const [creatCode, setCode] = useState(false)
  const [loading, setLoading] = useState(false)
  
  // Data States
  const [couponsList, setCouponsList] = useState([])
  const [fetching, setFetching] = useState(true)

  // 1. Generic handler for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target
    setCouponCode((prev) => ({
      ...prev,
      [name]: name === "couponcode" || name === "type" || name === "expiryDate" 
              ? value 
              : Number(value), // Convert numeric fields to Numbers
    }))
  }

  // 2. Submit new coupon
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(`${base_url}/couponcode/create`, couponCode)
      toast.success("Coupon Created Successfully!")
      
      // Reset form and hide it
      setCouponCode({
        couponcode: "",
        min_order_amount: 0,
        type: "percentage",
        number: 0,
        usageLimit: 0,
        expiryDate: "",
      })
      setCode(false)
      
      // Refresh the table data
      getAllCouponCode()
    } catch (error) {
      console.error("Error creating coupon:", error)
      toast.error(error.response?.data?.message || "Failed to create coupon")
    } finally {
      setLoading(false)
    }
  }

  // 3. Fetch all coupons
  const getAllCouponCode = async () => {
    setFetching(true)
    try {
      const response = await axios.get(`${base_url}/couponcode/getall`)
      setCouponsList(response.data.coupons)
    } catch (error) {
      console.error("Error fetching coupons:", error)
      toast.error("Failed to load coupons")
    } finally {
      setFetching(false)
    }
  }

  // 4. Delete a coupon
  const deleteCoupon = async (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
        try {
            await axios.delete(`${base_url}/couponcode/delete/${id}`)
            toast.success("Coupon deleted successfully")
            setCouponsList(couponsList.filter(coupon => coupon._id !== id))
        } catch (error) {
            console.error("Error deleting coupon:", error)
            toast.error("Failed to delete the coupon")
        }
    }
  }

  useEffect(() => {
    getAllCouponCode() 
  }, [])

  return (
    <div className="p-8 max-w-7xl mx-auto">
      
      {/* Header & Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Coupon Management</h1>
        {!creatCode && (
          <button 
            onClick={() => setCode(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
          >
            + Add New Coupon
          </button>
        )}
      </div>

      {/* Creation Form Modal / Dropdown */}
      {creatCode && (
        <div className=" w-4xl mx-auto p-8 bg-white shadow-lg border border-gray-200 rounded-xl mb-10">
          <div className='flex justify-between border-b pb-2 text-xl font-bold mb-6 text-gray-800'>
            <h2>Create New Coupon</h2>
            <MdCancel className='cursor-pointer text-gray-500 hover:text-red-500 transition' size={24} onClick={() => setCode(false)} />
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
              <input type="text" name="couponcode" value={couponCode.couponcode} onChange={handleChange} placeholder="e.g. SAVE50" className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none uppercase" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
              <select name="type" value={couponCode.type} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="percentage">Percentage (%)</option>
                <option value="amount">Fixed Amount (₹)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {couponCode.type === 'percentage' ? 'Percentage Off' : 'Amount Off'}
              </label>
              <input type="number" name="number" value={couponCode.number} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min. Order Amount</label>
              <input type="number" name="min_order_amount" value={couponCode.min_order_amount} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Usage Limit</label>
              <input type="number" name="usageLimit" value={couponCode.usageLimit} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input type="date" name="expiryDate" value={couponCode.expiryDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>

            <div className="md:col-span-2 mt-4">
              <button type="submit" disabled={loading} className={`w-full py-3 text-white font-semibold rounded-md transition ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 shadow-md'}`}>
                {loading ? 'Processing...' : 'Create Coupon'}
              </button>
            </div>
          </form>
        </div>
      )}

    {!creatCode &&
      <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Code</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Discount</th>
              <th className="px-6 py-3">Min Order</th>
              <th className="px-6 py-3">Usage</th>
              <th className="px-6 py-3">Expiry Date</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {fetching ? (
              <tr><td colSpan="8" className="text-center py-6">Loading coupons...</td></tr>
            ) : couponsList.length === 0 ? (
              <tr><td colSpan="8" className="text-center py-6">No coupons found.</td></tr>
            ) : (
              couponsList.map((item) => (
                <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">{item.couponcode}</td>
                  <td className="px-6 py-4 capitalize">{item.type}</td>
                  <td className="px-6 py-4 font-medium text-green-600">
                    {item.type === 'percentage' ? `${item.number}%` : `₹${item.number}`}
                  </td>
                  <td className="px-6 py-4">₹{item.min_order_amount}</td>
                  <td className="px-6 py-4">
                    {item.usedCount} / {item.usageLimit}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(item.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {item.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => deleteCoupon(item._id)}
                      className="text-red-500 hover:text-red-700 font-medium transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

        }

    </div>
  )
}

export default Page