"use client"
import { base_url } from '@/app/components/urls'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { 
  FiSave, 
  FiUpload, 
  FiTag, 
  FiDollarSign, 
  FiPackage, 
  FiInfo, 
  FiGrid, 
  FiTruck,
  FiEye,
  FiPlus,
  FiTrash2,
  FiCheckCircle,
  FiXCircle
} from 'react-icons/fi'
import { SiZendesk } from "react-icons/si";

import { TbGenderMale, TbGenderFemale, TbGenderNeutrois } from 'react-icons/tb'
import { toast } from 'react-toastify'



const ProductForm = () => {
  const [productData, setProductData] = useState({
    title: '',
    sku: '',
    costPrice: '',
    sellingPrice: '',
    compareAtPrice: '',
    quantity: 0,
    description: '',
    shortDescription: '',
    specifications: {},
    features: [],
    categories: [],
    tags: [],
    images: [],
    size:[ ],
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: [],
    },
    productfor: 'female',
    status: 'draft',
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    shipping: {
      weight: 0,
      dimensions: {
        length: 0,
        width: 0,
        height: 0,
      },
      isFreeShipping: false,
    }
  })
  const route = useRouter()
  const [allCategory,setAllCategory]= useState([ ])

  const [featureInput, setFeatureInput] = useState('')
  const [tagInput, setTagInput] = useState('')
    const [sizeInput, setSizeInput] = useState('')

  const [specKey, setSpecKey] = useState('')
  const [specValue, setSpecValue] = useState('')
  const [keywordInput, setKeywordInput] = useState('')

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    
    if (name.includes('.')) {
      const [parent, child, subChild] = name.split('.')
      setProductData(prev => ({
        ...prev,
        [parent]: subChild ? {
          ...prev[parent],
          [child]: {
            ...prev[parent][child],
            [subChild]: type === 'number' ? parseFloat(value) || 0 : value
          }
        } : {
          ...prev[parent],
          [child]: type === 'number' ? parseFloat(value) || 0 : value
        }
      }))
    } else {
      setProductData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) || 0 : 
                type === 'checkbox' ? e.target.checked : 
                value
      }))
    }
  }

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setProductData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }))
      setFeatureInput('')
    }
  }

  const handleRemoveFeature = (index) => {
    setProductData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setProductData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim().toLowerCase()]
      }))
      setTagInput('')
    }
  }


  const handleAddSize = () => {
    if (sizeInput.trim()) {
      setProductData(prev => ({
        ...prev,
        size: [...prev.size, sizeInput.trim().toLowerCase()]
      }))
      setSizeInput('')
    }
  }
  

  const handleRemoveTag = (index) => {
    setProductData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }))
  }


const handleRemoveSize = (index) => {
    setProductData(prev => ({
      ...prev,
      size: prev.size.filter((_, i) => i !== index)
    }))
  }

  const handleAddSpecification = () => {
    if (specKey.trim() && specValue.trim()) {
      setProductData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specKey.trim()]: specValue.trim()
        }
      }))
      setSpecKey('')
      setSpecValue('')
    }
  }

  const handleRemoveSpecification = (key) => {
    const newSpecs = { ...productData.specifications }
    delete newSpecs[key]
    setProductData(prev => ({
      ...prev,
      specifications: newSpecs
    }))
  }

  const handleAddKeyword = () => {
    if (keywordInput.trim()) {
      setProductData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          keywords: [...prev.seo.keywords, keywordInput.trim().toLowerCase()]
        }
      }))
      setKeywordInput('')
    }
  }

  const handleRemoveKeyword = (index) => {
    setProductData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        keywords: prev.seo.keywords.filter((_, i) => i !== index)
      }
    }))
  }

  const handleCategoryChange = (categoryId) => {
    setProductData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }))
  }

 const handleImageUpload = (e) => {
  const files = Array.from(e.target.files || []);

  setProductData((prev) => ({
    ...prev,
    images: [...prev.images, ...files], // store File objects
  }));
};



  const handleRemoveImage = (index) => {
    setProductData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

 const handleSubmit = async(e) => {
  e.preventDefault();

  const formData = new FormData();

  // basic fields
  formData.append("title", productData.title);
  formData.append("sku", productData.sku);
  formData.append("costPrice", productData.costPrice);
  formData.append("sellingPrice", productData.sellingPrice);
  formData.append("compareAtPrice", productData.compareAtPrice);
  formData.append("quantity", productData.quantity);
  formData.append("description", productData.description);
  formData.append("shortDescription", productData.shortDescription);
  formData.append("productfor", productData.productfor);
  formData.append("status", productData.status);

  // booleans
  formData.append("isFeatured", productData.isFeatured);
  formData.append("isBestSeller", productData.isBestSeller);
  formData.append("isNewArrival", productData.isNewArrival);

  // arrays
  productData.features.forEach((item, i) => {
    formData.append(`features[${i}]`, item);
  });

  productData.categories.forEach((item, i) => {
    formData.append(`categories[${i}]`, item);
  });

  productData.tags.forEach((item, i) => {
    formData.append(`tags[${i}]`, item);
  });

   productData.size.forEach((item, i) => {
    formData.append(`size[${i}]`, item);
  });

  // specifications (object)
  Object.entries(productData.specifications).forEach(([key, value]) => {
    formData.append(`specifications[${key}]`, value);
  });

  // SEO
  formData.append("seo[metaTitle]", productData.seo.metaTitle);
  formData.append("seo[metaDescription]", productData.seo.metaDescription);
  productData.seo.keywords.forEach((kw, i) => {
    formData.append(`seo[keywords][${i}]`, kw);
  });

  // shipping
  formData.append("shipping[weight]", productData.shipping.weight);
  formData.append("shipping[isFreeShipping]", productData.shipping.isFreeShipping);

  formData.append("shipping[dimensions][length]", productData.shipping.dimensions.length);
  formData.append("shipping[dimensions][width]", productData.shipping.dimensions.width);
  formData.append("shipping[dimensions][height]", productData.shipping.dimensions.height);

  // images (File objects)
  productData.images.forEach((file) => {
    formData.append("images", file);
  });

 

try {
    const response = await axios.post(`${base_url}/products/create`,formData)
    const data = await response.data;
  if(data.success){
    toast.success(data.message)
    route.push("/admin/products/")
  }else{
    toast.error(data.message)
  }
    
} catch (error) {
   toast.error(error.response.data.message)
  
}



};

const getCategory= async()=>{
  try {
    const response = await axios.get(`${base_url}/category/get`);
    const data = await response.data;
    if(data.success){
setAllCategory(data.data)
    }else{
      setAllCategory( [])
    }
  } catch (error) {
      setAllCategory( [])
    
  }
}


useEffect(()=>{
getCategory()
},[ ])


  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        
      <div className=" mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  <FiPackage className="text-2xl" />
                  Create New Product
                </h1>
                <p className="text-blue-100 text-sm mt-1">
                  Fill in the product details below
                </p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  name="status"
                  value={productData.status}
                  onChange={handleInputChange}
                  className="bg-white/20 text-black border border-white/30 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
                <button
                  onClick={handleSubmit}
                  className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                >
                  <FiSave />
                  Save Product
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Basic Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <FiInfo className="text-blue-600 text-xl" />
                    <h2 className="text-xl font-bold text-gray-800">Basic Information</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={productData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter product title"
                        maxLength={200}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {productData.title.length}/200 characters
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          SKU *
                        </label>
                        <input
                          type="text"
                          name="sku"
                          value={productData.sku}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
                          placeholder="PRODUCT-SKU-001"
                          maxLength={50}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quantity *
                        </label>
                        <input
                          type="number"
                          name="quantity"
                          value={productData.quantity}
                          onChange={handleInputChange}
                          min="0"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Short Description
                      </label>
                      <textarea
                        name="shortDescription"
                        value={productData.shortDescription}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        placeholder="Brief description of the product"
                        maxLength={300}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {productData.shortDescription.length}/300 characters
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Description *
                      </label>
                      <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={6}
                        placeholder="Detailed product description"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <FiDollarSign className="text-green-600 text-xl" />
                    <h2 className="text-xl font-bold text-gray-800">Pricing</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cost Price *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">$</span>
                        <input
                          type="number"
                          name="costPrice"
                          value={productData.costPrice}
                          onChange={handleInputChange}
                          step="0.01"
                          min="0"
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Selling Price *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">$</span>
                        <input
                          type="number"
                          name="sellingPrice"
                          value={productData.sellingPrice}
                          onChange={handleInputChange}
                          step="0.01"
                          min="0"
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Compare At Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">$</span>
                        <input
                          type="number"
                          name="compareAtPrice"
                          value={productData.compareAtPrice}
                          onChange={handleInputChange}
                          step="0.01"
                          min="0"
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specifications & Features */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <FiGrid className="text-purple-600 text-xl" />
                    <h2 className="text-xl font-bold text-gray-800">Specifications & Features</h2>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Features */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Features
                      </label>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          value={featureInput}
                          onChange={(e) => setFeatureInput(e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Add a feature"
                        />
                        <button
                          type="button"
                          onClick={handleAddFeature}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                          <FiPlus />
                          Add
                        </button>
                      </div>
                      <div className="space-y-2">
                        {productData.features.map((feature, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <span>{feature}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFeature(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Specifications */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specifications
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <input
                          type="text"
                          value={specKey}
                          onChange={(e) => setSpecKey(e.target.value)}
                          className="px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Specification name"
                        />
                        <input
                          type="text"
                          value={specValue}
                          onChange={(e) => setSpecValue(e.target.value)}
                          className="px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Specification value"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleAddSpecification}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
                      >
                        <FiPlus />
                        Add Specification
                      </button>
                      <div className="mt-4 space-y-2">
                        {Object.entries(productData.specifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div>
                              <span className="font-medium">{key}:</span>
                              <span className="ml-2">{value}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveSpecification(key)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Categories */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FiGrid className="text-blue-600 text-xl" />
                    <h2 className="text-lg font-bold text-gray-800">Categories *</h2>
                  </div>
                  <div className="space-y-2">
                    {allCategory.length >0 &&  allCategory?.map(category => (
                      <label key={category._id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <input
                          type="checkbox"
                          checked={productData.categories.includes(category._id)}
                          onChange={() => handleCategoryChange(category._id)}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span>{category.title}</span>
                      </label>
                    ))}
                  </div>
                  {productData.categories.length === 0 && (
                    <p className="text-sm text-red-500 mt-2">At least one category is required</p>
                  )}
                </div>

                {/* Tags */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FiTag className="text-orange-600 text-xl" />
                    <h2 className="text-lg font-bold text-gray-800">Tags</h2>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Add tag"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {productData.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(index)}
                          className="text-orange-600 hover:text-orange-800"
                        >
                          <FiXCircle size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>



 <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <SiZendesk className="text-orange-600 text-xl" />
                    <h2 className="text-lg font-bold text-gray-800">Size</h2>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={sizeInput}
                      onChange={(e) => setSizeInput(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Add Size"
                    />
                    <button
                      type="button"
                      onClick={handleAddSize}
                      className="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {productData.size.map((tag, index) => (
                      <span key={index} className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveSize(index)}
                          className="text-orange-600 hover:text-orange-800"
                        >
                          <FiXCircle size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>



                {/* Product For */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TbGenderNeutrois className="text-pink-600 text-xl" />
                    <h2 className="text-lg font-bold text-gray-800">Product For</h2>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'female', icon: TbGenderFemale, label: 'Female', color: 'bg-pink-100 text-pink-700' },
                      { value: 'male', icon: TbGenderMale, label: 'Male', color: 'bg-blue-100 text-blue-700' },
                      { value: 'both', icon: TbGenderNeutrois, label: 'Both', color: 'bg-purple-100 text-purple-700' },
                    ].map(({ value, icon: Icon, label, color }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setProductData(prev => ({ ...prev, productfor: value }))}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                          productData.productfor === value 
                            ? 'border-current ' + color.replace('text-', 'border-') 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="text-2xl mb-2" />
                        <span className="font-medium">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Flags */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Product Flags</h2>
                  <div className="space-y-3">
                    {[
                      { name: 'isFeatured', label: 'Featured Product', icon: FiCheckCircle },
                      { name: 'isBestSeller', label: 'Best Seller', icon: FiCheckCircle },
                      { name: 'isNewArrival', label: 'New Arrival', icon: FiCheckCircle },
                    ].map(({ name, label, icon: Icon }) => (
                      <label key={name} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <input
                          type="checkbox"
                          name={name}
                          checked={productData[name]}
                          onChange={handleInputChange}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <Icon className="text-blue-600" />
                        <span className="font-medium">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Shipping */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FiTruck className="text-teal-600 text-xl" />
                    <h2 className="text-lg font-bold text-gray-800">Shipping</h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        name="shipping.weight"
                        value={productData.shipping.weight}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dimensions (cm)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="number"
                          name="shipping.dimensions.length"
                          value={productData.shipping.dimensions.length}
                          onChange={handleInputChange}
                          placeholder="L"
                          min="0"
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="number"
                          name="shipping.dimensions.width"
                          value={productData.shipping.dimensions.width}
                          onChange={handleInputChange}
                          placeholder="W"
                          min="0"
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="number"
                          name="shipping.dimensions.height"
                          value={productData.shipping.dimensions.height}
                          onChange={handleInputChange}
                          placeholder="H"
                          min="0"
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                    
                    <label className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        name="shipping.isFreeShipping"
                        checked={productData.shipping.isFreeShipping}
                        onChange={handleInputChange}
                        className="rounded text-teal-600 focus:ring-teal-500"
                      />
                      <span className="font-medium">Free Shipping</span>
                    </label>
                  </div>
                </div>

                {/* SEO */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FiEye className="text-gray-600 text-xl" />
                    <h2 className="text-lg font-bold text-gray-800">SEO Settings</h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        name="seo.metaTitle"
                        value={productData.seo.metaTitle}
                        onChange={handleInputChange}
                        maxLength={60}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {productData.seo.metaTitle.length}/60
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Description
                      </label>
                      <textarea
                        name="seo.metaDescription"
                        value={productData.seo.metaDescription}
                        onChange={handleInputChange}
                        rows={3}
                        maxLength={160}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {productData.seo.metaDescription.length}/160
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Keywords
                      </label>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          value={keywordInput}
                          onChange={(e) => setKeywordInput(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Add keyword"
                        />
                        <button
                          type="button"
                          onClick={handleAddKeyword}
                          className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                          <FiPlus />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {productData.seo.keywords.map((keyword, index) => (
                          <span key={index} className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                            {keyword}
                            <button
                              type="button"
                              onClick={() => handleRemoveKeyword(index)}
                              className="text-gray-600 hover:text-gray-800"
                            >
                              <FiXCircle size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <FiUpload className="text-indigo-600 text-xl" />
                <h2 className="text-xl font-bold text-gray-800">Product Images</h2>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Images
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors">
                  <FiUpload className="mx-auto text-3xl text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">Drag & drop images here or click to browse</p>
                  <p className="text-sm text-gray-500 mb-4">Supports JPG, PNG, WEBP up to 5MB</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
                  >
                    Browse Files
                  </label>
                </div>
              </div>

              {productData.images.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Uploaded Images ({productData.images.length})</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {productData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Product ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProductForm