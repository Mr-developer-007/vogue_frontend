"use client"
import React, { useState } from 'react'
import { HiOutlineScale, HiOutlineScissors, HiOutlineUser } from 'react-icons/hi'

const SizeGuide = () => {
  const [unit, setUnit] = useState('in') // 'in' or 'cm'

  // Sap Matty sizing data (in inches)
  const sizeData = [
    { size: 'M', chest: 38, width: 19, length: 27 },
    { size: 'L', chest: 40, width: 20, length: 28 },
    { size: 'XL', chest: 42, width: 21, length: 29 },
    { size: 'XXL', chest: 44, width: 22, length: 30 },
    { size: 'XXXL', chest: 46, width: 23, length: 31 },
  ]

  // Helper function to convert inches to cm if needed
  const displayValue = (inches) => {
    if (unit === 'cm') {
      return (inches * 2.54).toFixed(1)
    }
    return inches
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 font-sans">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sap Matty | Size Guide
          </h1>
          <p className="text-gray-500">
            Find your perfect fit. Measurements are taken with the garment laying flat.
          </p>
        </div>

        {/* Clean Unit Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 w-fit">
          <button
            onClick={() => setUnit('in')}
            className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              unit === 'in' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Inches
          </button>
          <button
            onClick={() => setUnit('cm')}
            className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              unit === 'cm' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Centimeters
          </button>
        </div>
      </div>

      {/* Clean Size Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-16">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">Size</th>
                <th className="p-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">Chest</th>
                <th className="p-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">Width</th>
                <th className="p-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sizeData.map((row) => (
                <tr 
                  key={row.size} 
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-5 font-medium text-gray-900">{row.size}</td>
                  <td className="p-5 text-gray-600">
                    {displayValue(row.chest)} {unit}
                  </td>
                  <td className="p-5 text-gray-600">
                    {displayValue(row.width)} {unit}
                  </td>
                  <td className="p-5 text-gray-600">
                    {displayValue(row.length)} {unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modern How to Measure Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          How to Measure
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 mb-5">
              <HiOutlineUser size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Chest</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Measure around the fullest part of your chest, keeping the measuring tape horizontal.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-5">
              <HiOutlineScale size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Width</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Measure straight across the chest from armpit to armpit while the garment is laying flat.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 mb-5">
              <HiOutlineScissors size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Length</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Measure from the high point of your shoulder down to the bottom hem of the shirt.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default SizeGuide