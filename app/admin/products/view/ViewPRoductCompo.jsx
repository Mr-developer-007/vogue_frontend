"use client"

import { base_url, img_url } from '@/app/components/urls'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaTag, 
  FaBox, 
  FaRulerHorizontal, 
  FaTruck, 
  FaImage, 
  FaChartLine,
  FaCalendarAlt,
  FaDollarSign,
  FaShoppingCart,
  FaUsers,
  FaShareAlt,
  FaCopy,
  FaLink,
  FaCheck,
  FaTimes,
  FaFileExport,
  FaPrint,
  FaDownload
} from 'react-icons/fa'
import { 
  HiOutlineArchive, 
  HiOutlineChartBar, 
  HiOutlineClipboardList,
  HiOutlineCollection,
  HiOutlineTag,
  HiOutlineShoppingBag
} from 'react-icons/hi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MdOutlineColorLens } from 'react-icons/md'

const ViewProductCompo = ({slug}) => {
  const [productData, setProductData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const router = useRouter()

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${base_url}/products/${slug}`)
      const data = await response.data
      if (data.success) {
        setProductData(data.data)
      }
    } catch (error) {
      console.error("Error fetching product:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (slug) fetchProduct()
  }, [slug])

  // Calculate metrics
  const calculateDiscount = () => {
    if (!productData?.compareAtPrice || !productData?.sellingPrice) return 0
    return Math.round(((productData.compareAtPrice - productData.sellingPrice) / productData.compareAtPrice) * 100)
  }

  const getProfitMargin = () => {
    if (!productData?.costPrice || !productData?.sellingPrice) return 0
    return Math.round(((productData.sellingPrice - productData.costPrice) / productData.sellingPrice) * 100)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`${base_url}/products/delete/${productData._id}`)
      router.push('/admin/products')
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  const generateShareableLink = () => {
    return `${window.location.origin}/product/${productData?.slug}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    )
  }

  if (!productData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Product not found</p>
          <Link href="/admin/products" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            ← Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const discount = calculateDiscount()
  const profitMargin = getProfitMargin()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Product Details</h1>
              <p className="text-gray-600 mt-1">Manage and view product information</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/products/edit/${productData.slug}`}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors"
              >
                <FaEdit /> Edit Product
              </Link>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg transition-colors"
              >
                <FaTrash /> Delete
              </button>
              <Link
                href="/admin/products"
                className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← Back to List
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Product Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Product Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        productData.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {productData.status.toUpperCase()}
                      </span>
                      {productData.isNewArrival && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          NEW ARRIVAL
                        </span>
                      )}
                      {productData.isFeatured && (
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                          FEATURED
                        </span>
                      )}
                      {productData.isBestSeller && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                          BEST SELLER
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 capitalize">{productData.title}</h2>
                    <p className="text-gray-600 mt-2">{productData.shortDescription}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">SKU</div>
                    <div className="font-mono font-bold text-gray-900">{productData.sku}</div>
                  </div>
                </div>
              </div>

              {/* Product Images */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FaImage /> Product Images
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {productData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={`${img_url}/${image}`}
                        alt={`Product ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg border border-gray-200"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button className="bg-white p-2 rounded-full shadow-lg">
                          <FaEye className="text-gray-700" />
                        </button>
                      </div>
                      <div className="text-xs text-gray-500 mt-2 text-center">
                        Image {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabs Navigation */}
              <div className="border-b border-gray-200">
                <nav className="flex overflow-x-auto">
                  {['overview', 'specifications', 'features', 'categories', 'shipping', 'seo'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                        activeTab === tab
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                      <p className="text-gray-600 whitespace-pre-line">{productData.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Short Description</h4>
                      <p className="text-gray-600">{productData.shortDescription}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'specifications' && productData.specifications && (
                  <div className="space-y-4">
                    {Object.entries(productData.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-3 border-b border-gray-100 last:border-0">
                        <span className="font-medium text-gray-700">{key}</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'features' && productData.features && (
                  <ul className="space-y-3">
                    {productData.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 py-2">
                        <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'categories' && productData.categories && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Product Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {productData.categories.map((category) => (
                        <Link
                          key={category._id}
                          href={`/admin/categories/${category._id}`}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <HiOutlineCollection />
                          {category.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Shipping Information</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-500 mb-1">Weight</div>
                          <div className="font-semibold">{productData.shipping?.weight || 0} kg</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-500 mb-1">Free Shipping</div>
                          <div className="font-semibold flex items-center gap-2">
                            {productData.shipping?.isFreeShipping ? (
                              <><FaCheck className="text-green-500" /> Yes</>
                            ) : (
                              <><FaTimes className="text-red-500" /> No</>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {productData.shipping?.dimensions && (
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Dimensions</h5>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="p-3 bg-gray-50 rounded">
                            <div className="text-xs text-gray-500">Length</div>
                            <div className="font-medium">{productData.shipping.dimensions.length} cm</div>
                          </div>
                          <div className="p-3 bg-gray-50 rounded">
                            <div className="text-xs text-gray-500">Width</div>
                            <div className="font-medium">{productData.shipping.dimensions.width} cm</div>
                          </div>
                          <div className="p-3 bg-gray-50 rounded">
                            <div className="text-xs text-gray-500">Height</div>
                            <div className="font-medium">{productData.shipping.dimensions.height} cm</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'seo' && productData.seo && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">SEO Information</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                          <div className="p-3 bg-gray-50 rounded border border-gray-200">
                            {productData.seo.metaTitle || 'Not set'}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                          <div className="p-3 bg-gray-50 rounded border border-gray-200">
                            {productData.seo.metaDescription || 'Not set'}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
                          <div className="flex flex-wrap gap-2">
                            {productData.seo.keywords && productData.seo.keywords.length > 0 ? (
                              productData.seo.keywords.map((keyword, index) => (
                                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                                  {keyword}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-500">No keywords set</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Actions */}
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-gray-500 text-sm">Price</div>
                  <FaDollarSign className="text-green-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  ₹{productData.sellingPrice?.toLocaleString()}
                </div>
                {productData.compareAtPrice && (
                  <div className="text-sm text-gray-500 line-through">
                    ₹{productData.compareAtPrice?.toLocaleString()}
                  </div>
                )}
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-gray-500 text-sm">Stock</div>
                  <HiOutlineShoppingBag className="text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {productData.quantity}
                </div>
                <div className={`text-sm ${productData.quantity < 10 ? 'text-red-500' : 'text-green-500'}`}>
                  {productData.quantity < 10 ? 'Low Stock' : 'In Stock'}
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-gray-500 text-sm">Discount</div>
                  <FaTag className="text-purple-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {discount}%
                </div>
                <div className="text-sm text-gray-500">
                  Save ₹{(productData.compareAtPrice - productData.sellingPrice)?.toLocaleString()}
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-gray-500 text-sm">Margin</div>
                  <FaChartLine className="text-yellow-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {profitMargin}%
                </div>
                <div className="text-sm text-gray-500">
                  Profit: ₹{(productData.sellingPrice - productData.costPrice)?.toLocaleString()}
                </div>
              </div>
            </div>

             <div className="bg-white rounded-xl shadow-sm border border-gray-200">
               <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MdOutlineColorLens /> Color Details
                </h3>
                <input type="color" value={productData.color} disabled className='w-full h-16' name="" id="" />
              </div>
             </div>

            {/* Product Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <HiOutlineClipboardList /> Product Details
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">SKU</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{productData.sku}</span>
                    <button
                      onClick={() => copyToClipboard(productData.sku)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Product For</span>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    productData.productfor === 'male' 
                      ? 'bg-blue-100 text-blue-800'
                      : productData.productfor === 'female'
                      ? 'bg-pink-100 text-pink-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {productData.productfor}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Created</span>
                  <span className="font-medium">{formatDate(productData.createdAt)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Updated</span>
                  <span className="font-medium">{formatDate(productData.updatedAt)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Views</span>
                  <span className="font-medium">{productData.viewCount || 0}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Orders</span>
                  <span className="font-medium">{productData.orderCount || 0}</span>
                </div>
              </div>
            </div>

            {/* Tags Card */}
            {productData.tags && productData.tags.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <HiOutlineTag /> Tags
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {productData.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Sizes Card */}
            {productData.size && productData.size.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FaRulerHorizontal /> Available Sizes
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {productData.size.map((size, index) => (
                      <span key={index} className="px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg border border-blue-200">
                        {size.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Actions Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-3">
                <button
                  onClick={() => setShowShareModal(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FaShareAlt /> Share Product
                </button>
                
                <button
                  onClick={() => copyToClipboard(generateShareableLink())}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FaLink /> Copy Link
                </button>
                
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <FaFileExport /> Export Data
                </button>
                
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <FaPrint /> Print Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Product</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{productData.title}"? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProduct}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <FaTrash /> Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Product</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Link</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={generateShareableLink()}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                    <button
                      onClick={() => copyToClipboard(generateShareableLink())}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Share via</label>
                  <div className="flex gap-3">
                    <button className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors">
                      F
                    </button>
                    <button className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-200 transition-colors">
                      IG
                    </button>
                    <button className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors">
                      WA
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <FaCopy />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewProductCompo