"use client"
import { base_url, img_url } from '@/app/components/urls';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { 
  MdOutlineCancel, 
  MdDelete, 
  MdSave, 
  MdArrowBack, 
  MdImage, 
  MdTag, 
  MdFeaturedPlayList,
  MdStraighten,
  MdAddCircle,
  MdRemoveCircle,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdLocalOffer,
  MdInventory,
  MdDescription,
  MdCategory,
  MdPerson,
  MdVisibility,
  MdEdit,
  MdUpload,
  MdHeight,
  MdWidthFull,
  MdSquareFoot,
  MdOutlineSearch,
  MdSearch
} from "react-icons/md";
import { 
  FaBox, 
  FaDollarSign, 
  FaRulerHorizontal, 
  FaShippingFast,
  FaStar,
  FaTimes,
  FaWeightHanging
} from "react-icons/fa";
import { HiOutlineCollection, HiOutlineStatusOnline } from "react-icons/hi";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { TbDimensions } from 'react-icons/tb';

const EditProductCompo = ({ slug }) => {
  const router = useRouter();
  const [allCategory, setAllCategory] = useState([]);
  const [productData, setProductData] = useState(null);
  const [newTags, setNewTags] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newFeatures, setNewFeatures] = useState("");
  const [specificationsNew, setSpecificationsNew] = useState({
    key: "",
    value: ""
  });
    const [newKeyword, setNewKeyword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const getCategory = async () => {
    try {
      const response = await axios.get(`${base_url}/category/get`);
      if (response.data.success) {
        setAllCategory(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${base_url}/products/foredit/${slug}`);
      const data = await response.data;
      if (data.success) {
        setProductData(data.data);
        setSelectedCategories(data.data.categories || []);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error('Failed to load product data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchProduct();
      getCategory();
    }
  }, [slug]);

  const InputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handelRemoveTag = (index) => {
    const filtertags = productData.tags.filter((_, ind) => ind !== index);
    setProductData(prev => ({ ...prev, tags: filtertags }));
  };

  const handelAddTag = (e) => {
    e.preventDefault();
    if (!newTags.trim()) {
      toast.error('Please enter a tag');
      return;
    }
    if (productData.tags.includes(newTags.trim())) {
      toast.error('Tag already exists');
      return;
    }
    setProductData(prev => ({ ...prev, tags: [...prev.tags, newTags.trim()] }));
    setNewTags("");
    toast.success('Tag added');
  };

  const handelRemovefeatures = (index) => {
    const filtertags = productData.features.filter((_, ind) => ind !== index);
    setProductData(prev => ({ ...prev, features: filtertags }));
  };

  const handelAddfeatures = (e) => {
    e.preventDefault();
    if (!newFeatures.trim()) {
      toast.error('Please enter a feature');
      return;
    }
    setProductData(prev => ({ ...prev, features: [...prev.features, newFeatures.trim()] }));
    setNewFeatures("");
    toast.success('Feature added');
  };

  const handelRemoveSize = (index) => {
    const filtersize = productData.size.filter((_, ind) => ind !== index);
    setProductData(prev => ({ ...prev, size: filtersize }));
  };

  const handelAddSize = (e) => {
    e.preventDefault();
    if (!newSize.trim()) {
      toast.error('Please enter a size');
      return;
    }
    if (productData.size.includes(newSize.trim().toLowerCase())) {
      toast.error('Size already exists');
      return;
    }
    setProductData(prev => ({ ...prev, size: [...prev.size, newSize.trim().toLowerCase()] }));
    setNewSize("");
    toast.success('Size added');
  };

  const handelDeleteoldImage = (item) => {
    const filterImage = productData.images.filter((itm) => itm !== item);
    setProductData(prev => ({
      ...prev,
      images: filterImage,
      deleteImages: prev?.deleteImages ? [...prev.deleteImages, item] : [item]
    }));
    toast.success('Image marked for deletion');
  };

  const handelDeletenewImage = (item) => {
    const filterImage = productData.newImages.filter((itm) => itm !== item);
    setProductData(prev => ({ ...prev, newImages: filterImage }));
    toast.success('New image removed');
  };

  const addNewImage = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + (productData.images?.length || 0) > 10) {
      toast.error('Maximum 10 images allowed');
      return;
    }
    setProductData(prev => ({
      ...prev,
      newImages: prev?.newImages ? [...prev.newImages, ...files] : files
    }));
    toast.success(`${files.length} image(s) added`);
  };

  const handelDeletespecifications = (key) => {
    const { [key]: removed, ...rest } = productData.specifications;
    setProductData(prev => ({ ...prev, specifications: rest }));
    toast.success('Specification removed');
  };

  const handelAddSpecification = (e) => {
    e.preventDefault();
    if (!specificationsNew.key.trim() || !specificationsNew.value.trim()) {
      toast.error('Both key and value are required');
      return;
    }
    setProductData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [specificationsNew.key.trim()]: specificationsNew.value.trim()
      }
    }));
    setSpecificationsNew({ key: "", value: "" });
    toast.success('Specification added');
  };

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSaveProduct = async (e) => {
  e.preventDefault();
  setSaving(true);

  try {
    const formData = new FormData();

    // 🔹 Simple fields
    const simpleFields = [
      "title",
      "sku",
      "costPrice",
      "sellingPrice",
      "compareAtPrice",
      "quantity",
      "description",
      "shortDescription",
      "productfor",
      "status",
    ];

    simpleFields.forEach((field) => {
      formData.append(field, productData[field]);
    });

    // 🔹 Boolean fields (convert to string)
    formData.append("isFeatured", String(productData.isFeatured));
    formData.append("isBestSeller", String(productData.isBestSeller));
    formData.append("isNewArrival", String(productData.isNewArrival));

    // 🔹 Structured JSON fields
    formData.append("specifications", JSON.stringify(productData.specifications));
    formData.append("features", JSON.stringify(productData.features));
    formData.append("categories", JSON.stringify(selectedCategories));
    formData.append("tags", JSON.stringify(productData.tags));
    formData.append("size", JSON.stringify(productData.size));
    formData.append("seo", JSON.stringify(productData.seo));
    formData.append("shipping", JSON.stringify(productData.shipping));

    // 🔹 Deleted images
    if (productData.deleteImages?.length) {
      formData.append(
        "deleteImages",
        JSON.stringify(productData.deleteImages)
      );
    }

    // 🔹 New images
    if (productData.newImages?.length) {
      productData.newImages.forEach((file) => {
        formData.append("images", file);
      });
    }

    const res = await axios.put(
      `${base_url}/products/update/${productData._id}`,
      formData
    );

    if (res.data.success) {
      toast.success("Product updated successfully");
      router.push(`/admin/products/view/${productData.slug}`);
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to update product");
  } finally {
    setSaving(false);
  }
};




   const handleNestedChange = (section, field, value) => {
    setProductData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleShippingDimensionChange = (dimension, value) => {
    setProductData(prev => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        dimensions: {
          ...prev.shipping.dimensions,
          [dimension]: parseFloat(value) || 0
        }
      }
    }));
  };

  const handleRemoveKeyword = (index) => {
      const newKeywords = productData.seo.keywords.filter((_, i) => i !== index);
      setProductData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          keywords: newKeywords
        }
      }));
      toast.success('Keyword removed');
    };

     const handleAddKeyword = (e) => {
        e.preventDefault();
        if (!newKeyword.trim()) {
          toast.error('Please enter a keyword');
          return;
        }
        setProductData(prev => ({
          ...prev,
          seo: {
            ...prev.seo,
            keywords: [...prev.seo.keywords, newKeyword.trim()]
          }
        }));
        setNewKeyword("");
        toast.success('Keyword added');
      };
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="mt-6 text-gray-600 text-lg font-medium">Loading product data...</p>
        </div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're trying to edit doesn't exist.</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <MdArrowBack /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 transition-colors"
            >
              <MdArrowBack /> Back to Products
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
            <p className="text-gray-600 mt-2">Update product details and settings</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSaveProduct}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MdSave className="text-xl" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaDollarSign className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Selling Price</p>
                <p className="text-xl font-bold text-gray-900">₹{productData.sellingPrice}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MdInventory className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Stock</p>
                <p className="text-xl font-bold text-gray-900">{productData.quantity} units</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MdLocalOffer className="text-purple-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Discount</p>
                <p className="text-xl font-bold text-gray-900">
                  {Math.round(((productData.compareAtPrice - productData.sellingPrice) / productData.compareAtPrice) * 100)}%
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <HiOutlineStatusOnline className="text-yellow-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className={`text-xl font-bold capitalize ${productData.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                  {productData.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSaveProduct} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Form Sections */}
          <div className="p-6 md:p-8 space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-4">
                <FaBox className="text-blue-600 text-xl" />
                <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={productData.title}
                    onChange={InputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter product title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SKU *
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={productData.sku}
                    onChange={InputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="PRODUCT-SKU-001"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product For *
                  </label>
                  <div className="flex gap-3">
                    {['male', 'female', 'both'].map((type) => (
                      <label
                        key={type}
                        className={`flex-1 text-center px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                          productData.productfor === type
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="productfor"
                          value={type}
                          checked={productData.productfor === type}
                          onChange={InputChange}
                          className="hidden"
                        />
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={productData.status}
                    onChange={InputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="archived">Archived</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description *
                  </label>
                  <textarea
                    name="shortDescription"
                    value={productData.shortDescription}
                    onChange={InputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                    placeholder="Brief description for product cards"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Description
                  </label>
                  <textarea
                    name="description"
                    value={productData.description}
                    onChange={InputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                    placeholder="Detailed product description"
                  />
                </div>
              </div>
            </div>

            {/* Pricing Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-4">
                <FaDollarSign className="text-green-600 text-xl" />
                <h2 className="text-xl font-bold text-gray-900">Pricing Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost Price (₹)
                  </label>
                  <input
                    type="number"
                    name="costPrice"
                    value={productData.costPrice}
                    onChange={InputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="sellingPrice"
                    value={productData.sellingPrice}
                    onChange={InputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="0"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Compare at Price (₹)
                  </label>
                  <input
                    type="number"
                    name="compareAtPrice"
                    value={productData.compareAtPrice}
                    onChange={InputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={productData.quantity}
                    onChange={InputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-4">
                <HiOutlineCollection className="text-purple-600 text-xl" />
                <h2 className="text-xl font-bold text-gray-900">Categories</h2>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {allCategory.map((category) => (
                  <button
                    type="button"
                    key={category._id}
                    onClick={() => handleCategoryToggle(category._id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                      selectedCategories.includes(category._id)
                        ? 'bg-purple-100 border-purple-500 text-purple-700'
                        : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <MdCategory />
                    {category.title}
                    {selectedCategories.includes(category._id) && (
                      <MdCheckBox className="text-green-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags Management */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-4">
                <MdTag className="text-orange-600 text-xl" />
                <h2 className="text-xl font-bold text-gray-900">Tags</h2>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {productData.tags.map((item, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full border border-blue-200"
                  >
                    <span>#{item}</span>
                    <button
                      type="button"
                      onClick={() => handelRemoveTag(index)}
                      className="text-blue-400 hover:text-red-500 transition-colors"
                    >
                      <MdOutlineCancel />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Add a new tag"
                  onKeyPress={(e) => e.key === 'Enter' && handelAddTag(e)}
                />
                <button
                  type="button"
                  onClick={handelAddTag}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <MdAddCircle /> Add
                </button>
              </div>
            </div>

            {/* Features Management */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-4">
                <MdFeaturedPlayList className="text-green-600 text-xl" />
                <h2 className="text-xl font-bold text-gray-900">Features</h2>
              </div>
              
              <div className="space-y-3 mb-4">
                {productData.features.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <MdCheckBox className="text-green-500" />
                      <span>{item}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handelRemovefeatures(index)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <MdRemoveCircle />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newFeatures}
                  onChange={(e) => setNewFeatures(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Add a new feature"
                  onKeyPress={(e) => e.key === 'Enter' && handelAddfeatures(e)}
                />
                <button
                  type="button"
                  onClick={handelAddfeatures}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <MdAddCircle /> Add
                </button>
              </div>
            </div>

            {/* Size Management */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-4">
                <FaRulerHorizontal className="text-red-600 text-xl" />
                <h2 className="text-xl font-bold text-gray-900">Available Sizes</h2>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {productData.size.map((item, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg border border-red-200 uppercase font-medium"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => handelRemoveSize(index)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <MdOutlineCancel />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Add a new size (xs, s, m, l, xl)"
                  onKeyPress={(e) => e.key === 'Enter' && handelAddSize(e)}
                />
                <button
                  type="button"
                  onClick={handelAddSize}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <MdAddCircle /> Add
                </button>
              </div>
            </div>

            {/* Images Management */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-4">
                <MdImage className="text-yellow-600 text-xl" />
                <h2 className="text-xl font-bold text-gray-900">Product Images</h2>
              </div>
              
              {/* Current Images */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Images</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                  {productData.images.map((item, index) => (
                    <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={`${img_url}/${item}`}
                        alt={`Product ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={() => handelDeleteoldImage(item)}
                          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <MdDelete className="text-xl" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* New Images */}
              {productData?.newImages && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">New Images to Upload</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                    {productData.newImages.map((item, index) => (
                      <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={URL.createObjectURL(item)}
                          alt={`New ${index + 1}`}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => handelDeletenewImage(item)}
                            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <MdDelete className="text-xl" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Upload New Images */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={addNewImage}
                  multiple
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <MdUpload className="text-5xl text-gray-400 mb-4" />
                    <div className="text-lg font-medium text-gray-700 mb-2">
                      Click to upload or drag and drop
                    </div>
                    <div className="text-sm text-gray-500">
                      PNG, JPG, WEBP up to 5MB each
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-4">
                <MdStraighten className="text-indigo-600 text-xl" />
                <h2 className="text-xl font-bold text-gray-900">Specifications</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {Object.entries(productData.specifications).map(([key, value], index) => (
                  <div
                    key={key}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium text-gray-900">{key}</div>
                      <div className="text-gray-600">{value}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handelDeletespecifications(key)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={specificationsNew.key}
                  onChange={(e) => setSpecificationsNew(prev => ({ ...prev, key: e.target.value }))}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Specification key (e.g., Material)"
                />
                <input
                  type="text"
                  value={specificationsNew.value}
                  onChange={(e) => setSpecificationsNew(prev => ({ ...prev, value: e.target.value }))}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Specification value"
                  onKeyPress={(e) => e.key === 'Enter' && handelAddSpecification(e)}
                />
              </div>
              <button
                type="button"
                onClick={handelAddSpecification}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <MdAddCircle /> Add Specification
              </button>
            </div>

            {/* Flags */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-4">
                <FaStar className="text-yellow-600 text-xl" />
                <h2 className="text-xl font-bold text-gray-900">Product Flags</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={productData.isFeatured}
                    onChange={InputChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Featured Product</div>
                    <div className="text-sm text-gray-500">Show in featured section</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    name="isBestSeller"
                    checked={productData.isBestSeller}
                    onChange={InputChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Best Seller</div>
                    <div className="text-sm text-gray-500">Mark as best seller</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    name="isNewArrival"
                    checked={productData.isNewArrival}
                    onChange={InputChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">New Arrival</div>
                    <div className="text-sm text-gray-500">Show in new arrivals</div>
                  </div>
                </label>
              </div>
            </div>
          </div>




           <div className="p-6 space-y-6">
                          {/* Free Shipping Toggle */}
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex items-center gap-3">
                              <FaShippingFast className="text-teal-600 text-2xl" />
                              <div>
                                <div className="font-medium text-gray-900">Free Shipping</div>
                                <div className="text-sm text-gray-500">Offer free shipping for this product</div>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={productData.shipping?.isFreeShipping || false}
                                onChange={(e) => handleNestedChange('shipping', 'isFreeShipping', e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-teal-600"></div>
                            </label>
                          </div>
          
                          {/* Weight */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                              <FaWeightHanging className="text-gray-500" /> Weight (kg)
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                value={productData.shipping?.weight || 0}
                                onChange={(e) => handleNestedChange('shipping', 'weight', e.target.value)}
                                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                                placeholder="0"
                                min="0"
                                step="0.1"
                              />
                              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                                <FaWeightHanging />
                              </div>
                              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                                kg
                              </div>
                            </div>
                          </div>
          
                          {/* Dimensions */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                              <TbDimensions className="text-gray-500" /> Dimensions (cm)
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-xs text-gray-500 mb-2 flex items-center gap-1">
                                  <MdHeight /> Length
                                </label>
                                <input
                                  type="number"
                                  value={productData.shipping?.dimensions?.length || 0}
                                  onChange={(e) => handleShippingDimensionChange('length', e.target.value)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                                  placeholder="0"
                                  min="0"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-500 mb-2 flex items-center gap-1">
                                  <MdWidthFull /> Width
                                </label>
                                <input
                                  type="number"
                                  value={productData.shipping?.dimensions?.width || 0}
                                  onChange={(e) => handleShippingDimensionChange('width', e.target.value)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                                  placeholder="0"
                                  min="0"
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-500 mb-2 flex items-center gap-1">
                                  <MdSquareFoot /> Height
                                </label>
                                <input
                                  type="number"
                                  value={productData.shipping?.dimensions?.height || 0}
                                  onChange={(e) => handleShippingDimensionChange('height', e.target.value)}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                                  placeholder="0"
                                  min="0"
                                />
                              </div>
                            </div>
                            <div className="mt-2 text-xs text-gray-500">
                              Total Volume: {(productData.shipping?.dimensions?.length || 0) * (productData.shipping?.dimensions?.width || 0) * (productData.shipping?.dimensions?.height || 0) / 1000000} m³
                            </div>
                          </div>
          
                          {/* Shipping Summary */}
                          <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                            <h4 className="font-medium text-teal-900 mb-2">Shipping Summary</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Weight:</span>
                                <span className="font-medium">{productData.shipping?.weight || 0} kg</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Dimensions:</span>
                                <span className="font-medium">
                                  {productData.shipping?.dimensions?.length || 0} × {productData.shipping?.dimensions?.width || 0} × {productData.shipping?.dimensions?.height || 0} cm
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Free Shipping:</span>
                                <span className={`font-medium ${productData.shipping?.isFreeShipping ? 'text-green-600' : 'text-red-600'}`}>
                                  {productData.shipping?.isFreeShipping ? 'Enabled' : 'Disabled'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

          
<div className="p-6 space-y-6">
                {/* Meta Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MdOutlineSearch className="text-gray-500" /> Meta Title
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={productData.seo?.metaTitle || ''}
                      onChange={(e) => handleNestedChange('seo', 'metaTitle', e.target.value)}
                      className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      placeholder="Optimized title for search engines (50-60 characters)"
                      maxLength="60"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <MdSearch />
                    </div>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                      {60 - (productData.seo?.metaTitle?.length || 0)} chars left
                    </div>
                  </div>
                </div>

                {/* Meta Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MdDescription className="text-gray-500" /> Meta Description
                  </label>
                  <div className="relative">
                    <textarea
                      value={productData.seo?.metaDescription || ''}
                      onChange={(e) => handleNestedChange('seo', 'metaDescription', e.target.value)}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
                      placeholder="Brief description for search results (150-160 characters)"
                      maxLength="160"
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                      {160 - (productData.seo?.metaDescription?.length || 0)} chars left
                    </div>
                  </div>
                </div>

                {/* Keywords */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MdTag className="text-gray-500" /> Keywords
                    </label>
                    <span className="text-xs text-gray-500">
                      {productData.seo?.keywords?.length || 0} keywords added
                    </span>
                  </div>
                  
                  {/* Keywords List */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {productData.seo?.keywords?.map((keyword, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-200"
                      >
                        <span>{keyword}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyword(index)}
                          className="text-indigo-400 hover:text-red-500 transition-colors"
                        >
                          <MdOutlineCancel />
                        </button>
                      </div>
                    ))}
                    {(!productData.seo?.keywords || productData.seo.keywords.length === 0) && (
                      <div className="text-gray-400 italic">No keywords added yet</div>
                    )}
                  </div>

                  {/* Add Keyword */}
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      placeholder="Add a keyword (e.g., velvet, winter, kurta)"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword(e)}
                    />
                    <button
                      type="button"
                      onClick={handleAddKeyword}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                      <MdAddCircle /> Add
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Add relevant keywords separated by commas. These help improve search engine visibility.
                  </p>
                </div>

                {/* SEO Preview */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <MdVisibility className="text-gray-600" /> Search Result Preview
                  </h4>
                  <div className="space-y-2">
                    <div className="font-medium text-blue-700 text-lg truncate">
                      {productData.seo?.metaTitle || productData.title || 'Your Product Title Here'}
                    </div>
                    <div className="text-green-700 text-sm">
                      {window.location.origin}/product/{productData.slug || 'product-slug'}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {productData.seo?.metaDescription || productData.shortDescription || 'Product description will appear here in search results...'}
                    </div>
                  </div>
                </div>
              </div>




          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500">
                Last updated: {new Date(productData.updatedAt).toLocaleDateString()}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <MdArrowBack /> Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <MdSave className="text-xl" />
                  {saving ? 'Saving Changes...' : 'Save Product'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductCompo;