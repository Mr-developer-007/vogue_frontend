"use client"
import Link from 'next/link';
import React from 'react'
import { img_url } from './urls'; // Ensure this path is correct
import { HiOutlineEye, HiOutlineHeart, HiShoppingBag, HiStar } from 'react-icons/hi';
import { TbGenderMale, TbGenderFemale, TbGenderBigender } from "react-icons/tb";

const calculateDiscount = (sellingPrice, compareAtPrice) => {
    if (!compareAtPrice || compareAtPrice <= sellingPrice) return 0;
    return Math.round(((compareAtPrice - sellingPrice) / compareAtPrice) * 100);
};

const ProductCart = ({ product }) => {

    const discount = calculateDiscount(product.sellingPrice, product.compareAtPrice);

    // Handler to stop Link navigation when clicking buttons
    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevents navigating to the product page
        e.stopPropagation();
        // Add your context/redux logic here
    };

    const handleActionClick = (e, action) => {
        e.preventDefault();
        e.stopPropagation();
    };

    // Helper to render gender icon
    const renderGenderIcon = (type) => {
        switch (type?.toLowerCase()) {
            case 'male':
                return <TbGenderMale size={18} className="text-blue-500" title="Men" />;
            case 'female':
                return <TbGenderFemale size={18} className="text-pink-500" title="Women" />;
            default: // unisex or others
                return <TbGenderBigender size={18} className="text-purple-500" title="Unisex" />;
        }
    };

    return (
        <Link 
            href={`/product/${product.slug}`}
            className="group relative block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-rose-200 hover:shadow-2xl transition-all duration-500"
        >
            
            {/* --- IMAGE SECTION --- */}
            <div className="relative h-[280px] w-full overflow-hidden bg-gray-50">
                
                {/* Product Image */}
                {product.images && product.images.length > 0 ? (
                    <img 
                        src={`${img_url}/${product.images[0]}`} 
                        alt={product.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop";
                        }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                        <span className="text-sm font-medium">No Image</span>
                    </div>
                )}

                {/* Floating Tags (Discount) */}
                {discount > 0 && (
                    <div className="absolute top-3 left-3 z-10">
                        <span className="bg-rose-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-sm tracking-wide">
                            -{discount}%
                        </span>
                    </div>
                )}

                {/* Floating Tags (Gender Symbol) */}
                <div className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-sm border border-white/50">
                    {renderGenderIcon(product.productfor)}
                </div>

                {/* Side Actions (Wishlist/View) */}
                <div className="absolute top-12 right-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <button 
                        onClick={(e) => handleActionClick(e, 'Wishlist')}
                        className="bg-white p-2 rounded-full text-gray-600 hover:bg-rose-500 hover:text-white transition-colors shadow-md"
                        title="Add to Wishlist"
                    >
                        <HiOutlineHeart size={18} />
                    </button>
                    <button 
                        onClick={(e) => handleActionClick(e, 'QuickView')}
                        className="bg-white p-2 rounded-full text-gray-600 hover:bg-blue-600 hover:text-white transition-colors shadow-md"
                        title="Quick View"
                    >
                        <HiOutlineEye size={18} />
                    </button>
                </div>

                {/* 'Proper' Add to Cart Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <button 
                        onClick={handleAddToCart}
                        className="w-full bg-gray-900/95 backdrop-blur hover:bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium text-sm shadow-lg hover:shadow-xl transition-all active:scale-95"
                    >
                        <HiShoppingBag size={16} className="mb-0.5" /> 
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* --- CONTENT SECTION --- */}
            <div className="p-4">
                {/* Category & Rating Row */}
                <div className="flex justify-between items-start mb-1">
                    <div className="flex flex-wrap gap-1">
                        {product.categories && product.categories.slice(0, 1).map((cat, idx) => (
                            <span key={idx} className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                {cat.title || 'Collection'}
                            </span>
                        ))}
                    </div>
                    
                    {/* Compact Rating */}
                    <div className="flex items-center gap-1">
                        <HiStar className="text-amber-400" size={12} />
                        <span className="text-xs text-gray-500 font-medium">4.8</span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-gray-800 font-semibold text-[15px] leading-tight mb-1 truncate hover:text-rose-600 transition-colors">
                    {product.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs text-gray-500 line-clamp-1 mb-3">
                    {product.shortDescription || "Premium quality apparel for your lifestyle."}
                </p>

                {/* Price Row */}
                <div className="flex items-center gap-2 border-t border-dashed border-gray-100 pt-3">
                    <span className="text-lg font-bold text-gray-900">
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.sellingPrice)}
                    </span>
                    
                    {product.compareAtPrice > product.sellingPrice && (
                        <span className="text-xs text-gray-400 line-through decoration-gray-300">
                            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.compareAtPrice)}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    )
}

export default ProductCart