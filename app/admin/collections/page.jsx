"use client"
import { base_url, img_url } from '@/app/components/urls';
import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react'
import { PiUploadSimpleBold, PiXBold, PiCheckBold, PiPlusBold, PiPencilSimple, PiEye, PiEyeSlash } from "react-icons/pi";
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaMapMarkerAlt, FaBoxOpen, FaSave, FaTimes } from 'react-icons/fa';
import { MdOutlineOpenInNew, MdFiberManualRecord, MdDelete } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';

const CreateCollectionPage = () => {
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [allCollection, setAllCollection] = useState([]);
  const [toggleForm, setToggleForm] = useState(false);
  
  // Tag input state
  const [tagInput, setTagInput] = useState("");
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    des: "",
    color: "#3b82f6", 
    image: null,
    status: true
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Fetch collections
  const fetchCollection = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${base_url}/collection/get-all`);
      const data = response.data;
      if (data.success) {
        setAllCollection(data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch collections");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);

  // Image handlers
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };







  // Form handlers
  const resetForm = () => {
    setFormData({
      title: "",
      des: "",
      color: "#3b82f6",
      image: null,
    
      status: true
    });
    setTagInput("");
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setEditingId(null);
  };

  const handleEdit = (collection) => {
    setFormData({
      title: collection.title,
      des: collection.des,
      color: collection.color,
      image: null,
     
      status: collection.status
    });
    setPreviewUrl(collection.image ? `${img_url}/${collection.image}` : null);
    setEditingId(collection._id);
    setToggleForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }
    
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title.trim());
      data.append("des", formData.des.trim());
      data.append("color", formData.color);
      data.append("status", formData.status);

      if (formData.image) {
        data.append("image", formData.image);
      }


      let response;
      if (editingId) {
        // Update existing collection
        response = await axios.put(`${base_url}/collection/update/${editingId}`, data);
      } else {
        // Create new collection
        response = await axios.post(`${base_url}/collection/create`, data);
      }
      
      const res = response.data;
      
      if (res.success) {
        toast.success(res.message);
        resetForm();
        setToggleForm(false);
        fetchCollection();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this collection?")) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await axios.delete(`${base_url}/collection/delete/${id}`);
      const res = response.data;
      
      if (res.success) {
        toast.success("Collection deleted successfully");
        fetchCollection();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Failed to delete collection");
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const response = await axios.patch(`${base_url}/collection/toggle-status/${id}`);
      
      const res = response.data;
      if (res.success) {
        toast.success(`Collection ${!currentStatus ? 'activated' : 'deactivated'}`);
        fetchCollection();
      }
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };


  const filteredCollections = allCollection.filter(collection =>
    collection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collection.state.some(state => 
      state.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  

  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-6'>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Collections</h1>
            <p className="text-gray-600 mt-1">Manage your product collections</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search collections..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
            
            <button
              onClick={() => {
                resetForm();
                setToggleForm(!toggleForm);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <PiPlusBold size={20} />
              {toggleForm ? "View Collections" : "New Collection"}
            </button>
          </div>
        </div>

        {/* Create/Edit Form */}
        {toggleForm && (
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">
                    {editingId ? "Edit Collection" : "Create New Collection"}
                  </h2>
                  <button
                    onClick={() => {
                      resetForm();
                      setToggleForm(false);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FaTimes size={20} className="text-gray-500" />
                  </button>
                </div>
                <p className="text-gray-600 mt-1">
                  {editingId ? "Update the collection details" : "Add a new product collection"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Image Upload */}
                  <div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Collection Image
                      </label>
                      <div className="relative group">
                        <div className={`w-full aspect-[4/5] rounded-xl overflow-hidden border-2 ${previewUrl ? 'border-gray-300' : 'border-dashed border-gray-300'} bg-gray-50 flex items-center justify-center transition-colors hover:border-blue-400`}>
                          {previewUrl ? (
                            <div className="relative w-full h-full">
                              <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="flex gap-2">
                                  <label  className="cursor-pointer bg-white text-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors">
                                    <PiPencilSimple size={20} />
                                   
                                  </label>
                                  <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="bg-white text-red-600 p-3 rounded-full shadow-lg hover:bg-red-50 transition-colors"
                                  >
                                    <PiXBold size={20} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <label htmlFor='img' className="cursor-pointer w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 transition-colors">
                              <div className="mb-3">
                                <PiUploadSimpleBold size={48} />
                              </div>
                              <p className="font-medium">Upload Image</p>
                              <p className="text-sm mt-1">Recommended: 800x1000px</p>
                              <p className="text-xs text-gray-400 mt-1">Max 5MB</p>
                               <input
                                      type="file"
                                      id='img'
                                      accept="image/*"
                                      className="hidden"
                                      onChange={handleImageChange}
                                    />

                            </label>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Status Toggle */}
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <p className="text-sm text-gray-600">
                          {formData.status ? "Active - Visible to customers" : "Draft - Hidden from customers"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, status: !prev.status }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.status ? 'bg-green-500' : 'bg-gray-300'}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.status ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Right Column - Form Fields */}
                  <div className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter collection title"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                        value={formData.des}
                        onChange={(e) => setFormData(prev => ({ ...prev, des: e.target.value }))}
                        placeholder="Enter collection description"
                      />
                    </div>

                  

                    {/* Color Picker */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Accent Color
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="color"
                          className="h-12 w-24 border-2 border-gray-300 rounded-lg cursor-pointer"
                          value={formData.color}
                          onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                        />
                        <div className="text-sm text-gray-600">
                          <div className="font-medium" style={{ color: formData.color }}>
                            Selected Color
                          </div>
                          <div className="text-gray-500">{formData.color}</div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            {editingId ? "Updating..." : "Creating..."}
                          </>
                        ) : (
                          <>
                            <FaSave size={18} />
                            {editingId ? "Update Collection" : "Create Collection"}
                          </>
                        )}
                      </button>
                      
                      {editingId && (
                        <button
                          type="button"
                          onClick={resetForm}
                          className="px-6 py-3 border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Collections Table */}
        {!toggleForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">All Collections</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {filteredCollections.length} collection{filteredCollections.length !== 1 ? 's' : ''} found
                  </p>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading && allCollection.length === 0 ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading collections...</p>
              </div>
            ) : filteredCollections.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <FaBoxOpen size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No collections found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm ? "Try a different search term" : "Get started by creating your first collection"}
                </p>
                {!searchTerm && (
                  <button
                    onClick={() => setToggleForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2"
                  >
                    <PiPlusBold size={20} />
                    Create Collection
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Collection</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Locations</th>
                      <th className="px6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Products</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredCollections.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="relative h-16 w-16 flex-shrink-0">
                              <img
                                src={`${img_url}/${item.image}`}
                                alt={item.title}
                                className="h-16 w-16 rounded-lg object-cover border-2"
                                style={{ borderColor: item.color }}
                              />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">{item.title}</div>
                              <div className="text-sm text-gray-500 mt-1 line-clamp-2">{item.des}</div>
                              <div className="text-xs text-gray-400 font-mono mt-1">/{item.slug}</div>
                            </div>
                          </div>
                        </td>

                      

                        <td className="px-6 py-4">
                          <Link href={`/admin/collections/${item._id}`} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                            <FaBoxOpen className="text-gray-600" size={14} />
                            <span className="font-bold text-gray-700">{item.products.length}</span>
                            <span className="text-sm text-gray-600">products</span>
                          </Link>
                        </td>

                        <td className="px-6 py-4">
                          <button
                            onClick={() => toggleStatus(item._id, item.status)}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${item.status
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                              }`}
                          >
                            {item.status ? (
                              <>
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                Active
                              </>
                            ) : (
                              <>
                                <div className="h-2 w-2 rounded-full bg-gray-500"></div>
                                Draft
                              </>
                            )}
                          </button>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <PiPencilSimple size={18} />
                            </button>
                            
                            <button
                              onClick={() => window.open(`/collections/${item.slug}`, '_blank')}
                              className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="View"
                            >
                              <MdOutlineOpenInNew size={18} />
                            </button>
                            
                            <button
                              onClick={() => handleDelete(item._id)}
                              disabled={deletingId === item._id}
                              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Delete"
                            >
                              {deletingId === item._id ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                              ) : (
                                <FaTrash size={16} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCollectionPage;