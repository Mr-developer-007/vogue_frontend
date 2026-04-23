"use client";
import Link from "next/link";
import { img_url } from "./urls";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "./Store/slices/WishlistSlice";
import { FaArrowRightToBracket } from "react-icons/fa6";

export default function ProductCart({ product }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist?.items ?? []);
  const isInWishlist = product?._id && wishlistItems.includes(product._id);
  
  // Dynamic color & image parsing
  const themeColor = product?.color || '#B5945C';
  const imgPath = product?.images?.[0] 
    ? `${img_url?.replace(/\/$/, "")}/${product.images[0].replace(/^\//, "")}` 
    : "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop";
  
  const discount = product?.compareAtPrice && product?.sellingPrice 
    ? Math.round(((product.compareAtPrice - product.sellingPrice) / product.compareAtPrice) * 100) : 0;

  const toggleWishlist = (e) => {
    e.preventDefault();
    if (product?._id) dispatch(isInWishlist ? removeFromWishlist(product._id) : addToWishlist(product._id));
  };

  const formatPrice = (p) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(p || 0);

  return (
    <Link href={`/product/${product?.slug || product?._id || "#"}`} style={{ '--primary': themeColor }} className=" block w-full outline-none">
      <article className="relative bg-white rounded-3xl overflow-hidden transition-all duration-300 shadow-sm  border border-gray-100 flex flex-col h-full">
        
        {/* --- Image Section --- */}
        <div className="relative w-full  bg-[#FBFBFA] rounded-t-3xl overflow-hidden">
          <img src={imgPath} alt={product?.title} loading="lazy" className="w-full h-[350px] object-fit  mix-blend-multiply transition-transform duration-500 " />
          
          {discount > 0 && (
            <span className="absolute top-4 left-4 bg-[var(--primary)] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md uppercase">
              {discount}% OFF
            </span>
          )}

          <button onClick={toggleWishlist} className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all z-10 ${isInWishlist ? 'bg-white shadow-md' : 'bg-white/70 hover:bg-white text-gray-400 hover:text-[var(--primary)]'}`}>
            {isInWishlist ? <HiHeart size={18} className="fill-[var(--primary)] scale-110" /> : <HiOutlineHeart size={18} />}
          </button>
        </div>

        {/* --- Details Section --- */}
        <div className="p-5 flex flex-col flex-grow justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product?.color && <span className="w-2 h-2 rounded-full border border-gray-200" style={{ backgroundColor: themeColor }} />}
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">{product?.category || "Luxury"}</p>
            </div>
            <h3 className="text-gray-900 font-light text-base leading-snug line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
              {product?.title || "Untitled Product"}
            </h3>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <span className="text-lg font-medium text-gray-900 pr-2">{formatPrice(product?.sellingPrice)}</span>
              {discount > 0 && <span className="text-xs text-gray-400 line-through">{formatPrice(product?.compareAtPrice)}</span>}
            </div>
            {/* Animated CTA Arrow */}
            <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center transition-all duration-300 text-gray-400 group-hover:bg-[var(--primary)] group-hover:border-[var(--primary)] group-hover:text-white group-hover:translate-x-1 group-hover:shadow-[var(--primary)]/30">
              <FaArrowRightToBracket size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}