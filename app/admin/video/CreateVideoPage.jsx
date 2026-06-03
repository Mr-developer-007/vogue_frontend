"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { HiOutlineSearch, HiX } from 'react-icons/hi'
import { FiLoader, FiUploadCloud, FiCheckCircle, FiVideo } from 'react-icons/fi'
import { base_url } from '@/app/components/urls'

const CreateVideoPage = () => {
  const [searchval, setSearchval] = useState("")
  const [searchData, setSearchData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [video, setVideo] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Search Logic
  const searchHandel = async (searchdata) => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${base_url}/products/search/?search=${searchdata}`)
      const data = response.data;
      
      if (data.success) {
        setSearchData(data.data || data.products || [])
      } else {
        setSearchData([])
      }
    } catch (error) {
      console.error("Search failed:", error)
      setSearchData([])
    } finally {
      setIsLoading(false)
    }
  }

  // Debounced Search Effect
  useEffect(() => {
    if (searchval.trim().length <= 2) {
      setSearchData([])
      setIsLoading(false)
      return;
    }

    const timeoutId = setTimeout(() => {
      searchHandel(searchval.trim()) 
    }, 500);
    
    return () => clearTimeout(timeoutId)
  }, [searchval])

  // File Selection Logic
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes('video')) {
      setVideo(file);
    } else {
      alert("Please upload a valid video file.");
      e.target.value = null; // reset input
    }
  }

  const handleSubmit = async () => {
    if (!selectedProduct || !video) return;

    try {
      setIsSubmitting(true)
      
      // Create FormData to send file and product ID
      const formData = new FormData();
      formData.append('product', selectedProduct._id);
      formData.append('video', video);

      // Example API Call:
      await axios.post(`${base_url}/video/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert("Video linked successfully!");
      // Reset form if needed
      setSelectedProduct(null);
      setVideo(null);
      
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to upload video.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='min-h-screen bg-neutral-50 flex justify-center items-center p-4 md:p-8 font-sans'>
      
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-neutral-100 p-6 md:p-10 space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900">Link Video to Product</h1>
          <p className="text-neutral-500">Search for a product and upload a video to connect them.</p>
        </div>

        {/* STEP 1: PRODUCT SELECTION */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-neutral-700 uppercase tracking-wider">
            Step 1: Select Product
          </label>

          {/* Show Selected Product OR Search Bar */}
          {selectedProduct ? (
            <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="flex items-center space-x-3">
                <FiCheckCircle className="text-emerald-500 text-xl" />
                <span className="font-medium text-emerald-900">{selectedProduct.title}</span>
              </div>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-full transition-colors"
                title="Remove product"
              >
                <HiX className="text-xl" />
              </button>
            </div>
          ) : (
            <div className="relative flex flex-col border border-neutral-200 rounded-xl bg-neutral-50 overflow-hidden focus-within:border-neutral-900 focus-within:ring-1 focus-within:ring-neutral-900 transition-all">
              <div className="flex items-center px-4 py-3 border-b border-transparent">
                <HiOutlineSearch className="text-neutral-400 text-2xl mr-3" />
                <input 
                  type="search" 
                  value={searchval} 
                  onChange={(e) => setSearchval(e.target.value)} 
                  placeholder="Search for products by name..." 
                  className="w-full text-base text-neutral-800 placeholder-neutral-400 outline-none bg-transparent" 
                />
              </div>

              {/* Results Dropdown Area */}
              {(isLoading || (searchval.length > 2 && searchData.length >= 0)) && (
                <div className="max-h-60 overflow-y-auto border-t border-neutral-200 bg-white shadow-inner">
                  
                  {isLoading && (
                    <div className="flex items-center justify-center p-6 text-neutral-500">
                      <FiLoader className="animate-spin mr-2" size={20} />
                      <span className="text-sm">Searching...</span>
                    </div>
                  )}

                  {!isLoading && searchval.length > 2 && searchData.length === 0 && (
                    <div className="p-6 text-center text-neutral-500 text-sm">
                      No products found for "{searchval}".
                    </div>
                  )}

                  {!isLoading && searchData.length > 0 && (
                    <div className="flex flex-col">
                      {searchData.map((item) => (
                        <button 
                          key={item._id}
                          onClick={() => {
                            setSelectedProduct(item);
                            setSearchval("");
                            setSearchData([]);
                          }}
                          className="px-4 py-3 text-left border-b border-neutral-100 last:border-0 hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 transition-colors"
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* STEP 2: VIDEO UPLOAD */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-neutral-700 uppercase tracking-wider">
            Step 2: Upload Video
          </label>
          
          <label 
            htmlFor="video-upload" 
            className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
              video ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-300 bg-white hover:bg-neutral-50 hover:border-neutral-400'
            }`}
          >
            {video ? (
              <div className="flex flex-col items-center text-neutral-900">
                <FiVideo className="w-10 h-10 mb-3 text-neutral-700" />
                <span className="font-medium">{video.name}</span>
                <span className="text-sm text-neutral-500 mt-1">
                  {(video.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center text-neutral-500">
                <FiUploadCloud className="w-10 h-10 mb-3 text-neutral-400" />
                <span className="font-medium text-neutral-700">Click to upload a video</span>
                <span className="text-sm mt-1">MP4, WebM, or OGG</span>
              </div>
            )}
            <input 
              id="video-upload"
              type="file" 
              accept="video/*"
              className="hidden" 
              onChange={handleVideoChange}
            />
          </label>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-4">
          <button
            onClick={handleSubmit}
            disabled={!selectedProduct || !video || isSubmitting}
            className={`w-full py-4 rounded-xl font-medium text-lg transition-all flex items-center justify-center ${
              !selectedProduct || !video
                ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                : 'bg-neutral-900 text-white hover:bg-neutral-800 active:scale-[0.99]'
            }`}
          >
            {isSubmitting ? (
              <>
                <FiLoader className="animate-spin mr-2" size={20} />
                Uploading...
              </>
            ) : (
              'Create Product Video'
            )}
          </button>
        </div>

      </div>
    </div>
  )
}

export default CreateVideoPage