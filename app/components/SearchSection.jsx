"use client"
import React, { useEffect, useState } from 'react'
import { base_url } from './urls'
import axios from 'axios'
import Link from 'next/link'
import { HiOutlineSearch, HiX } from 'react-icons/hi'
import { FiLoader } from 'react-icons/fi'

const SearchSection = ({ onClose }) => {
  const [searchval, setSearchval] = useState("")
  const [searchData, setSearchData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const searchHandel = async (searchdata) => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${base_url}/products/search/?search=${searchdata}`)
      const data = response.data;
      
      if (data.success) {
        setSearchData(data.data || data.products || [])
      } else {
        setSearchData([])
      }
    } catch (error) {
      console.error("Search failed:", error)
      setSearchData([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (searchval.trim().length <= 2) {
      setSearchData([])
      setIsLoading(false)
      return;
    }

    // Debounce: wait 500ms after user stops typing
    const timeoutId = setTimeout(() => {
      searchHandel(searchval.trim()) 
    }, 500);
    
    return () => clearTimeout(timeoutId)
  }, [searchval])

  return (
    // Dark transparent background overlay
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-start pt-20 px-4 sm:px-6">
      
     
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl  flex flex-col">
        
      
        <div className="flex items-center px-4 py-3 border-b border-gray-100 relative">
          <HiOutlineSearch className="text-gray-400 text-2xl mr-3" />
          <input 
            type="search" 
            autoFocus
            value={searchval} 
            onChange={(e) => setSearchval(e.target.value)} 
            placeholder="Search for products..." 
            className="w-full text-lg text-gray-800 placeholder-gray-400 outline-none bg-transparent" 
          />
         <HiX className='absolute -top-2 -right-2  p-1 bg-gray-200 rounded-full text-xl cursor-pointer'  onClick={onClose}/>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto">
          
          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center p-8 text-gray-500">
              <FiLoader className="animate-spin mr-2" size={20} />
              <span>Searching...</span>
            </div>
          )}

          {/* No Results State */}
          {!isLoading && searchval.length > 2 && searchData.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No products found for "{searchval}".
            </div>
          )}

          {/* Render Results */}
          {!isLoading && searchData.length > 0 && (
            <div className="flex flex-col">
              {searchData.map((item) => (
                <Link 
                  href={`/product/${item.slug}`} 
                  key={item._id}
                  onClick={onClose}
                  className="px-6 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 text-gray-700 hover:text-rose-600 font-medium transition-colors flex items-center justify-between"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}
          
        </div>
      </div>
    </div>
  )
}

export default SearchSection