"use client"
import axios from 'axios'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { base_url } from '../components/urls'
import ProductCart from '../components/ProductCart'
import { HiArrowRight, HiArrowLeft, HiOutlineEye } from 'react-icons/hi'
import { FiLoader } from 'react-icons/fi'

const ProductCompo = () => {
  const [loader, setLoader] = useState(true)
  const [products, setProducts] = useState([])
  
  // NEW: State to hold pagination info from the API
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  })
  
  const queries = useSearchParams()
  const router = useRouter()
  const pathname = usePathname() // Needed to construct the new URL properly

  const fetchProduct = async (query) => {
    try {
      setLoader(true)
      const endpoint = query 
        ? `${base_url}/products/get?${query}` 
        : `${base_url}/products/get`

      const response = await axios.get(endpoint)
      const data = response.data;
      
      if (data.success) {
        setProducts(data.products || data.data || []); 
        // NEW: Save the pagination data returned by your backend
        setPagination({
          currentPage: data.page || 1,
          totalPages: data.totalPages || 1,
        });
      } else {
        setProducts([]);
        setPagination({ currentPage: 1, totalPages: 1 });
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
      setProducts([])
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    fetchProduct(queries.toString())
  }, [queries])

  // NEW: Function to handle page changes by updating the URL
  const handlePageChange = (newPage) => {
    // Prevent out of bounds clicking
    if (newPage < 1 || newPage > pagination.totalPages) return;

    // Grab current parameters so we don't lose active filters (like category/price)
    const params = new URLSearchParams(queries.toString());
    
    // Set the new page
    params.set("page", newPage.toString());

    // Push the new URL and scroll to the top of the product grid
    router.push(`${pathname}?${params.toString()}`);
  }

  // Loading state
  if (loader) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <FiLoader className="animate-spin text-5xl text-black" />
        <p className="font-mono font-bold uppercase tracking-widest text-black">Loading Drops...</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <ProductCart key={product._id || index} product={product} />
            ))}
          </div>

          {/* NEW: Funky Brutalist Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-6 font-mono">
              
              {/* Previous Button */}
              <button 
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="flex items-center gap-2 px-6 py-3 border-2 border-black bg-white text-black font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black"
              >
                <HiArrowLeft size={20} /> Prev
              </button>

              {/* Page Indicator */}
              <div className="px-6 py-3 border-2 border-black bg-rose-200 text-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                {pagination.currentPage} / {pagination.totalPages}
              </div>

              {/* Next Button */}
              <button 
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="flex items-center gap-2 px-6 py-3 border-2 border-black bg-white text-black font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black"
              >
                Next <HiArrowRight size={20} />
              </button>

            </div>
          )}
        </>
      ) : (
        // Funky Empty State
        <div className="text-center py-16 border-4 border-black border-dashed max-w-2xl mx-auto bg-gray-50 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="mx-auto w-24 h-24 border-2 border-black bg-white flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-3">
            <HiOutlineEye size={40} className="text-black" />
          </div>
          <h3 className="text-2xl font-black font-mono uppercase tracking-widest text-black mb-4">Nothing Here!</h3>
          <p className="text-black font-mono mb-8 max-w-md mx-auto text-sm leading-relaxed">
            We couldn't find any products for these exact filters. Try poking around somewhere else!
          </p>
          
          <button 
            onClick={() => router.push(pathname, { scroll: false })}
            className="px-8 py-3 bg-black text-white font-mono font-bold uppercase tracking-widest border-2 border-black hover:bg-white hover:text-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductCompo