"use client";
import Link from "next/link";
import React, { useState } from "react";
import { img_url } from "./urls";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "./Store/slices/WishlistSlice";
import { FaArrowRightToBracket } from "react-icons/fa6";

/**
 * Build a safe image URL with proper formatting
 */
const getImageUrl = (path) => {
  if (!path) return "";
  const base = img_url?.replace(/\/$/, "");
  return `${base}/${path.replace(/^\//, "")}`;
};

/**
 * Premium Product Card Component
 * Features: 
 * - Elegant hover effects with smooth transitions
 * - Animated wishlist interaction
 * - Discount badge and savings display
 * - Premium typography and spacing
 * - Glassmorphic wishlist button
 * - Hover scale and shadow elevation
 */
const ProductCart = ({ product }) => {
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Wishlist state management
  const wishlistItems = useSelector((state) => state.wishlist?.items ?? []);
  const isInWishlist = product?._id && wishlistItems.includes(product._id);

  // Calculate discount percentage
  const discountPercentage = product?.compareAtPrice && product?.sellingPrice
    ? Math.round(((product.compareAtPrice - product.sellingPrice) / product.compareAtPrice) * 100)
    : 0;

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product?._id) return;
    
    // Add haptic feedback (subtle animation class can be added)
    const btn = e.currentTarget;
    btn.style.transform = 'scale(0.8)';
    setTimeout(() => {
      btn.style.transform = '';
    }, 150);
    
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product._id));
    }
  };

  const fallbackImage = "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop";
  const productSlug = product?.slug || product?._id || "#";
  
  // Format currency with proper INR display
  const formatPrice = (price, showFraction = true) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: showFraction ? 2 : 0,
      maximumFractionDigits: showFraction ? 2 : 0,
    }).format(price || 0);
  };

  return (
    <Link
      href={`/product/${productSlug}`}
      className="group block w-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article className="relative bg-white rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-1">
        
        {/* --- IMAGE SECTION WITH PREMIUM OVERLAYS --- */}
        <div className="relative w-full aspect-[4/5] bg-gradient-to-br from-[#fafafa] to-[#f0f0f0] overflow-hidden">
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          )}
          
          {/* Product Image */}
          {product?.images?.length > 0 ? (
            <img
              src={getImageUrl(product.images[0])}
              alt={product.title || "Premium Product"}
              className={`w-full h-full object-contain p-6 transition-all duration-700 ease-out ${
                isHovered ? 'scale-110 rotate-1' : 'scale-100'
              } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackImage;
                setImageLoaded(true);
              }}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 tracking-widest text-xs uppercase font-light">
              No Image
            </div>
          )}

          {/* Discount Badge - Premium Ribbon Style */}
          {discountPercentage > 0 && (
            <div className="absolute top-4 left-4 z-10">
              <div className="relative">
                <div className="bg-black text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                  <span className="text-[11px]">−</span>
                  <span>{discountPercentage}%</span>
                </div>
                <div className="absolute -inset-0.5 bg-black/20 rounded-full blur-sm -z-10" />
              </div>
            </div>
          )}

          {/* Premium Wishlist Button - Glassmorphic Design */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 z-20
              ${isInWishlist 
                ? 'bg-white/90 shadow-md text-black' 
                : 'bg-white/60 hover:bg-white/90 text-gray-600 hover:text-black'
              } hover:shadow-lg hover:scale-110 active:scale-95`}
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            type="button"
          >
            {isInWishlist ? (
              <HiHeart size={20} className="fill-current animate-pop" />
            ) : (
              <HiOutlineHeart size={20} strokeWidth={1.5} className="transition-all" />
            )}
          </button>

          {/* Hover Overlay Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} />
        </div>

        {/* --- PRODUCT INFORMATION SECTION --- */}
        <div className="p-5 bg-white">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              {/* Brand / Category Placeholder - Can be dynamic */}
              {product?.category && (
                <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2 font-medium">
                  {product.category}
                </p>
              )}
              
              {/* Product Title */}
              <h3 className="text-[#111111] font-medium text-[15px] leading-tight tracking-tight line-clamp-2 group-hover:text-black transition-colors duration-300">
                {product?.title || "Untitled Product"}
              </h3>

              {/* Price Section */}
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <span className="text-[17px] font-semibold text-gray-900 tracking-tight">
                  {formatPrice(product?.sellingPrice)}
                </span>
                
                {product?.compareAtPrice > product?.sellingPrice && (
                  <>
                    <span className="text-[13px] text-gray-400 line-through decoration-gray-300">
                      {formatPrice(product.compareAtPrice, false)}
                    </span>
                    <span className="text-[12px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                      Save {formatPrice(product.compareAtPrice - product.sellingPrice, false)}
                    </span>
                  </>
                )}
              </div>

              {/* Additional premium detail - stock status (optional) */}
              {product?.stock > 0 && product?.stock < 10 && (
                <p className="text-[11px] text-amber-600 mt-2 font-medium">
                  Only {product.stock} left
                </p>
              )}
            </div>

            {/* Premium CTA Arrow - Animated on hover */}
            <div className="mt-1">
              <div className={`w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center transition-all duration-300 ${
                isHovered ? 'bg-black text-white translate-x-1' : 'text-gray-400'
              }`}>
                <FaArrowRightToBracket 
                  size={14} 
                  className={`transition-all duration-300 ${
                    isHovered ? 'translate-x-0.5' : ''
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Optional: Quick action hint */}
          <div className={`mt-3 overflow-hidden transition-all duration-500 ${
            isHovered ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <p className="text-[11px] text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <span>View details</span>
              <span className="text-[10px]">→</span>
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCart;

// Add this to your global CSS or tailwind config for the pop animation
// @keyframes pop {
//   0% { transform: scale(1); }
//   50% { transform: scale(1.2); }
//   100% { transform: scale(1); }
// }
// .animate-pop {
//   animation: pop 0.3s ease-out;
// }