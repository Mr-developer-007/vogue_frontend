'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import {
  FaRegHeart,
  FaHeart,
  FaShippingFast,
  FaRulerHorizontal,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaShareAlt,
  FaCheck,
  FaTag,
  FaExpand,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaLeaf,
  FaMars,
  FaVenus,
  FaTransgenderAlt,
  FaShoppingBag,
  FaBoxOpen,
  FaMinus,
  FaPlus,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import { HiOutlineUser } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import axios from 'axios';
import { base_url, img_url } from '@/app/components/urls';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '@/app/components/Store/slices/WishlistSlice';
import ProductGallery from '@/app/components/ProductGallery';
import ProductSide from '@/app/components/ProductSide';
import OurProducts from '@/app/components/OurProducts';

// ─────── Animation Variants ───────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};




export default function ProductComp({ slug }) {
 const [zoomImgUrl,setZoomImgurl]=useState()

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

 


  // ── Mobile sticky bar scroll tracking ──
 



 

 



  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${base_url}/products/${slug}`);
      const data = await response.data;
      if (data.success) setProductData(data.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (slug) fetchProduct(); }, [slug]);

 



  if (loading) return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="w-12 h-12 rounded-full bg-black"
      />
    </div>
  );

  if (!productData) return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center text-gray-500 font-medium text-lg">
      Product not found
    </div>
  );

 
  const themeColor = productData?.color || '#000000'; 

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 font-sans antialiased selection:bg-gray-200 overflow-x-hidden"
         style={{ '--primary': themeColor } }>
      
      {/* ─── Breadcrumbs ─── */}
      <nav className="relative z-10 bg-[#fafafa]/80 backdrop-blur-md border-b border-gray-100 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center text-xs font-medium text-gray-400 gap-2">
          <a href="/" className="hover:text-black transition-colors">Home</a>
          <span className="text-gray-300">/</span>
          <a href="/products" className="hover:text-black transition-colors">Products</a>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 line-clamp-1">{productData.title}</span>
        </div>
      </nav>

      {/* <div className="relative z-10 container mx-auto px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          
          <motion.div variants={imageReveal} initial="hidden" animate="visible" className="space-y-4">
            <div className="relative group rounded-3xl bg-white overflow-hidden shadow-sm border border-gray-100">
              <Swiper
                style={{ '--swiper-navigation-color': themeColor, '--swiper-pagination-color': themeColor }}
                spaceBetween={0}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                zoom={true}
                modules={[FreeMode, Navigation, Thumbs, Zoom]}
                className="h-[500px] sm:h-[650px] w-full"
              >
                {productData.images?.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="swiper-zoom-container h-full w-full bg-white">
                      <img
                        src={`${img_url}/${img}`}
                        alt={productData.title}
                        className="w-full h-full object-contain p-4 mix-blend-multiply"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/800x1000?text=No+Image'; }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="absolute top-6 right-6 z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-gray-700 shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <FaExpand size={12} className="text-gray-400" /> Zoom
              </motion.div>

              {discount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-6 left-6 z-10 bg-red-500 text-white font-bold px-4 py-1.5 text-xs rounded-full shadow-md"
                >
                  -{discount}%
                </motion.div>
              )}
            </div>

            {productData.images?.length > 1 && (
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={12}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                className="h-24 w-full"
              >
                {productData.images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="h-full w-full rounded-2xl overflow-hidden border-2 border-transparent transition-all duration-300 opacity-60 hover:opacity-100 [&.swiper-slide-thumb-active]:border-black [&.swiper-slide-thumb-active]:opacity-100 bg-white cursor-pointer">
                      <img src={`${img_url}/${img}`} alt="thumb" className="w-full h-full object-cover p-1 mix-blend-multiply" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </motion.div>

          
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col">
            <motion.div variants={fadeUp} className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {productData.productfor && (
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5">
                    {getGenderIcon()} {getGenderText()}
                  </span>
                )}
                {productData.tags?.slice(0, 3).map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <FaTag size={10} className="text-gray-400" /> {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-2 leading-tight">
                {productData.title}
              </h1>
              <p className="text-xs text-gray-400 font-medium">SKU: {productData.sku}</p>
            </motion.div>

            <motion.div variants={fadeUp} className="mb-8 flex flex-wrap items-end justify-between gap-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-extrabold text-gray-900">₹{productData.sellingPrice?.toLocaleString()}</span>
                {productData.compareAtPrice > productData.sellingPrice && (
                  <span className="text-lg text-gray-400 line-through font-medium">₹{productData.compareAtPrice?.toLocaleString()}</span>
                )}
              </div>
              {productData?.color && (
                <div className="flex flex-col items-end gap-1.5">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Color</span>
                  <div className="p-0.5 rounded-full border border-gray-200 bg-white">
                    <div className="w-6 h-6 rounded-full shadow-inner" style={{ backgroundColor: themeColor }} />
                  </div>
                </div>
              )}
            </motion.div>

            <motion.p variants={fadeUp} className="text-gray-500 text-base leading-relaxed mb-8">
              {productData.shortDescription}
            </motion.p>

            
            {productData.size?.length > 0 && (
              <motion.div variants={fadeUp} className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-gray-900">Select Size</span>
                  <button onClick={() => setShowSizeGuide(!showSizeGuide)} className="text-gray-500 hover:text-black text-sm font-medium flex items-center gap-1.5 transition-colors">
                    <FaRulerHorizontal size={14} /> Size Guide {showSizeGuide ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
                  </button>
                </div>

                <AnimatePresence>
                  {showSizeGuide && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }} 
                      className="overflow-hidden mb-6"
                    >
                      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 text-sm">
                        <p className="font-bold mb-3 text-gray-900 text-xs">Size Guide (cm)</p>
                        <div className="grid grid-cols-4 gap-2 text-center text-gray-600">
                          <div className="font-semibold text-black pb-2 border-b border-gray-100">Size</div><div className="font-semibold text-black pb-2 border-b border-gray-100">Chest</div><div className="font-semibold text-black pb-2 border-b border-gray-100">Waist</div><div className="font-semibold text-black pb-2 border-b border-gray-100">Hips</div>
                          <div className="py-1.5">S</div><div className="py-1.5">88-92</div><div className="py-1.5">70-74</div><div className="py-1.5">90-94</div>
                          <div className="py-1.5">M</div><div className="py-1.5">92-96</div><div className="py-1.5">74-78</div><div className="py-1.5">94-98</div>
                          <div className="py-1.5">L</div><div className="py-1.5">96-100</div><div className="py-1.5">78-82</div><div className="py-1.5">98-102</div>
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
                      className={`min-w-[3.5rem] h-12 px-5 rounded-2xl border text-sm font-bold uppercase transition-all duration-200 ${
                        activeSize === size
                          ? 'bg-black text-white border-black shadow-md'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-black hover:text-black'
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center border border-gray-200 rounded-2xl bg-white h-14 shadow-sm">
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleQuantityChange(quantity - 1)} className="px-5 h-full text-gray-400 hover:text-black rounded-l-2xl"><FaMinus size={12} /></motion.button>
                <span className="w-10 text-center text-base font-bold text-black">{quantity}</span>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleQuantityChange(quantity + 1)} className="px-5 h-full text-gray-400 hover:text-black rounded-r-2xl"><FaPlus size={12} /></motion.button>
              </div>

              <motion.button
                ref={addToCartBtnRef}
                whileHover={{ scale: productData.quantity > 0 ? 1.02 : 1 }}
                whileTap={{ scale: productData.quantity > 0 ? 0.98 : 1 }}
                disabled={productData.quantity <= 0}
                onClick={handleAddToCart}
                className={`flex-1 h-14 flex items-center justify-center gap-2 text-sm font-bold rounded-2xl transition-all shadow-sm ${
                  productData.quantity > 0
                    ? 'bg-black text-white hover:bg-gray-800 hover:shadow-lg'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                }`}
              >
                <FaShoppingBag size={16} /> {productData.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => isInWishlist ? dispatch(removeFromWishlist(productData._id)) : dispatch(addToWishlist(productData._id))}
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all bg-white shadow-sm ${
                  isInWishlist
                    ? 'border-red-500 text-red-500 bg-red-50'
                    : 'border-gray-200 text-gray-400 hover:text-black hover:border-black'
                }`}
              >
                <AnimatePresence mode="wait">
                  {isInWishlist ? (
                    <motion.div key="heart" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><FaHeart size={20} /></motion.div>
                  ) : (
                    <motion.div key="heart-outline" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><FaRegHeart size={20} /></motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>

          
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 mb-8 pt-8 border-t border-gray-200">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-gray-700 bg-gray-100 p-2.5 rounded-xl">
                    {b.icon}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-xs">{b.title}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

        
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <span className="text-xs font-bold text-gray-900">Share:</span>
              <div className="flex gap-2">
                {[FaFacebookF, FaInstagram, FaWhatsapp, FaShareAlt].map((Icon, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={idx === 3 ? copyToClipboard : undefined}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:text-black hover:border-black shadow-sm transition-colors"
                  >
                    <Icon size={12} />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

      
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20">
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {['Product Details', 'Specifications', 'Features', 'Shipping'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative px-5 py-2.5 text-sm font-bold rounded-full transition-colors whitespace-nowrap"
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-black rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-black'}`}>
                  {tab}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-8 bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-sm min-h-[300px]">
            <AnimatePresence mode="wait">
              {activeTab === 'Product Details' && (
                <motion.div key="details" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="max-w-3xl">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {productData.description}
                  </p>
                </motion.div>
              )}

              {activeTab === 'Specifications' && (
                <motion.div key="specs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="max-w-3xl">
                  {productData.specifications ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                      {Object.entries(productData.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                          <span className="font-semibold text-gray-900 capitalize text-sm">{key}</span>
                          <span className="text-gray-600 text-sm">{value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic text-sm">No specifications available.</p>
                  )}
                </motion.div>
              )}

              {activeTab === 'Features' && (
                <motion.div key="features" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="max-w-3xl">
                  {productData.features?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {productData.features.map((feature, idx) => (
                        <motion.div key={idx} whileHover={{ x: 5 }} className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50">
                          <div className="bg-white p-1.5 rounded-full shadow-sm text-black"><FaCheck size={10} /></div>
                          <span className="text-gray-700 text-sm font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic text-sm">No features listed.</p>
                  )}
                </motion.div>
              )}

              {activeTab === 'Shipping' && (
                <motion.div key="shipping" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="max-w-4xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gray-50 rounded-2xl text-black"><FaBoxOpen size={20} /></div>
                        <div>
                          <p className="font-bold text-gray-900">Package Details</p>
                          <p className="text-gray-500 mt-1 text-sm">
                            {productData.shipping?.weight > 0 ? `Weight: ${productData.shipping.weight} kg` : 'Premium packaging for safe transit.'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gray-50 rounded-2xl text-black"><FaShippingFast size={20} /></div>
                        <div>
                          <p className="font-bold text-gray-900">Dispatch Time</p>
                          <p className="text-gray-500 mt-1 text-sm">Dispatched within 24-48 hours.</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-3xl p-6 sm:p-8">
                      <h4 className="font-bold text-gray-900 mb-4 pb-4 border-b border-gray-200">Delivery Policy</h4>
                      <ul className="space-y-3 text-gray-600 text-sm font-medium">
                        <li className="flex gap-3 items-start"><FaCheck className="mt-1 text-black flex-shrink-0" size={12} /><span>{productData.shipping?.isFreeShipping ? 'Complimentary shipping on this item.' : 'Standard rates apply based on location.'}</span></li>
                        <li className="flex gap-3 items-start"><FaCheck className="mt-1 text-black flex-shrink-0" size={12} /><span>Cash on delivery available for select postal codes.</span></li>
                        <li className="flex gap-3 items-start"><FaCheck className="mt-1 text-black flex-shrink-0" size={12} /><span>15-day easy return and exchange policy.</span></li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

  
      <AnimatePresence>
        {isMobileStickyVisible && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] lg:hidden"
          >
            <div className="flex items-center justify-between gap-4 max-w-screen-lg mx-auto">
              <div className="flex items-center gap-3 flex-1 overflow-hidden">
                <img src={`${img_url}/${productData.images[0]}`} alt="Product" className="w-12 h-12 rounded-lg object-cover border border-gray-100 bg-gray-50" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{productData.title}</p>
                  <p className="text-xs font-semibold text-gray-500">₹{productData.sellingPrice?.toLocaleString()}</p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                disabled={productData.quantity <= 0}
                onClick={handleAddToCart}
                className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
                  productData.quantity > 0
                    ? 'bg-black text-white active:bg-gray-800 shadow-md'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {productData.quantity > 0 ? 'Add to Cart' : 'Sold Out'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}





<div className='container  mx-auto grid  grid-cols-1  md:grid-cols-2 gap-10 my-4 '>


<ProductGallery productData={productData}  setZoomImgurl={setZoomImgurl}/>


<ProductSide  productData={productData}/>


</div>

{/* <OurProducts /> */}

    </div>
  );
}