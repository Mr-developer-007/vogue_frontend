"use client";
import React, { useEffect, useState, useCallback } from "react";
import TagLineCompo from "./TagLineCompo";
import { HiOutlineEye, HiArrowRight } from "react-icons/hi";
import axios from "axios";
import { base_url } from "./urls";
import ProductCart from "./ProductCart";

const OurProducts = () => {
  const [activeTab, setActiveTab] = useState("isNewArrival");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (tabKey) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${base_url}/products/get/${tabKey}`);
      const data = response.data;
      if (data.success) {
        setProducts(data.data);
      } else {
        setProducts([]);
        setError(data.message || "Failed to load products.");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
      setError(err.response?.data?.message || err.message || "Network error.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(activeTab);
  }, [activeTab, fetchProducts]);

  const tabs = [
    { key: "isNewArrival", label: "New Arrivals" },
    { key: "isBestSeller", label: "Best Sellers" },
    { key: "isFeatured", label: "Featured" },
  ];

  // Classic Skeleton Loading State
  if (loading) {
    return (
      <div className="py-24 bg-white">
        <TagLineCompo tag="Explore Us" heading="Our Featured Products" />
        <div className="container mx-auto px-4 mt-8">
          <div className="flex justify-center border-b border-gray-200 mb-12">
             <div className="w-64 h-8 bg-gray-100 animate-pulse rounded mb-4"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse flex flex-col gap-4">
                <div className="w-full aspect-[4/5] bg-gray-100 rounded-sm"></div>
                <div className="w-3/4 h-4 bg-gray-100 rounded"></div>
                <div className="w-1/4 h-4 bg-gray-100 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-white">
      <TagLineCompo tag="Explore Us" heading="Our Featured Products" />

      <div className="container mx-auto px-4 mt-8 lg:px-8">
        
        {/* Classic Underline Tabs */}
        <div className="flex flex-wrap gap-8 mb-12 justify-center border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              aria-pressed={activeTab === tab.key}
              className={`
                pb-4 text-xs md:text-sm font-medium uppercase tracking-widest transition-all duration-300 border-b-2 
                ${
                  activeTab === tab.key
                    ? "border-black text-black"
                    : "border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Clean Error state */}
        {error && (
          <div className="text-center py-10 max-w-lg mx-auto bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm tracking-wide">{error}</p>
            <button
              onClick={() => fetchProducts(activeTab)}
              className="mt-6 px-6 py-2 border border-black text-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Products Grid or Empty State */}
        {!error && products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCart key={product._id} product={product} />
              ))}
            </div>

            <div className="mt-16 text-center">
              <a
                href="/products"
                className="inline-flex items-center gap-3 px-8 py-4 border border-black bg-white text-black text-xs font-semibold uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300"
              >
                View All Products <HiArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </>
        ) : (
          !error && (
            <div className="text-center py-20 max-w-lg mx-auto flex flex-col items-center">
              <HiOutlineEye size={48} className="text-gray-300 mb-6" aria-hidden="true" />
              <h3 className="text-xl font-serif text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 text-sm mb-8">
                We're currently updating our catalog for this category. Please check back later or browse other collections.
              </p>
              <button
                onClick={() => setActiveTab("isNewArrival")}
                className="px-8 py-3 border border-black text-black text-xs font-semibold uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300"
              >
                Back to New Arrivals
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default OurProducts;