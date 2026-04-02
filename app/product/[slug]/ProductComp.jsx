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
    if (!productData?.productfor) return <HiOutlineUser className="inline mr-1" size={14} />;
    switch (productData.productfor.toLowerCase()) {
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
      <div className="w-12 h-12 border-2 border-[#B5945C] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  if (!productData) return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center text-gray-500 font-light tracking-wide">
      Product not found
    </div>
  );

  const discount = calculateDiscount();

  return (
    <div className="min-h-screen  text-gray-800 font-sans antialiased">
      {/* --- Breadcrumbs (refined) --- */}
      <nav className="bg-white/50 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center text-xs tracking-wide text-gray-500 gap-2">
            <a href="/" className="hover:text-[#B5945C] transition-colors">Home</a>
            <span className="text-gray-300">/</span>
            <a href="/products" className="hover:text-[#B5945C] transition-colors">Products</a>
            <span className="text-gray-300">/</span>
            <span className="text-gray-700 font-medium">{productData.title}</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 lg:px-8 py-6 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-20">
          
         
          <div className="space-y-5">
            <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden group border border-gray-100">
              <Swiper
                style={{ '--swiper-navigation-color': '#B5945C', '--swiper-pagination-color': '#B5945C' }}
                spaceBetween={0}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                zoom={true}
                modules={[FreeMode, Navigation, Thumbs, Zoom]}
                className="h-[500px] sm:h-[600px] w-full"
              >
                {productData.images?.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="swiper-zoom-container h-full w-full bg-[#F9F6F0]">
                      <img
                        src={`${img_url}/${img}`}
                        alt={productData.title}
                        className="w-full h-full object-contain p-6"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/800x1000?text=No+Image"; }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="absolute top-5 right-5 z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-gray-700 rounded-full flex items-center gap-2 shadow-sm cursor-pointer hover:bg-white transition">
                <FaExpand size={12} className="text-[#B5945C]" /> Zoom
              </div>

              {discount > 0 && (
                <div className="absolute top-5 left-5 z-10 bg-[#B5945C] text-white px-3 py-1 text-xs font-semibold tracking-wider rounded-sm shadow-md">
                  {discount}% OFF
                </div>
              )}
            </div>

            {/* Thumbnails */}
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
                    <div className="h-full w-full bg-white rounded-xl overflow-hidden cursor-pointer border border-gray-200 transition-all duration-200 opacity-70 hover:opacity-100 [&.swiper-slide-thumb-active]:border-[#B5945C] [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:shadow-md">
                      <img src={`${img_url}/${img}`} alt="thumb" className="w-full h-full object-cover p-2" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* --- RIGHT: Product Details (classic luxury) --- */}
          <div className="flex flex-col">
            {/* Badges */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {productData.productfor && (
                  <span className="bg-[#F5F0E8] text-[#8B7355] px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1.5">
                    {getGenderIcon()} {getGenderText()}
                  </span>
                )}
                {productData.tags?.slice(0, 3).map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                    <FaTag size={10} className="text-[#B5945C]" /> {tag}
                  </span>
                ))}
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-tight text-gray-900 mb-3 leading-tight">
                {productData.title}
              </h1>
              <p className="text-sm text-gray-500 uppercase tracking-wider">SKU: {productData.sku}</p>
            </div>

            {/* Price */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-semibold text-gray-900">₹{productData.sellingPrice?.toLocaleString()}</span>
                {productData.compareAtPrice > productData.sellingPrice && (
                  <span className="text-lg text-gray-400 line-through">₹{productData.compareAtPrice?.toLocaleString()}</span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-4 text-sm text-[#8B7355] bg-[#F5F0E8] w-fit px-4 py-2 rounded-full">
                <MdLocalOffer size={16} />
                <span className="tracking-wide">EMI from ₹{Math.round(productData.sellingPrice / 12)}/month</span>
              </div>
            </div>

            {/* Short description */}
            <p className="text-gray-600 text-base leading-relaxed mb-8 font-light">
              {productData.shortDescription}
            </p>

            {/* Size selector */}
            {productData.size?.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium uppercase tracking-wider text-gray-700">Select Size</span>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-[#8B7355] hover:text-[#B5945C] text-sm flex items-center gap-1.5 transition-colors"
                  >
                    <FaRulerHorizontal size={14} /> Size Guide
                  </button>
                </div>

                {showSizeGuide && (
                  <div className="mb-5 p-5 bg-[#F9F6F0] border border-[#E8E0D5] text-sm text-gray-600 rounded-xl">
                    <p className="font-medium mb-2">Size Guide (cm)</p>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      <div className="font-semibold">Size</div><div className="font-semibold">Chest</div><div className="font-semibold">Waist</div><div className="font-semibold">Hips</div>
                      <div>S</div><div>88-92</div><div>70-74</div><div>90-94</div>
                      <div>M</div><div>92-96</div><div>74-78</div><div>94-98</div>
                      <div>L</div><div>96-100</div><div>78-82</div><div>98-102</div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  {productData.size.map((size) => (
                    <button
                      key={size}
                      onClick={() => setActiveSize(size)}
                      className={`min-w-[3rem] h-11 px-4 text-sm font-medium transition-all duration-200 rounded-full border
                        ${activeSize === size
                          ? 'bg-[#B5945C] text-white border-[#B5945C] shadow-md'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-[#B5945C] hover:text-[#B5945C]'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border border-gray-200 rounded-full w-fit bg-white h-12">
                <button onClick={() => handleQuantityChange(quantity - 1)} className="px-4 h-full text-gray-500 hover:text-gray-900 rounded-l-full">-</button>
                <span className="w-10 text-center text-base font-medium">{quantity}</span>
                <button onClick={() => handleQuantityChange(quantity + 1)} className="px-4 h-full text-gray-500 hover:text-gray-900 rounded-r-full">+</button>
              </div>

              <button
                disabled={productData.quantity <= 0}
                onClick={handleAddToCart}
                className={`flex-1 py-4  md:py-0 flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-wider rounded-full transition-all duration-300
                  ${productData.quantity > 0
                    ? 'bg-gray-900 text-white hover:bg-[#B5945C] hover:shadow-lg'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              >
                <FaShoppingBag size={16} /> {productData.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>

              <button
                onClick={() => {
                  if (isInWishlist) dispatch(removeFromWishlist(productData._id));
                  else dispatch(addToWishlist(productData._id));
                }}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300
                  ${isInWishlist
                    ? 'border-[#B5945C] text-[#B5945C] bg-[#F5F0E8]'
                    : 'border-gray-200 text-gray-400 hover:text-[#B5945C] hover:border-[#B5945C]'}`}
              >
                {isInWishlist ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
              </button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-5 mb-8 py-6 border-y border-gray-200">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="text-[#B5945C] bg-[#F5F0E8] p-2.5 rounded-full">{b.icon}</div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{b.title}</p>
                    <p className="text-xs text-gray-500">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social share */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 uppercase tracking-wide">Share</span>
              <div className="flex gap-2">
                <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-[#B5945C] hover:text-white hover:border-[#B5945C] transition-all"><FaFacebookF size={14} /></button>
                <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-[#B5945C] hover:text-white hover:border-[#B5945C] transition-all"><FaInstagram size={14} /></button>
                <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-[#B5945C] hover:text-white hover:border-[#B5945C] transition-all"><FaWhatsapp size={14} /></button>
                <button onClick={copyToClipboard} className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-[#B5945C] hover:text-white hover:border-[#B5945C] transition-all"><FaShareAlt size={14} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* --- TABS SECTION (refined) --- */}
        <div className="mt-20">
          <div className="border-b border-gray-200">
            <nav className="flex w-full overflow-x-auto overflow-y-hidden gap-8">
              {['Product Details', 'Specifications', 'Features', 'Shipping'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-1 text-nowrap text-sm font-medium tracking-wide uppercase transition-all duration-200 border-b-2 -mb-px
                    ${activeTab === tab
                      ? 'border-[#B5945C] text-[#B5945C]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-10">
            {activeTab === 'Product Details' && (
              <div className="max-w-3xl prose prose-stone prose-lg">
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{productData.description}</p>
              </div>
            )}

            {activeTab === 'Specifications' && (
              <div className="max-w-3xl">
                {productData.specifications ? (
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-100">
                    {Object.entries(productData.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-4 px-6">
                        <span className="font-medium text-gray-900 capitalize">{key}</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No specifications available.</p>
                )}
              </div>
            )}

            {activeTab === 'Features' && (
              <div className="max-w-3xl">
                {productData.features?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {productData.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <FaCheck className="text-[#B5945C] mt-0.5 flex-shrink-0" size={14} />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No features listed.</p>
                )}
              </div>
            )}

            {activeTab === 'Shipping' && (
              <div className="max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#F5F0E8] rounded-full text-[#B5945C]"><FaBoxOpen size={18} /></div>
                      <div>
                        <p className="font-medium text-gray-800">Package Details</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {productData.shipping?.weight > 0 ? `Weight: ${productData.shipping.weight} kg` : 'Standard packaging applies.'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#F5F0E8] rounded-full text-[#B5945C]"><FaShippingFast size={18} /></div>
                      <div>
                        <p className="font-medium text-gray-800">Dispatch Time</p>
                        <p className="text-sm text-gray-500 mt-1">Usually dispatched within 24-48 hours.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <h4 className="font-medium text-gray-800 mb-4 pb-3 border-b border-gray-100">Delivery Policy</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex gap-3">
                        <FaCheck className="mt-0.5 text-[#B5945C] flex-shrink-0" />
                        <span>{productData.shipping?.isFreeShipping ? "Free Shipping on this item." : "Standard shipping rates apply."}</span>
                      </li>
                      <li className="flex gap-3">
                        <FaCheck className="mt-0.5 text-[#B5945C] flex-shrink-0" />
                        <span>Cash on Delivery available for select pincodes.</span>
                      </li>
                      <li className="flex gap-3">
                        <FaCheck className="mt-0.5 text-[#B5945C] flex-shrink-0" />
                        <span>15-Day easy return policy on damaged/defective items.</span>
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