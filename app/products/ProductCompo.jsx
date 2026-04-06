'use client';

import axios from 'axios';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { base_url } from '../components/urls';
import ProductCart from '../components/ProductCart';
import { HiArrowRight, HiArrowLeft } from 'react-icons/hi';
import { FiSearch } from 'react-icons/fi'; // Replaced Eye with Search for a cleaner empty state

const ProductCompo = () => {
  const [loader, setLoader] = useState(true);
  const [products, setProducts] = useState([]);
  
  // State to hold pagination info from the API
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  
  const queries = useSearchParams();
  const router = useRouter();
  const pathname = usePathname(); 

  const fetchProduct = async (query) => {
    try {
      setLoader(true);
      const endpoint = query 
        ? `${base_url}/products/get?${query}` 
        : `${base_url}/products/get`;

      const response = await axios.get(endpoint);
      const data = response.data;
      
      if (data.success) {
        setProducts(data.products || data.data || []); 
        setPagination({
          currentPage: data.page || 1,
          totalPages: data.totalPages || 1,
        });
      } else {
        setProducts([]);
        setPagination({ currentPage: 1, totalPages: 1 });
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchProduct(queries.toString());
  }, [queries]);

  // Function to handle page changes by updating the URL
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;

    const params = new URLSearchParams(queries.toString());
    params.set("page", newPage.toString());

    // Push the new URL and scroll to the top smoothly
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  };

  // Loading state (Premium styling)
  if (loader) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-6">
        <div className="w-12 h-12 border-2 border-gray-200 border-t-[#B5945C] rounded-full animate-spin"></div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Curating Collection...</p>
      </div>
    );
  }

  return (
    // Fallback variable in case a parent wrapper doesn't provide the theme color
    <div className="w-full" style={{ '--primary': '#B5945C' }}>
      {products.length > 0 ? (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {products.map((product, index) => (
              <ProductCart key={product._id || index} product={product} />
            ))}
          </div>

          {/* Premium Minimalist Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-24 mb-10 flex items-center justify-center gap-6 sm:gap-10">
              
              {/* Previous Button */}
              <button 
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="flex items-center gap-3 px-6 py-3.5 rounded-full border border-gray-200 bg-white text-xs font-bold uppercase tracking-widest text-gray-500 transition-all duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)] hover:shadow-sm disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-500 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                <HiArrowLeft size={16} /> <span className="hidden sm:inline">Previous</span>
              </button>

              {/* Page Indicator */}
              <div className="text-sm font-medium text-gray-400 tracking-widest uppercase">
                Page <span className="text-gray-900 mx-1">{pagination.currentPage}</span> of <span className="mx-1">{pagination.totalPages}</span>
              </div>

              {/* Next Button */}
              <button 
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="flex items-center gap-3 px-6 py-3.5 rounded-full border border-gray-200 bg-white text-xs font-bold uppercase tracking-widest text-gray-500 transition-all duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)] hover:shadow-sm disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-500 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                <span className="hidden sm:inline">Next</span> <HiArrowRight size={16} />
              </button>

            </div>
          )}
        </>
      ) : (
        // Elegant Empty State
        <div className="text-center py-24 px-6 rounded-3xl bg-white border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] max-w-2xl mx-auto flex flex-col items-center my-10">
          <div className="w-20 h-20 rounded-full bg-[#FCFBFA] flex items-center justify-center mb-8 border border-gray-100 shadow-inner">
            <FiSearch size={28} className="text-[var(--primary)] opacity-70" />
          </div>
          
          <h3 className="text-3xl sm:text-4xl font-serif font-light text-gray-900 mb-4 tracking-tight">
            No Results Found
          </h3>
          
          <p className="text-gray-500 font-light mb-10 max-w-md mx-auto text-base leading-relaxed">
            We couldn't find any pieces matching your refined criteria. Please adjust your filters to explore more of our collection.
          </p>
          
          <button 
            onClick={() => router.push(pathname, { scroll: false })}
            className="px-8 py-4 bg-gray-900 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 hover:bg-[var(--primary)] hover:shadow-xl hover:shadow-[var(--primary)]/20"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCompo;