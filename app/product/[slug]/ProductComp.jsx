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
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '@/app/components/Store/slices/WishlistSlice';

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
const dispatch = useDispatch()
const state = useSelector(state=>state.wishlist.items)


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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center text-sm text-gray-500 font-medium flex-wrap gap-2">
        <a href="/" className="hover:text-indigo-600 transition-colors">Home</a>
        <span className="text-gray-400">/</span>
        <a href="/products" className="hover:text-indigo-600 transition-colors">Products</a>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900">{productData.title}</span>
      </div>
    </div>
  </nav>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
      
      {/* --- LEFT: Image Gallery --- */}
      <div className="flex flex-col gap-4">
        {/* Main Image */}
        <div className="relative group bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <Swiper
            style={{ '--swiper-navigation-color': '#4f46e5', '--swiper-pagination-color': '#4f46e5' }}
            spaceBetween={0}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            zoom={true}
            modules={[FreeMode, Navigation, Thumbs, Zoom]}
            className="h-[500px] sm:h-[600px] w-full"
          >
            {productData.images?.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="swiper-zoom-container h-full w-full">
                  <img 
                    src={`${img_url}/${img}`} 
                    alt={productData.title} 
                    className="w-full h-full object-contain mix-blend-multiply p-4"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/600x800?text=No+Image"; }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-gray-700 rounded-full flex items-center gap-1.5 shadow-sm cursor-pointer hover:bg-white transition-colors border border-gray-200/50">
            <FaExpand size={12} /> Zoom
          </div>
          
          {discount > 0 && (
            <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 text-xs font-bold tracking-wide rounded-md shadow-sm">
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
            className="h-24 sm:h-28 w-full"
          >
            {productData.images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="h-full w-full bg-gray-50 rounded-xl overflow-hidden cursor-pointer border-2 border-transparent transition-all opacity-60 hover:opacity-100 [&.swiper-slide-thumb-active]:border-indigo-600 [&.swiper-slide-thumb-active]:opacity-100">
                  <img src={`${img_url}/${img}`} alt="thumb" className="w-full h-full object-cover mix-blend-multiply" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* --- RIGHT: Details --- */}
      <div className="flex flex-col">
        {/* Header & Badges */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {productData.productfor && (
              <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5">
                {getGenderIcon()} {getGenderText()}
              </span>
            )}
            {productData.tags?.slice(0, 3).map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-md flex gap-1.5 items-center">
                <FaTag size={10} className="text-gray-400"/> {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-2">{productData.title}</h1>
          <p className="text-sm text-gray-500 font-medium">SKU: {productData.sku}</p>
        </div>

        {/* Price Section */}
        <div className="mb-8 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-gray-900">₹{productData.sellingPrice?.toLocaleString()}</span>
            {productData.compareAtPrice > productData.sellingPrice && (
              <span className="text-lg font-medium text-gray-400 line-through">₹{productData.compareAtPrice?.toLocaleString()}</span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-3 text-sm font-medium text-indigo-700 bg-indigo-50/50 w-fit px-3 py-1.5 rounded-md border border-indigo-100">
            <MdLocalOffer size={16} />
            <span>EMI starts at ₹{Math.round(productData.sellingPrice / 12)}/mo</span>
          </div>
        </div>

        {/* Short Desc */}
        <p className="text-gray-600 text-base leading-relaxed mb-8">{productData.shortDescription}</p>

        {/* Sizes */}
        {productData.size?.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-gray-900">Select Size</span>
              <button onClick={() => setShowSizeGuide(!showSizeGuide)} className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1.5 transition-colors">
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
                  className={`min-w-[3rem] h-12 px-4 flex items-center justify-center text-sm font-semibold transition-all rounded-lg border 
                    ${activeSize === size 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200' 
                      : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-600 hover:text-indigo-600'
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Quantity */}
          <div className="flex items-center border border-gray-200 rounded-lg w-fit bg-white h-14">
            <button onClick={() => handleQuantityChange(quantity - 1)} className="px-5 h-full text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-l-lg">-</button>
            <span className="w-10 text-center text-base font-semibold text-gray-900">{quantity}</span>
            <button onClick={() => handleQuantityChange(quantity + 1)} className="px-5 h-full text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-r-lg">+</button>
          </div>

          {/* Add to Cart Btn */}
          <button 
            disabled={productData.quantity <= 0}
            onClick={handelAddtoCart}
            className={`flex-1 h-14 flex items-center justify-center gap-2 text-base font-semibold rounded-lg transition-all duration-200
              ${productData.quantity > 0 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg hover:shadow-indigo-200' 
                : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'}`}
          >
            <FaShoppingBag size={18} /> {productData.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
          
          {/* Wishlist Btn */}
          <button 
            onClick={() => { state.includes(productData._id) ? dispatch(removeFromWishlist(productData._id)) : dispatch(addToWishlist(productData._id)) }}
            className={`w-14 h-14 rounded-lg border flex items-center justify-center transition-all duration-200
              ${state.includes(productData._id) 
                ? 'border-indigo-600 text-indigo-600 bg-indigo-50' 
                : 'border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-500'}`}
          >
            {state.includes(productData._id) ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
          </button>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8 py-6 border-y border-gray-100">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="text-indigo-600 bg-indigo-50 p-2.5 rounded-lg flex-shrink-0">{b.icon}</div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-0.5">{b.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

         {/* Social Share */}
         <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500">Share:</span>
            <div className="flex gap-2">
               <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-indigo-600 hover:text-white transition-colors"><FaFacebookF size={14}/></button>
               <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-indigo-600 hover:text-white transition-colors"><FaInstagram size={14}/></button>
               <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-indigo-600 hover:text-white transition-colors"><FaWhatsapp size={14}/></button>
               <button onClick={copyToClipboard} className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-indigo-600 hover:text-white transition-colors"><FaShareAlt size={14}/></button>
            </div>
        </div>

      </div>
    </div>

    {/* --- TABS SECTION --- */}
    <div className="mt-16 sm:mt-24">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6 sm:gap-10 overflow-x-auto scrollbar-hide">
          {['Product Details', 'Specifications', 'Features', 'Shipping'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm sm:text-base transition-colors
                ${activeTab === tab 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="py-8 min-h-[200px]">
        
        {/* 1. Description Tab */}
        {activeTab === 'Product Details' && (
          <div className="animate-fade-in max-w-3xl">
            <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
              {productData.description}
            </p>
          </div>
        )}

        {/* 2. Specifications Tab */}
        {activeTab === 'Specifications' && (
          <div className="animate-fade-in max-w-3xl">
            {productData.specifications ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(productData.specifications).map(([key, value]) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-900 capitalize">{key}</span>
                    <span className="text-gray-600 sm:text-right">{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No specific specifications available.</p>
            )}
          </div>
        )}

        {/* 3. Features Tab */}
        {activeTab === 'Features' && (
          <div className="animate-fade-in max-w-3xl">
            {productData.features && productData.features.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {productData.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                    <FaCheck className="text-indigo-600 mt-1 flex-shrink-0" size={14} />
                    <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No features listed.</p>
            )}
          </div>
        )}

        {/* 4. Shipping Tab */}
        {activeTab === 'Shipping' && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 border border-gray-100 text-gray-600 rounded-xl">
                    <FaBoxOpen size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Package Details</p>
                    {productData.shipping?.weight > 0 ? (
                         <p className="text-sm text-gray-600">Weight: {productData.shipping.weight}kg</p>
                    ) : (
                        <p className="text-sm text-gray-600">Standard packaging applies.</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 border border-gray-100 text-gray-600 rounded-xl">
                    <FaShippingFast size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Dispatch Time</p>
                    <p className="text-sm text-gray-600">Usually dispatched within 24-48 hours.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl">
                 <h4 className="font-semibold text-gray-900 mb-4 pb-4 border-b border-gray-200">Delivery Policy</h4>
                 <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-3">
                        <FaCheck className="mt-0.5 text-indigo-600 flex-shrink-0" />
                        <span>{productData.shipping?.isFreeShipping 
                         ? "This item qualifies for Free Shipping." 
                         : "Standard shipping rates apply based on location."}</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <FaCheck className="mt-0.5 text-indigo-600 flex-shrink-0" />
                        <span>Cash on Delivery available for select pincodes.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <FaCheck className="mt-0.5 text-indigo-600 flex-shrink-0" />
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