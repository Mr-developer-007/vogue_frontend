"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { base_url, img_url } from '@/app/components/urls';
// Importing icons for table headers and actions
import { FiEdit, FiTrash2, FiPlus, FiImage, FiFileText, FiTag } from 'react-icons/fi';

const AdminBlogTable = () => {
  // State to hold your blog data and loading status
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${base_url}/blog/get`);
      const result = response.data;
      
      // Checking the 'success' flag from your JSON response
      if (result.success) {
        setBlogs(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch blog data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        
       
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Blogs</h1>
            <p className="text-sm text-gray-500 mt-1">View, edit, or delete your blog entries.</p>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg shadow-sm transition-colors text-sm font-medium">
            <FiPlus className="text-lg" />
            Add New Blog
          </button>
        </div>

       
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FiImage className="text-gray-400" /> Image
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FiFileText className="text-gray-400" /> Title & Slug
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FiTag className="text-gray-400" /> Type
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-200 bg-white">
                {loading ? (
                  /* Loading State */
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex justify-center items-center gap-2 text-sm">
                        <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                        Loading data...
                      </div>
                    </td>
                  </tr>
                ) : blogs.length === 0 ? (
                  /* Empty State */
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      No blog entries found.
                    </td>
                  </tr>
                ) : (
                  /* Data Rows */
                  blogs.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                      {/* Image Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-12 w-16 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
                          {item.image ? (
                            <img 
                              // Make sure to prepend your backend URL if the image path is relative
                              src={`${img_url}/${item.image}`} 
                              alt={item.title} 
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src = "https://via.placeholder.com/150?text=No+Image";
                              }}
                            />
                          ) : (
                            <FiImage className="text-gray-400" />
                          )}
                        </div>
                      </td>

                      {/* Title & Slug Column */}
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                        <div className="text-xs text-gray-500 mt-0.5">/{item.slug}</div>
                      </td>

                      {/* Description Column */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 line-clamp-1 max-w-xs" title={item.shortdes}>
                          {item.shortdes}
                        </div>
                      </td>

                      {/* Type Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                          {item.type}
                        </span>
                      </td>

                      {/* Actions Column */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-3">
                          <button 
                            className="text-indigo-600 hover:text-indigo-900 p-2 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FiEdit className="text-lg" />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default AdminBlogTable;