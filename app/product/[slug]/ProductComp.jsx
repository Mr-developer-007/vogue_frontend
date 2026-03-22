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
import { MdLocalOffer } from 'react-icons/md';
import { HiOutlineUser } from 'react-icons/hi';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import axios from 'axios';
import { base_url, img_url } from '@/app/components/urls';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function ProductComp({ slug }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeSize, setActiveSize] = useState('m');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Product Details');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRouter();

  // --- Helpers ---
  const getGenderIcon = () => {
    if (!productData?.productfor) return <HiOutlineUser className="inline mr-1" size={14} />;
    switch(productData.productfor.toLowerCase()) {
      case 'male': return <FaMars className="inline mr-1" size={14} />;
      case 'female': return <FaVenus className="inline mr-1" size={14} />;
      case 'both':
      case 'unisex': return <FaTransgenderAlt className="inline mr-1" size={14} />;
      default: return <HiOutlineUser className="inline mr-1" size={14} />;
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

  const handelAddtoCart = async () => {
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
        route.push("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.status >= 400) {
        toast.error("Please login to continue");
        route.push('/login');
      } else {
        toast.error(error.response.data.message);
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
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
    </div>
  );
  if (!productData) return (
    <div className="min-h-screen bg-white flex items-center justify-center text-gray-500 font-bold uppercase tracking-widest text-lg">
      Product not found
    </div>
  );

  const discount = calculateDiscount();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* --- Breadcrumbs --- */}
      <nav className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-xs text-gray-400 font-bold uppercase tracking-widest flex-wrap gap-2">
            <a href="/" className="hover:text-indigo-600 transition-colors">Home</a>
            <span className="text-gray-300">/</span>
            <a href="/products" className="hover:text-indigo-600 transition-colors">Products</a>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 bg-gray-100 px-2 py-0.5 rounded-sm">{productData.title}</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          
          {/* --- LEFT: Image Gallery --- */}
          <div className="space-y-4">
            <div className="relative group border-2 border-gray-100 bg-gray-50 rounded-2xl overflow-hidden shadow-sm">
              <Swiper
                style={{ '--swiper-navigation-color': '#4f46e5', '--swiper-pagination-color': '#4f46e5' }}
                spaceBetween={0}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                zoom={true}
                modules={[FreeMode, Navigation, Thumbs, Zoom]}
                className="h-[500px] w-full"
              >
                {productData.images?.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="swiper-zoom-container h-full w-full">
                      <img 
                        src={`${img_url}/${img}`} 
                        alt={productData.title} 
                        className="w-full h-full object-cover mix-blend-multiply"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/600x800?text=No+Image"; }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur px-3 py-1.5 text-xs font-bold text-gray-700 uppercase tracking-widest rounded-full flex items-center gap-2 shadow-sm cursor-pointer hover:bg-white hover:text-indigo-600 transition-colors border border-gray-200">
                <FaExpand size={12} /> Zoom
              </div>
              
              {discount > 0 && (
                <div className="absolute top-4 left-4 z-10 bg-indigo-600 text-white px-3 py-1 text-xs font-black tracking-widest uppercase rounded shadow-md shadow-indigo-600/30">
                  {discount}% OFF
                </div>
              )}
            </div>

            {/* Thumbs */}
            {productData.images?.length > 1 && (
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={12}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                className="md:h-28 w-full"
              >
                {productData.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="h-full w-full bg-gray-50 rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-indigo-300 transition-colors opacity-60 hover:opacity-100 [&.swiper-slide-thumb-active]:border-indigo-600 [&.swiper-slide-thumb-active]:opacity-100">
                      <img src={`${img_url}/${img}`} alt="thumb" className="w-full h-full object-cover mix-blend-multiply" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* --- RIGHT: Details --- */}
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {productData.productfor && (
                  <span className="bg-indigo-50 text-indigo-700 px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-md flex items-center gap-1.5 border border-indigo-100">
                    {getGenderIcon()} {getGenderText()}
                  </span>
                )}
                {productData.tags?.slice(0, 3).map(tag => (
                  <span key={tag} className="border border-gray-200 text-gray-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-md flex gap-1.5 items-center">
                    <FaTag size={10}/> {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none text-gray-900 mb-3 uppercase">{productData.title}</h1>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest bg-gray-100 w-fit px-2 py-1 rounded">SKU: {productData.sku}</p>
            </div>

            {/* Price */}
            <div className="mb-8 pb-8 border-b border-gray-100">
              <div className="flex items-end gap-4">
                <span className="text-4xl font-black text-gray-900 tracking-tighter">₹{productData.sellingPrice?.toLocaleString()}</span>
                {productData.compareAtPrice > productData.sellingPrice && (
                  <span className="text-xl font-bold text-gray-400 line-through">₹{productData.compareAtPrice?.toLocaleString()}</span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-3 text-sm font-bold text-indigo-600 bg-indigo-50 w-fit px-3 py-1.5 rounded-md">
                <MdLocalOffer size={18} />
                <span className="uppercase tracking-wide">EMI starts at ₹{Math.round(productData.sellingPrice / 12)}/mo</span>
              </div>
            </div>

            {/* Short Desc */}
            <p className="text-gray-600 font-medium mb-8 leading-relaxed text-sm md:text-base border-l-4 border-indigo-600 pl-4">{productData.shortDescription}</p>

            {/* Sizes */}
            {productData.size?.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-end mb-4">
                  <span className="font-black text-gray-900 text-sm uppercase tracking-widest">Select Size</span>
                  <button onClick={() => setShowSizeGuide(!showSizeGuide)} className="text-indigo-600 hover:text-indigo-800 font-bold uppercase tracking-wide text-xs flex items-center gap-1.5 transition-colors">
                    <FaRulerHorizontal size={14} /> Size Guide
                  </button>
                </div>
                
                {showSizeGuide && (
                   <div className="mb-4 p-4 bg-gray-50 border border-gray-200 text-sm font-medium text-gray-600 rounded-lg">
                     Standard Size Guide Table Here...
                   </div>
                )}

                <div className="flex flex-wrap gap-3">
                  {productData.size.map((size) => (
                    <button
                      key={size}
                      onClick={() => setActiveSize(size)}
                      className={`w-14 h-14 flex items-center justify-center text-lg font-black uppercase transition-all rounded-xl border-2
                        ${activeSize === size 
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/30 transform -translate-y-0.5' 
                          : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-600 hover:text-indigo-600'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Quantity */}
              <div className="flex items-center border-2 border-gray-200 rounded-xl w-fit overflow-hidden bg-white">
                <button onClick={() => handleQuantityChange(quantity - 1)} className="px-5 py-4 bg-gray-50 hover:bg-gray-100 text-gray-900 font-black text-lg transition-colors">-</button>
                <span className="w-12 text-center text-lg font-black text-gray-900">{quantity}</span>
                <button onClick={() => handleQuantityChange(quantity + 1)} className="px-5 py-4 bg-gray-50 hover:bg-gray-100 text-gray-900 font-black text-lg transition-colors">+</button>
              </div>

              {/* Add to Cart Btn */}
              <button 
                disabled={productData.quantity <= 0}
                onClick={handelAddtoCart}
                className={`flex-1 py-4 flex items-center justify-center gap-3 text-base font-black uppercase tracking-widest rounded-xl transition-all duration-300
                  ${productData.quantity > 0 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5' 
                    : 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed'}`}
              >
                <FaShoppingBag size={18} /> {productData.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              {/* Wishlist Btn */}
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`px-6 py-4 rounded-xl border-2 flex items-center justify-center transition-all duration-300
                  ${isWishlisted ? 'border-indigo-600 text-indigo-600 bg-indigo-50 shadow-md shadow-indigo-600/10' : 'border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-600'}`}
              >
                {isWishlisted ? <FaHeart size={22} /> : <FaRegHeart size={22} />}
              </button>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-8 py-6 border-y border-gray-100 bg-gray-50/50 rounded-2xl p-4">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-indigo-600 bg-indigo-50 p-2 rounded-lg">{b.icon}</div>
                  <div>
                    <p className="font-bold text-gray-900 text-xs uppercase tracking-wide">{b.title}</p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

             {/* Social Share */}
             <div className="flex items-center gap-4">
                <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Share</span>
                <div className="flex gap-2">
                   <button className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all"><FaFacebookF size={14}/></button>
                   <button className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all"><FaInstagram size={14}/></button>
                   <button className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all"><FaWhatsapp size={14}/></button>
                   <button onClick={copyToClipboard} className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all"><FaShareAlt size={14}/></button>
                </div>
            </div>

          </div>
        </div>

        {/* --- TABS SECTION --- */}
        <div className="mt-20">
          <div className="flex overflow-x-auto scrollbar-hide border-b-2 border-gray-100 mb-8 gap-8">
            {['Product Details', 'Specifications', 'Features', 'Shipping'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-black uppercase tracking-widest whitespace-nowrap transition-colors relative
                  ${activeTab === tab 
                    ? 'text-indigo-600' 
                    : 'text-gray-400 hover:text-gray-900'}`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-indigo-600 rounded-t-full shadow-[0_-2px_8px_rgba(79,70,229,0.5)]"></span>
                )}
              </button>
            ))}
          </div>
          
          <div className="min-h-[200px]">
            
            {/* 1. Description Tab */}
            {activeTab === 'Product Details' && (
              <div className="animate-fade-in max-w-3xl">
                <p className="text-gray-600 font-medium leading-relaxed whitespace-pre-line text-sm md:text-base">
                  {productData.description}
                </p>
              </div>
            )}

            {/* 2. Specifications Tab */}
            {activeTab === 'Specifications' && (
              <div className="animate-fade-in max-w-3xl">
                {productData.specifications ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12">
                    {Object.entries(productData.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                        <span className="font-bold text-gray-900 text-xs uppercase tracking-wider">{key}</span>
                        <span className="text-gray-600 font-medium text-sm">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">No specific specifications available.</p>
                )}
              </div>
            )}

            {/* 3. Features Tab */}
            {activeTab === 'Features' && (
              <div className="animate-fade-in max-w-3xl">
                {productData.features && productData.features.length > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {productData.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="mt-0.5 text-white bg-indigo-600 p-1 rounded-full shadow-sm shadow-indigo-600/30">
                           <FaCheck size={10} />
                        </div>
                        <span className="text-gray-700 font-bold text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">No features listed.</p>
                )}
              </div>
            )}

            {/* 4. Shipping Tab */}
            {activeTab === 'Shipping' && (
              <div className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl">
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                        <FaBoxOpen size={24} />
                      </div>
                      <div>
                        <p className="font-black text-gray-900 text-sm uppercase tracking-widest mb-1">Package Details</p>
                        {productData.shipping?.weight > 0 ? (
                             <p className="text-sm font-medium text-gray-600">Weight: {productData.shipping.weight}kg</p>
                        ) : (
                            <p className="text-sm font-medium text-gray-600">Standard packaging applies.</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                        <FaShippingFast size={24} />
                      </div>
                      <div>
                        <p className="font-black text-gray-900 text-sm uppercase tracking-widest mb-1">Dispatch Time</p>
                        <p className="text-sm font-medium text-gray-600">Usually dispatched within 24-48 hours.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-indigo-600 text-white p-6 md:p-8 rounded-2xl shadow-xl shadow-indigo-600/20">
                     <h4 className="font-black text-lg uppercase tracking-widest mb-6 border-b border-indigo-400/50 pb-4">Delivery Policy</h4>
                     <ul className="space-y-4 text-sm font-medium list-none">
                        <li className="flex items-start gap-3">
                            <FaCheck className="mt-1 flex-shrink-0 text-indigo-300" />
                            <span>{productData.shipping?.isFreeShipping 
                             ? "This item qualifies for Free Shipping." 
                             : "Standard shipping rates apply based on location."}</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <FaCheck className="mt-1 flex-shrink-0 text-indigo-300" />
                            <span>Cash on Delivery available for select pincodes.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <FaCheck className="mt-1 flex-shrink-0 text-indigo-300" />
                            <span>15-Day easy return policy if product is damaged.</span>
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