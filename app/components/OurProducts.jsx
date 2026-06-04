"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  // Variants for staggered children animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const productCardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
    },
    hover: {
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  // Skeleton loading with shimmer animation
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="py-24 bg-white"
      >
        <TagLineCompo tag="Explore Us" heading="Our Featured Products" />
        <div className="container mx-auto px-4 mt-8">
          <div className="flex justify-center border-b border-gray-200 mb-12">
            <div className="w-64 h-8 bg-gray-100 animate-pulse rounded mb-4"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative overflow-hidden rounded-sm">
                <div className="w-full aspect-[4/5] bg-gray-100"></div>
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          @keyframes shimmer {
            100% {
              transform: translateX(100%);
            }
          }
          .animate-shimmer {
            animation: shimmer 1.5s infinite;
          }
        `}</style>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-24 bg-white"
    >
      <TagLineCompo tag="Explore Us" heading="Our Featured Products" />

      <div className="container mx-auto px-4 mt-8 lg:px-8">
        {/* Animated Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap gap-8 mb-12 justify-center border-b border-gray-200"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              aria-pressed={activeTab === tab.key}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`
                pb-4 text-xs md:text-sm font-medium uppercase tracking-widest transition-colors duration-300 border-b-2 
                ${
                  activeTab === tab.key
                    ? "border-black text-black"
                    : "border-transparent text-gray-400 hover:text-gray-800 hover:border-gray-300"
                }
              `}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Error State with Animation */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="text-center py-10 max-w-lg mx-auto bg-gray-50 rounded-lg"
            >
              <p className="text-gray-600 text-sm tracking-wide">{error}</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => fetchProducts(activeTab)}
                className="mt-6 px-6 py-2 border border-black text-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300"
              >
                Try Again
              </motion.button>
            </motion.div>
          )}

          {/* Products Grid with Staggered Animation */}
          {!error && products.length > 0 && (
            <motion.div
              key="products"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  variants={productCardVariants}
                  whileHover="hover"
                  className="group"
                >
                  <ProductCart product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Empty State Animation */}
          {!error && products.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20 max-w-lg mx-auto flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <HiOutlineEye size={48} className="text-gray-300 mb-6" aria-hidden="true" />
              </motion.div>
              <h3 className="text-xl font-serif text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 text-sm mb-8">
                We're currently updating our catalog for this category. Please check back later or browse other collections.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab("isNewArrival")}
                className="px-8 py-3 border border-black text-black text-xs font-semibold uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300"
              >
                Back to New Arrivals
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated "View All Products" Button */}
        {!error && products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-16 text-center"
          >
            <motion.a
              href="/products"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 border border-black bg-white text-black text-xs font-semibold uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300"
            >
              View All Products
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <HiArrowRight size={16} aria-hidden="true" />
              </motion.span>
            </motion.a>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default OurProducts;