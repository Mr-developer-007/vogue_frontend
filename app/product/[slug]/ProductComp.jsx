'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Zoom } from 'swiper/modules';
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
  FaBoxOpen
} from 'react-icons/fa';
import { HiOutlineUser } from 'react-icons/hi';

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

export default function ProductComp({ slug }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeSize, setActiveSize] = useState('m');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Product Details');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist?.items ?? []);
  const isInWishlist = productData?._id && wishlistItems.includes(productData._id);

  const getGenderIcon = () => {
    if (!productData?.productfor) return <HiOutlineUser className="inline mr-1.5" size={14} />;
    switch (productData.productfor.toLowerCase()) {
      case 'male': return <FaMars className="inline mr-1.5" size={14} />;
      case 'female': return <FaVenus className="inline mr-1.5" size={14} />;
      case 'both':
      case 'unisex': return <FaTransgenderAlt className="inline mr-1.5" size={14} />;
      default: return <HiOutlineUser className="inline mr-1.5" size={14} />;
    }
  };

  const getGenderText = () => {
    if (!productData?.productfor) return 'All';
    const val = productData.productfor.toLowerCase();
    return val.charAt(0).toUpperCase() + val.slice(1);
  };

  const calculateDiscount = () => {
    if (!productData?.compareAtPrice || !productData?.sellingPrice) return 0;
    return Math.round(((productData.compareAtPrice - productData.sellingPrice) / productData.compareAtPrice) * 100);
  };

  const handleQuantityChange = (value) => {
    if (value >= 1 && value <= (productData?.quantity || 10)) {
      setQuantity(value);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${base_url}/products/${slug}`);
      const data = await response.data;
      if (data.success) {
        setProductData(data.data);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) fetchProduct();
  }, [slug]);

  const handleAddToCart = async () => {
    try {
      const formData = {
        productid: productData._id,
        quantity,
        price: productData.sellingPrice,
        size: activeSize
      };
      const response = await axios.post(`${base_url}/cart/addproduct`, formData);
      const data = await response.data;
      if (data.success) {
        toast.success(data.message);
        router.push("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.status >= 400) {
        toast.error("Please login to continue");
        router.push('/login');
      } else {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  const benefits = [
    { icon: <FaTruck />, title: 'Free Shipping', desc: productData?.shipping?.isFreeShipping ? 'On this item' : 'Orders > ₹2000' },
    { icon: <FaUndo />, title: 'Easy Returns', desc: '15 days policy' },
    { icon: <FaShieldAlt />, title: 'Authentic', desc: '100% Original' },
    { icon: <FaLeaf />, title: 'Eco-Friendly', desc: 'Sustainable' }
  ];

  if (loading) return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-gray-300 border-t-[#B5945C] rounded-full animate-spin"></div>
    </div>
  );
  if (!productData) return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center text-gray-500 font-light tracking-wide">
      Product not found
    </div>
  );

  const discount = calculateDiscount();
  
  // Set the dynamic theme color from backend, fallback to luxury gold
  const themeColor = productData?.color || '#B5945C';

  return (
    <div 
      className="min-h-screen text-gray-800 font-sans antialiased bg-[#FCFBFA]"
      style={{ '--primary': themeColor }}
    >
      {/* --- Breadcrumbs --- */}
      <nav className="bg-white/70 backdrop-blur-md border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center text-xs tracking-wide text-gray-500 gap-2">
            <a href="/" className="hover:text-[var(--primary)] transition-colors">Home</a>
            <span className="text-gray-300">/</span>
            <a href="/products" className="hover:text-[var(--primary)] transition-colors">Products</a>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">{productData.title}</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          
          {/* --- LEFT: Product Images --- */}
          <div className="space-y-6">
            <div className="relative bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden group border border-gray-100">
              <Swiper
                style={{ '--swiper-navigation-color': themeColor, '--swiper-pagination-color': themeColor }}
                spaceBetween={0}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                zoom={true}
                modules={[FreeMode, Navigation, Thumbs, Zoom]}
                className="h-[500px] sm:h-[650px] w-full"
              >
                {productData.images?.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="swiper-zoom-container h-full w-full bg-[#FBFBFA]">
                      <img
                        src={`${img_url}/${img}`}
                        alt={productData.title}
                        className="w-full h-full object-contain p-8 mix-blend-multiply"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/800x1000?text=No+Image"; }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="absolute top-6 right-6 z-10 bg-white/90 backdrop-blur-md px-4 py-2 text-xs font-semibold text-gray-700 rounded-full flex items-center gap-2 shadow-sm cursor-pointer hover:bg-white transition-all">
                <FaExpand size={12} className="text-[var(--primary)]" /> Zoom
              </div>

              {discount > 0 && (
                <div className="absolute top-6 left-6 z-10 bg-[var(--primary)] text-white px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-sm shadow-md">
                  {discount}% OFF
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {productData.images?.length > 1 && (
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={16}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                className="h-28 w-full"
              >
                {productData.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="h-full w-full bg-white rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent transition-all duration-300 opacity-60 hover:opacity-100 [&.swiper-slide-thumb-active]:border-[var(--primary)] [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:shadow-lg">
                      <img src={`${img_url}/${img}`} alt="thumb" className="w-full h-full object-cover p-2 mix-blend-multiply" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* --- RIGHT: Product Details --- */}
          <div className="flex flex-col">
            {/* Badges */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-3 mb-5">
                {productData.productfor && (
                  <span className="bg-white border border-gray-200 text-gray-700 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full flex items-center gap-1.5 shadow-sm">
                    {getGenderIcon()} {getGenderText()}
                  </span>
                )}
                {productData.tags?.slice(0, 3).map(tag => (
                  <span key={tag} className="bg-gray-50 text-gray-500 text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5 border border-gray-100">
                    <FaTag size={10} className="text-[var(--primary)]" /> {tag}
                  </span>
                ))}
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-4 leading-[1.1]">
                {productData.title}
              </h1>
              <p className="text-sm text-gray-400 uppercase tracking-widest font-medium">SKU: {productData.sku}</p>
            </div>

            {/* Price & Color Row */}
            <div className="mb-8 pb-8 border-b border-gray-100 flex flex-wrap items-end justify-between gap-6">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-light text-gray-900">₹{productData.sellingPrice?.toLocaleString()}</span>
                {productData.compareAtPrice > productData.sellingPrice && (
                  <span className="text-lg text-gray-400 line-through font-light">₹{productData.compareAtPrice?.toLocaleString()}</span>
                )}
              </div>
              
              {/* Premium Color Swatch */}
              {productData?.color && (
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Selected Color</span>
                  <div className="flex items-center justify-center p-1 border-2 border-gray-200 rounded-full">
                    <div 
                      className="h-8 w-8 rounded-full shadow-inner" 
                      style={{ backgroundColor: themeColor }}
                      title={`Color: ${themeColor}`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Short description */}
            <p className="text-gray-500 text-lg leading-relaxed mb-10 font-light">
              {productData.shortDescription}
            </p>

            {/* Size selector */}
            {productData.size?.length > 0 && (
              <div className="mb-10">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-900">Select Size</span>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-gray-500 hover:text-[var(--primary)] text-sm flex items-center gap-2 transition-colors font-medium"
                  >
                    <FaRulerHorizontal size={14} /> Size Guide
                  </button>
                </div>

                {showSizeGuide && (
                  <div className="mb-6 p-6 bg-white border border-gray-100 shadow-sm text-sm text-gray-600 rounded-2xl">
                    <p className="font-semibold mb-4 text-gray-900 uppercase tracking-wider text-xs">Size Guide (cm)</p>
                    <div className="grid grid-cols-4 gap-3 text-center text-sm font-light">
                      <div className="font-medium text-gray-900 pb-2 border-b border-gray-100">Size</div>
                      <div className="font-medium text-gray-900 pb-2 border-b border-gray-100">Chest</div>
                      <div className="font-medium text-gray-900 pb-2 border-b border-gray-100">Waist</div>
                      <div className="font-medium text-gray-900 pb-2 border-b border-gray-100">Hips</div>
                      <div className="py-2">S</div><div className="py-2">88-92</div><div className="py-2">70-74</div><div className="py-2">90-94</div>
                      <div className="py-2">M</div><div className="py-2">92-96</div><div className="py-2">74-78</div><div className="py-2">94-98</div>
                      <div className="py-2">L</div><div className="py-2">96-100</div><div className="py-2">78-82</div><div className="py-2">98-102</div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-4">
                  {productData.size.map((size) => (
                    <button
                      key={size}
                      onClick={() => setActiveSize(size)}
                      className={`min-w-[3.5rem] h-12 px-6 text-sm font-medium transition-all duration-300 rounded-full border
                        ${activeSize === size
                          ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-lg shadow-[var(--primary)]/30'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-[var(--primary)] hover:text-[var(--primary)] shadow-sm'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center border border-gray-200 rounded-full w-fit bg-white h-14 shadow-sm">
                <button onClick={() => handleQuantityChange(quantity - 1)} className="px-5 h-full text-gray-400 hover:text-[var(--primary)] rounded-l-full transition-colors font-light text-xl">-</button>
                <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                <button onClick={() => handleQuantityChange(quantity + 1)} className="px-5 h-full text-gray-400 hover:text-[var(--primary)] rounded-r-full transition-colors font-light text-xl">+</button>
              </div>

              <button
                disabled={productData.quantity <= 0}
                onClick={handleAddToCart}
                className={`flex-1 h-14 flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300
                  ${productData.quantity > 0
                    ? 'bg-gray-900 text-white hover:bg-[var(--primary)] hover:shadow-xl hover:shadow-[var(--primary)]/20'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              >
                <FaShoppingBag size={16} /> {productData.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>

              <button
                onClick={() => {
                  if (isInWishlist) dispatch(removeFromWishlist(productData._id));
                  else dispatch(addToWishlist(productData._id));
                }}
                className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 shadow-sm
                  ${isInWishlist
                    ? 'border-[var(--primary)] text-[var(--primary)] bg-white shadow-[var(--primary)]/10'
                    : 'border-gray-200 text-gray-400 bg-white hover:text-[var(--primary)] hover:border-[var(--primary)]'}`}
              >
                {isInWishlist ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
              </button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-6 mb-10 py-8 border-y border-gray-100">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="text-[var(--primary)] bg-white border border-gray-100 shadow-sm p-3.5 rounded-full">
                    {b.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm tracking-wide">{b.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social share */}
            <div className="flex items-center gap-6">
              <span className="text-xs font-bold text-gray-900 uppercase tracking-widest">Share</span>
              <div className="flex gap-3">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all shadow-sm"><FaFacebookF size={14} /></button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all shadow-sm"><FaInstagram size={14} /></button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all shadow-sm"><FaWhatsapp size={14} /></button>
                <button onClick={copyToClipboard} className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all shadow-sm"><FaShareAlt size={14} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* --- TABS SECTION --- */}
        <div className="mt-24">
          <div className="border-b border-gray-200">
            <nav className="flex w-full overflow-x-auto overflow-y-hidden gap-10">
              {['Product Details', 'Specifications', 'Features', 'Shipping'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 text-nowrap text-sm font-bold tracking-widest uppercase transition-all duration-300 border-b-2 -mb-px
                    ${activeTab === tab
                      ? 'border-[var(--primary)] text-[var(--primary)]'
                      : 'border-transparent text-gray-400 hover:text-gray-900 hover:border-gray-300'}`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-12">
            {activeTab === 'Product Details' && (
              <div className="max-w-4xl">
                <p className="text-gray-600 leading-loose text-lg font-light whitespace-pre-line">
                  {productData.description}
                </p>
              </div>
            )}

            {activeTab === 'Specifications' && (
              <div className="max-w-3xl">
                {productData.specifications ? (
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden divide-y divide-gray-100">
                    {Object.entries(productData.specifications).map(([key, value]) => (
                      <div key={key} className="flex flex-col sm:flex-row sm:justify-between py-5 px-8 hover:bg-gray-50 transition-colors">
                        <span className="font-semibold text-gray-900 capitalize text-sm uppercase tracking-wide">{key}</span>
                        <span className="text-gray-600 font-light sm:text-right mt-1 sm:mt-0">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 font-light italic">No specifications available for this piece.</p>
                )}
              </div>
            )}

            {activeTab === 'Features' && (
              <div className="max-w-4xl">
                {productData.features?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {productData.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                        <div className="bg-gray-50 p-2 rounded-full mt-0.5">
                          <FaCheck className="text-[var(--primary)]" size={12} />
                        </div>
                        <span className="text-gray-700 font-light leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 font-light italic">No features listed.</p>
                )}
              </div>
            )}

            {activeTab === 'Shipping' && (
              <div className="max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <div className="flex items-start gap-5">
                      <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-full text-[var(--primary)]">
                        <FaBoxOpen size={22} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 tracking-wide">Package Details</p>
                        <p className="text-gray-500 mt-1.5 font-light leading-relaxed">
                          {productData.shipping?.weight > 0 ? `Weight: ${productData.shipping.weight} kg` : 'Standard luxury packaging applies to ensure safe transit.'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-5">
                      <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-full text-[var(--primary)]">
                        <FaShippingFast size={22} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 tracking-wide">Dispatch Time</p>
                        <p className="text-gray-500 mt-1.5 font-light leading-relaxed">Usually dispatched securely within 24-48 hours.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                    <h4 className="font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100 uppercase tracking-widest text-sm">Delivery Policy</h4>
                    <ul className="space-y-4 text-gray-600 font-light">
                      <li className="flex gap-4 items-start">
                        <FaCheck className="mt-1 text-[var(--primary)] flex-shrink-0" size={14} />
                        <span>{productData.shipping?.isFreeShipping ? "Complimentary Shipping included on this item." : "Standard global shipping rates apply at checkout."}</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <FaCheck className="mt-1 text-[var(--primary)] flex-shrink-0" size={14} />
                        <span>Cash on Delivery available for select premier postal codes.</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <FaCheck className="mt-1 text-[var(--primary)] flex-shrink-0" size={14} />
                        <span>15-Day hassle-free return policy on damaged or defective items.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}