"use client"
import React, { useEffect, useState } from 'react'
import CreateVideoPage from './CreateVideoPage'
import axios from 'axios'
import { base_url } from '@/app/components/urls'
import { FiLoader, FiVideo, FiShoppingBag, FiPlus, FiTrash2 } from 'react-icons/fi'

const VideoManagementPage = () => {
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(null) // Tracks which video is being deleted

  const fetchVideo = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${base_url}/video/getall`)
      const data = response.data;
      
      if (data.success) {
        setVideos(data.videos || [])
      }
    } catch (error) {
      console.error("Failed to fetch videos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchVideo()
  }, [])

  // Delete Logic
  const handleDelete = async (videoId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this video? This action cannot be undone.");
    
    if (!confirmDelete) return;

    try {
      setIsDeleting(videoId)
      // Assuming your backend delete route is /video/delete/:id
      // Adjust this URL if your backend route is named differently
      const response = await axios.delete(`${base_url}/video/delete/${videoId}`)
      
      if (response.data.success) {
        // Remove the video from the UI immediately without re-fetching
        setVideos(prevVideos => prevVideos.filter(video => video._id !== videoId));
      } else {
        alert("Failed to delete the video. Please try again.");
      }
    } catch (error) {
      console.error("Failed to delete video:", error)
      alert("An error occurred while deleting the video.");
    } finally {
      setIsDeleting(null)
    }
  }

  // If the user clicks "Create New", render your CreateVideoPage
  if (isCreating) {
    return (
      <div className="min-h-screen bg-neutral-50 relative">
        <button 
          onClick={() => { setIsCreating(false); fetchVideo(); }}
          className="absolute top-6 left-6 md:top-10 md:left-10 z-10 px-4 py-2 bg-white border border-neutral-200 text-neutral-700 rounded-lg shadow-sm hover:bg-neutral-50 transition-colors font-medium text-sm"
        >
          &larr; Back to Gallery
        </button>
        <CreateVideoPage />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-neutral-50 p-6 md:p-12 font-sans'>
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900">Product Videos</h1>
          <p className="text-neutral-500 mt-1">Manage and view all videos linked to your products.</p>
        </div>
        
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center px-5 py-2.5 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors font-medium"
        >
          <FiPlus className="mr-2" />
          Link New Video
        </button>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto">
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-500">
            <FiLoader className="animate-spin w-8 h-8 mb-4 text-neutral-900" />
            <p>Loading videos...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && videos.length === 0 && (
          <div className="bg-white border border-neutral-200 border-dashed rounded-2xl flex flex-col items-center justify-center py-24 text-center">
            <FiVideo className="w-12 h-12 text-neutral-300 mb-4" />
            <h3 className="text-lg font-medium text-neutral-900">No videos found</h3>
            <p className="text-neutral-500 mt-1 max-w-sm">You haven't linked any videos to your products yet. Click the button above to get started.</p>
          </div>
        )}

        {/* Video Grid */}
        {!isLoading && videos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((item) => (
              <div 
                key={item._id} 
                className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col relative"
              >
                {/* Delete Button - Appears over the video */}
                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={isDeleting === item._id}
                  className="absolute top-3 right-3 z-10 p-2 bg-white/90 text-rose-500 rounded-full shadow-sm hover:bg-rose-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Delete Video"
                >
                  {isDeleting === item._id ? (
                    <FiLoader className="animate-spin w-4 h-4" />
                  ) : (
                    <FiTrash2 className="w-4 h-4" />
                  )}
                </button>

                {/* Video Player */}
                <div className="relative aspect-[9/16] bg-black overflow-hidden w-full">
                  <video 
                    src={`${base_url}/video/watch/${item._id}`} 
                    controls
                    preload="metadata"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Product Info */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                      <FiShoppingBag />
                      <span>Linked Product</span>
                    </div>
                    <h3 className="font-semibold text-neutral-900 text-lg leading-tight mb-1 truncate" title={item.product?.title}>
                      {item.product?.title || "Unknown Product"}
                    </h3>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
                    <span className="font-medium text-neutral-900">
                      ₹{item.product?.sellingPrice?.toLocaleString('en-IN') || "0"}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {new Date(item.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default VideoManagementPage