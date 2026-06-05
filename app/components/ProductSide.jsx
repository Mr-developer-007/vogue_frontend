"use client"
import React, { useEffect, useRef, useState } from 'react'
import { 
  FaBoxOpen, FaCheck, FaChevronDown, FaChevronUp, FaFacebookF, FaHeart, 
  FaInstagram, FaLeaf, FaMars, FaMinus, FaPlus, FaRegHeart, FaRulerHorizontal, 
  FaShareAlt, FaShieldAlt, FaShippingFast, FaShoppingBag, FaTag, FaTransgenderAlt, 
  FaTruck, FaUndo, FaVenus, FaWhatsapp, FaLock, FaCcVisa, FaCcMastercard, 
  FaCcAmex, FaCcPaypal, FaApplePay, FaGooglePay 
} from 'react-icons/fa'
import { HiOutlineUser } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { base_url, img_url } from './urls';
import { addToWishlist, removeFromWishlist } from './Store/slices/WishlistSlice';

const ProductSide = ({ productData }) => {
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeSize, setActiveSize] = useState('m');
  const [quantity, setQuantity] = useState(1);
  const [isMobileStickyVisible, setIsMobileStickyVisible] = useState(false);

  const addToCartBtnRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist?.items ?? []);
  const isInWishlist = productData?._id && wishlistItems.includes(productData._id);

  const getGenderIcon = () => {
    if (!productData?.productfor) return <HiOutlineUser className="inline mr-1.5" size={14} />;
    switch (productData.productfor.toLowerCase()) {
      case 'male': return <FaMars className="inline mr-1.5" size={14} />;
      case 'female': return <FaVenus className="inline mr-1.5" size={14} />;
      case 'both': case 'unisex': return <FaTransgenderAlt className="inline mr-1.5" size={14} />;
      default: return <HiOutlineUser className="inline mr-1.5" size={14} />;
    }
  };

  const getGenderText = () => {
    if (!productData?.productfor) return 'All';
    return productData.productfor.charAt(0).toUpperCase() + productData.productfor.slice(1);
  };

  const calculateDiscount = () => {
    if (!productData?.compareAtPrice || !productData?.sellingPrice) return 0;
    return Math.round(((productData.compareAtPrice - productData.sellingPrice) / productData.compareAtPrice) * 100);
  };

  const handleAddToCart = async () => {
    try {
      const formData = {
        productid: productData._id,
        quantity,
        price: productData.sellingPrice,
        size: activeSize,
      };
      const response = await axios.post(`${base_url}/cart/addproduct`, formData);
      const data = response.data;
      if (data.success) {
        toast.success(data.message);
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'AddToCart', {
            content_ids: [productData._id],
            content_name: productData.title,
            value: productData.sellingPrice,
            currency: 'INR',
          });
        }
        router.push('/cart');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.status >= 400) {
        toast.error('Please login to continue');
        router.push('/login');
      } else {
        toast.error(error.response?.data?.message || 'Something went wrong');
      }
    }
  };

  const handleQuantityChange = (value) => {
    if (value >= 1 && value <= (productData?.quantity || 10)) setQuantity(value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  const benefits = [
    { 
      icon: <FaTruck size={18} />, 
      title: 'Free Shipping', 
      desc: productData?.shipping?.isFreeShipping ? 'On this item' : 'Orders > ₹2000', 
      color: 'text-amber-700', 
      bg: 'bg-amber-50', 
      border: 'border-amber-200',
      shadow: 'shadow-amber-100'
    },
    { 
      icon: <FaUndo size={18} />, 
      title: 'Easy Returns', 
      desc: '15 days policy', 
      color: 'text-rose-700', 
      bg: 'bg-rose-50', 
      border: 'border-rose-200',
      shadow: 'shadow-rose-100'
    },
    { 
      icon: <FaShieldAlt size={18} />, 
      title: 'Authentic', 
      desc: '100% Original', 
      color: 'text-violet-700', 
      bg: 'bg-violet-50', 
      border: 'border-violet-200',
      shadow: 'shadow-violet-100'
    },
    { 
      icon: <FaLeaf size={18} />, 
      title: 'Eco-Friendly', 
      desc: 'Sustainable', 
      color: 'text-emerald-700', 
      bg: 'bg-emerald-50', 
      border: 'border-emerald-200',
      shadow: 'shadow-emerald-100'
    },
  ];

  const discount = calculateDiscount();
  const themeColor = productData?.color || '#D97706'; 

  useEffect(() => {
    const handleScroll = () => {
      if (addToCartBtnRef.current) {
        const rect = addToCartBtnRef.current.getBoundingClientRect();
        setIsMobileStickyVisible(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="w-full  flex flex-col pt-4 lg:pt-0 px-4">
      
      {/* ========== BADGES ========== */}
      <div className="flex flex-wrap gap-2 mb-4">
        {productData.productfor && (
          <span className="bg-amber-100 border border-amber-200 text-amber-900 px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1.5 uppercase tracking-wider shadow-sm">
            {getGenderIcon()} {getGenderText()}
          </span>
        )}
        {productData.tags?.slice(0, 3).map(tag => (
          <span key={tag} className="bg-stone-50 border border-stone-200 text-stone-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider shadow-sm">
            <FaTag size={10} className="text-amber-600" /> {tag}
          </span>
        ))}
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold tracking-tight text-stone-900 mb-2 leading-tight">
        {productData.title}
      </h1>
      <p className="text-xs text-stone-500 font-medium uppercase tracking-widest mb-6">
        SKU: <span className="text-stone-800">{productData.sku}</span>
      </p>

      {/* ========== PRICE & COLOR ========== */}
      <motion.div variants={fadeUp} className="mb-6 flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-stone-200">
        <div className="flex items-center gap-4">
          <span className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">₹{productData.sellingPrice?.toLocaleString()}</span>
          {productData.compareAtPrice > productData.sellingPrice && (
            <div className="flex flex-col gap-1">
              <span className="text-lg text-stone-400 line-through font-medium">₹{productData.compareAtPrice?.toLocaleString()}</span>
              {discount > 0 && (
                <span className="text-xs font-bold text-rose-800 bg-rose-100 border border-rose-200 px-2.5 py-1 rounded-md w-fit shadow-sm">
                  {discount}% OFF
                </span>
              )}
            </div>
          )}
        </div>
        {productData?.color && (
          <div className="flex flex-col items-end gap-1.5">
            {/* <span className="text-xs text-stone-500 font-bold uppercase tracking-widest"></span> */}
            <div className="p-1 rounded-full border-2 border-stone-200 bg-stone-50 shadow-sm transition-transform hover:scale-110 cursor-pointer">
              <div className="w-6 h-6 rounded-full shadow-inner" style={{ backgroundColor: themeColor }} />
            </div>
          </div>
        )}
      </motion.div>

      {/* ========== SHORT DESCRIPTION ========== */}
      <motion.p variants={fadeUp} className="text-stone-600 text-sm sm:text-base leading-relaxed mb-8 font-light">
        {productData.shortDescription}
      </motion.p>

      {/* ========== SIZE SELECTOR ========== */}
      {productData.size?.length > 0 && (
        <motion.div variants={fadeUp} className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-stone-900 uppercase tracking-wide">Select Size</span>
            <button onClick={() => setShowSizeGuide(!showSizeGuide)} className="text-amber-700 hover:text-amber-900 text-sm font-bold flex items-center gap-1.5 transition-colors underline underline-offset-4">
              <FaRulerHorizontal size={14} /> Size Guide {showSizeGuide ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
            </button>
          </div>

          <AnimatePresence>
            {showSizeGuide && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-6">
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 text-sm shadow-inner shadow-stone-100">
                  <p className="font-bold mb-3 text-stone-900 text-xs uppercase tracking-wider">Measurements (cm)</p>
                  <div className="grid grid-cols-4 gap-2 text-center text-stone-700 text-xs sm:text-sm">
                    <div className="font-bold text-stone-900 pb-2 border-b border-stone-200">Size</div>
                    <div className="font-bold text-stone-900 pb-2 border-b border-stone-200">Chest</div>
                    <div className="font-bold text-stone-900 pb-2 border-b border-stone-200">Waist</div>
                    <div className="font-bold text-stone-900 pb-2 border-b border-stone-200">Hips</div>
                    <div className="py-2 bg-white rounded-md shadow-sm border border-stone-100 mt-1">S</div><div className="py-2 mt-1">88-92</div><div className="py-2 mt-1">70-74</div><div className="py-2 mt-1">90-94</div>
                    <div className="py-2 bg-white rounded-md shadow-sm border border-stone-100">M</div><div className="py-2">92-96</div><div className="py-2">74-78</div><div className="py-2">94-98</div>
                    <div className="py-2 bg-white rounded-md shadow-sm border border-stone-100 mb-1">L</div><div className="py-2 mb-1">96-100</div><div className="py-2 mb-1">78-82</div><div className="py-2 mb-1">98-102</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-wrap gap-3">
            {productData.size.map(size => (
              <motion.button
                key={size}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSize(size)}
                className={`min-w-[4.5rem] h-12 px-4 rounded-xl border-2 text-sm font-bold uppercase transition-all duration-200 ${
                  activeSize === size
                    ? 'bg-amber-200 text-stone-900 border-amber-400 shadow-md shadow-amber-100 scale-105'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-amber-300 hover:text-stone-900 hover:shadow-sm'
                }`}
              >
                {size}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* ========== CART ACTIONS ========== */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center justify-between border-2 border-stone-200 rounded-xl bg-stone-50 h-14  shadow-sm hover:border-stone-300 transition-colors">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleQuantityChange(quantity - 1)} className="px-4 h-full text-stone-500 hover:text-stone-900 flex items-center justify-center"><FaMinus size={12} /></motion.button>
          <span className="w-8 text-center text-lg font-bold text-stone-900">{quantity}</span>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleQuantityChange(quantity + 1)} className="px-4 h-full text-stone-500 hover:text-stone-900 flex items-center justify-center"><FaPlus size={12} /></motion.button>
        </div>
<div className='flex gap-4 flex-1'>
        <motion.button
          ref={addToCartBtnRef}
          whileHover={{ scale: productData.quantity > 0 ? 1.02 : 1 }}
          whileTap={{ scale: productData.quantity > 0 ? 0.98 : 1 }}
          disabled={productData.quantity <= 0}
          onClick={handleAddToCart}
          className={` w-full h-14 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest rounded-xl transition-all border border-transparent ${
            productData.quantity > 0
              ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-stone-900 hover:from-amber-500 hover:to-amber-400 shadow-md shadow-amber-200'
              : 'bg-stone-100 text-stone-400 cursor-not-allowed border-stone-200'
          }`}
        >
          <FaShoppingBag size={18} /> {productData.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => isInWishlist ? dispatch(removeFromWishlist(productData._id)) : dispatch(addToWishlist(productData._id))}
          className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all bg-stone-50 shadow-sm flex-shrink-0 ${
            isInWishlist
              ? 'border-rose-300 text-rose-600 bg-rose-50 shadow-rose-100 shadow-md'
              : 'border-stone-200 text-stone-400 hover:text-rose-500 hover:border-rose-300'
          }`}
        >
          <AnimatePresence mode="wait">
            {isInWishlist ? (
              <motion.div key="heart" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><FaHeart size={22} /></motion.div>
            ) : (
              <motion.div key="heart-outline" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><FaRegHeart size={22} /></motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        </div>
      </motion.div>

      {/* ========== SECURE CHECKOUT ========== */}
      <motion.div variants={fadeUp} className="flex flex-col items-center justify-center gap-3 mb-10 p-5 bg-stone-50 border border-stone-200 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 text-[11px] font-bold text-stone-600 uppercase tracking-widest">
          <FaLock className="text-emerald-600" /> Guaranteed Safe & Secure Checkout
        </div>
        <div className="flex items-center gap-4 text-stone-400 text-3xl">
          <FaCcVisa className="hover:text-blue-700 transition-colors cursor-pointer" />
          <FaCcMastercard className="hover:text-orange-600 transition-colors cursor-pointer" />
          <FaCcAmex className="hover:text-blue-500 transition-colors cursor-pointer" />
          <FaCcPaypal className="hover:text-blue-800 transition-colors cursor-pointer" />
          <FaGooglePay className="hover:text-stone-800 transition-colors cursor-pointer" />
          <FaApplePay className="hover:text-stone-900 transition-colors cursor-pointer" />
        </div>
      </motion.div>

      {/* ========== TRUST BADGES ========== */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 mb-12">
        {benefits.map((b, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -3, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}
            className={`flex items-center gap-3 p-4 rounded-2xl border ${b.border} ${b.bg} transition-all duration-200 shadow-sm ${b.shadow}`}
          >
            <div className={`p-2.5 rounded-xl bg-white shadow-sm border border-white/50 ${b.color}`}>
              {b.icon}
            </div>
            <div>
              <p className="font-bold text-stone-900 text-xs uppercase tracking-wide">{b.title}</p>
              <p className="text-[11px] text-stone-600 mt-0.5 font-medium">{b.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ========== DETAILED CONTENT ========== */}
      <div className="flex flex-col gap-y-12">
        
        <motion.div variants={fadeUp} className="border-t border-stone-200 pt-8">
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-stone-900 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Product Description
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed whitespace-pre-line font-light">
            {productData.description || 'No description available.'}
          </p>
        </motion.div>

        {productData.specifications && (
          <motion.div variants={fadeUp} className='my-10'>
            <h2 className="text-sm font-extrabold uppercase tracking-widest text-stone-900 mb-6 flex items-center gap-2 border-b border-stone-200 pb-4">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> Specifications
            </h2>
            <div className="grid grid-cols-1  gap-4">
              {Object.entries(productData.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-dashed border-stone-200">
                  <span className="font-bold text-stone-800 capitalize text-sm">{key}</span>
                  <span className="text-stone-600 text-sm text-right font-medium">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {productData.features?.length > 0 && (
          <motion.div variants={fadeUp}>
            <h2 className="text-sm my-5 font-extrabold uppercase tracking-widest text-stone-900 mb-6 flex items-center gap-2 border-b border-stone-200 pb-4">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> Key Features
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {productData.features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200 shadow-sm hover:border-amber-300 transition-colors"
                >
                  <div className="bg-amber-100 text-amber-700 p-1.5 rounded-full flex-shrink-0 mt-0.5 border border-amber-200">
                    <FaCheck size={12} />
                  </div>
                  <span className="text-sm text-stone-700 font-medium leading-relaxed">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        <motion.div variants={fadeUp} className="my-10">
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-stone-900 mb-6 flex items-center gap-2 border-b border-stone-200 pb-4">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Shipping & Returns
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div whileHover={{ y: -3 }} className="flex items-start gap-4 p-6 bg-stone-50 rounded-2xl border border-stone-200 shadow-sm">
              <div className="p-3 bg-amber-100 text-amber-800 rounded-xl shadow-sm border border-amber-200"><FaBoxOpen size={24} /></div>
              <div>
                <p className="font-bold text-stone-900 text-sm mb-1">Package Details</p>
                <p className="text-stone-600 text-sm leading-relaxed font-light">
                  {productData.shipping?.weight > 0 && <><span className="font-medium text-stone-800">Weight:</span> {productData.shipping.weight} kg.<br/></>}
                  Delivered in premium, secure packaging ensuring safe transit.
                </p>
              </div>
            </motion.div>
            <motion.div whileHover={{ y: -3 }} className="flex items-start gap-4 p-6 bg-stone-50 rounded-2xl border border-stone-200 shadow-sm">
              <div className="p-3 bg-amber-100 text-amber-800 rounded-xl shadow-sm border border-amber-200"><FaShippingFast size={24} /></div>
              <div>
                <p className="font-bold text-stone-900 text-sm mb-2">Delivery Policy</p>
                <ul className="space-y-2 text-stone-600 text-sm font-light">
                  <li className="flex gap-2 items-start"><FaCheck className="mt-1 text-emerald-600 flex-shrink-0" size={12} /> <span className="leading-snug">{productData.shipping?.isFreeShipping ? 'Complimentary shipping included.' : 'Standard shipping rates apply based on location.'}</span></li>
                  <li className="flex gap-2 items-start"><FaCheck className="mt-1 text-emerald-600 flex-shrink-0" size={12} /> <span className="leading-snug">Dispatched within 24-48 hours.</span></li>
                  <li className="flex gap-2 items-start"><FaCheck className="mt-1 text-emerald-600 flex-shrink-0" size={12} /> <span className="leading-snug">15-day hassle-free return policy.</span></li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ========== SHARE ========== */}
      <motion.div variants={fadeUp} className="flex items-center justify-between gap-4 bg-stone-50 border border-stone-200 p-6 rounded-3xl mt-6 mb-10 shadow-sm text-stone-900">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-1">Love it?</span>
          <span className="text-sm font-medium">Share this product</span>
        </div>
        <div className="flex gap-3">
          {[FaFacebookF, FaInstagram, FaWhatsapp, FaShareAlt].map((Icon, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={idx === 3 ? copyToClipboard : undefined}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-stone-200 shadow-sm text-stone-500 hover:bg-amber-100 hover:text-amber-800 hover:border-amber-300 transition-all"
            >
              <Icon size={16} />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ========== MOBILE STICKY CART ========== */}
      <AnimatePresence>
        {isMobileStickyVisible && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-stone-200 p-4 shadow-[0_-15px_30px_rgba(0,0,0,0.08)] lg:hidden"
          >
            <div className="flex items-center justify-between gap-4 max-w-screen-lg mx-auto">
              <div className="flex items-center gap-3 flex-1 overflow-hidden">
                <div className="relative">
                  <img src={`${img_url}/${productData.thumbnail}`} alt="Product" className="w-12 h-12 rounded-xl object-cover border border-stone-200 bg-stone-50 shadow-sm" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-extrabold text-stone-900 truncate">{productData.title}</p>
                  <p className="text-xs font-bold text-amber-600">₹{productData.sellingPrice?.toLocaleString()}</p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                disabled={productData.quantity <= 0}
                onClick={handleAddToCart}
                className={`px-6 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap shadow-md ${
                  productData.quantity > 0
                    ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-stone-900 shadow-amber-200/50'
                    : 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200 shadow-none'
                }`}
              >
                {productData.quantity > 0 ? 'Add to Cart' : 'Sold Out'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProductSide;