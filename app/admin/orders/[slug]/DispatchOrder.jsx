import { base_url } from '@/app/components/urls'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FiBox } from 'react-icons/fi'
import { toast } from 'react-toastify'

const DispatchOrder = ({ orderid }) => {
  const router = useRouter()
  
  // Fixed typo: dispathcData -> dispatchData
  const [dispatchData, setDispatchData] = useState({
    orderid,
    length: "",
    breadth: "",
    height: "",
    weight: ""
  })
  
  // Added loading state to prevent double submissions
  const [isLoading, setIsLoading] = useState(false)

  // Cleaned up onChange logic into a single reusable handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Optional: Add regex here if you want to restrict to numbers/decimals only
    setDispatchData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDispatch = async () => {
    // 1. Basic Client-Side Validation
    const { length, breadth, height, weight } = dispatchData;
    if (!length || !breadth || !height || !weight) {
      toast.warning("Please fill in all package dimensions and weight.")
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${base_url}/shipment/create`, dispatchData)
      const data = response.data;
      
      if (data.success) {
        toast.success(data.message || "Order ready for dispatch!")
        router.back()
      } else {
        toast.error(data.error || "Failed to create shipment.")
      }
    } catch (error) {
      // Safely access nested error properties
      const errorMessage = error?.response?.data?.error || "An unexpected error occurred."
      toast.error(errorMessage)
    } finally {
      setIsLoading(false);
    }
  }

  // Common Tailwind classes for inputs to keep JSX clean
  const inputStyles = "w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2.5">
          <FiBox className="text-purple-600 shrink-0" /> 
          Package Details
        </h2>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Input Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider ml-1">Length (cm)</label>
            <input 
              type="number" 
              name="length" 
              placeholder="0.00" 
              value={dispatchData.length} 
              onChange={handleChange}
              className={inputStyles}
              min="0"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider ml-1">Breadth (cm)</label>
            <input 
              type="number" 
              name="breadth" 
              placeholder="0.00" 
              value={dispatchData.breadth} 
              onChange={handleChange}
              className={inputStyles}
              min="0"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider ml-1">Height (cm)</label>
            <input 
              type="number" 
              name="height" 
              placeholder="0.00" 
              value={dispatchData.height} 
              onChange={handleChange}
              className={inputStyles}
              min="0"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider ml-1">Weight (kg)</label>
            <input 
              type="number" 
              name="weight" 
              placeholder="0.00" 
              value={dispatchData.weight} 
              onChange={handleChange}
              className={inputStyles}
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <hr className="border-gray-100" />
        
        {/* Action Button */}
        <div className="text-center sm:text-right pt-2">
          <button 
            onClick={handleDispatch} 
            disabled={isLoading}
            className={`
              inline-flex items-center justify-center gap-2 px-8 py-2.5 
              bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium 
              rounded-full shadow-[0_4px_14px_0_rgba(147,51,234,0.39)] 
              transition-all duration-200 ease-in-out
              ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_6px_20px_rgba(147,51,234,0.23)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer'}
            `}
          >
            {isLoading ? (
              <>
                {/* Simple SVG Spinner */}
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              "Ready for Dispatch"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DispatchOrder