"use client"
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useSelector } from 'react-redux'

const FilterCompo = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [openSections, setOpenSections] = useState(["category", "price"]) 
  
  const { categories, loading } = useSelector(state => state.category);

  // Local state to keep UI in sync with URL
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedPrice, setSelectedPrice] = useState("")

  // Sync state with URL parameters on mount and when URL changes
  useEffect(() => {
    const urlCategory = searchParams.get("category")
    const urlMinPrice = searchParams.get("minPrice")
    const urlMaxPrice = searchParams.get("maxPrice")

    setSelectedCategory(urlCategory || "")
    if (urlMinPrice && urlMaxPrice) {
      setSelectedPrice(`${urlMinPrice}-${urlMaxPrice}`)
    } else {
      setSelectedPrice("")
    }
       setIsFilterOpen(false)
  }, [searchParams])

  const toggleSection = (sectionId) => {
    setOpenSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
 
  }

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setSelectedPrice(value);

    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      const [min, max] = value.split("-");
      params.set("minPrice", min);
      params.set("maxPrice", max);
    } else {
      params.delete("minPrice");
      params.delete("maxPrice");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const clearFilters = () => {
    setSelectedCategory("")
    setSelectedPrice("")
    router.push(pathname, { scroll: false })
    if (window.innerWidth < 1024) setIsFilterOpen(false)
  }

  const priceRanges = [
    { min: 0, max: 400 },
    { min: 400, max: 600 },
    { min: 600, max: 900 },
    { min: 900, max: 1200 }
  ]

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-black text-white p-3 rounded-full shadow-lg hover:bg-rose-800 transition-colors"
        aria-label="Toggle filters"
      >
        {isFilterOpen ? <FiX size={24} /> : <FiFilter size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isFilterOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Filter Sidebar */}
      <div className={`
        fixed top-14 lg:top-0 lg:sticky left-0 h-full lg:h-auto
        w-80 lg:w-64 bg-white shadow-xl lg:shadow-none
        transform transition-transform duration-300 ease-in-out
        z-40 lg:z-auto
        ${isFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full overflow-y-auto p-6">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-stone-600">Filters</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="lg:hidden text-stone-600 hover:text-rose-800"
              aria-label="Close filters"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Filter Sections */}
          <div className="space-y-6">

            {/* CATEGORY SECTION */}
            <div className="border-b border-stone-200 pb-6">
              <button
                onClick={() => toggleSection("category")}
                className="flex items-center justify-between w-full text-left mb-4"
              >
                <h3 className="text-lg font-semibold text-stone-600 hover:text-rose-800 transition-colors">
                  Category
                </h3>
                {openSections.includes("category") ? (
                  <FiChevronUp className="text-stone-600" />
                ) : (
                  <FiChevronDown className="text-stone-600" />
                )}
              </button>

              <div className={`space-y-3 overflow-hidden transition-all duration-200 ${!openSections.includes("category") ? 'h-0 opacity-0' : 'h-auto opacity-100'}`}>
                {!loading && categories.length > 0 && categories.map((option) => {
                  return (
                    <div key={option._id} className="flex items-center">
                      <input
                        type="radio"
                        id={option._id}
                        name="category"
                        value={option._id}
                        checked={selectedCategory === option._id}
                        onChange={handleCategoryChange}
                        className="w-4 h-4 text-rose-800 bg-stone-100 border-stone-300 rounded focus:ring-rose-800 focus:ring-2"
                      />
                      <label
                        htmlFor={option._id}
                        className="ml-3 text-stone-600 hover:text-rose-800 cursor-pointer transition-colors"
                      >
                        {option.title}
                      </label>
                    </div>
                  )
                })}
              </div> 
            </div>

            {/* PRICE SECTION */}
            <div className="border-b border-stone-200 pb-6">
              <button
                onClick={() => toggleSection("price")}
                className="flex items-center justify-between w-full text-left mb-4"
              >
                <h3 className="text-lg font-semibold text-stone-600 hover:text-rose-800 transition-colors">
                  Price 
                </h3>
                {openSections.includes("price") ? (
                  <FiChevronUp className="text-stone-600" />
                ) : (
                  <FiChevronDown className="text-stone-600" />
                )}
              </button>

              <div className={`space-y-3 overflow-hidden transition-all duration-200 ${!openSections.includes("price") ? 'h-0 opacity-0' : 'h-auto opacity-100'}`}>
                {priceRanges.map((item, index) => {
                  const rangeValue = `${item.min}-${item.max}`
                  return (
                    <div key={index} className='flex items-center gap-2'>
                      <input 
                        type="radio" 
                        name="price" 
                        id={`price-${index}`}
                        value={rangeValue}
                        checked={selectedPrice === rangeValue}
                        onChange={handlePriceChange}
                        className="w-4 h-4 text-rose-800 bg-stone-100 border-stone-300 rounded focus:ring-rose-800 focus:ring-2"
                      />
                      <label 
                        htmlFor={`price-${index}`}
                        className="ml-1 text-stone-600 hover:text-rose-800 cursor-pointer transition-colors"
                      >
                        ₹<span>{item.min}</span> - <span>{item.max}</span>
                      </label>
                    </div>
                  )
                })}
              </div> 
            </div>

          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-4">
            <button 
              onClick={() => {
                if (window.innerWidth < 1024) setIsFilterOpen(false)
              }}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-rose-800 transition-colors font-medium lg:hidden"
            >
              Close Menu
            </button>
            <button 
              onClick={clearFilters}
              className="w-full border border-stone-300 text-stone-600 py-3 rounded-lg hover:text-rose-800 hover:border-rose-800 transition-colors font-medium"
            >
              Clear All
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

export default FilterCompo