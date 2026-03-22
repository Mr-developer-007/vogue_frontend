"use client"
import { base_url, img_url } from '@/app/components/urls'
import axios from 'axios'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash, FaEye, FaCheck, FaTimes, FaPlus } from 'react-icons/fa'

const ProductsPage = () => {
  const searchParams = useSearchParams()
  const page = searchParams.get('page') || 1
  const [productsData, setProductsData] = useState(null)
  const [loading, setLoading] = useState(true)

  const getProduct = async (filter) => {
    try {
      setLoading(true)
      const response = await axios.get(`${base_url}/products/get?${filter}`)
      const data = await response.data;
      setProductsData(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProduct(`page=${page}`)
  }, [page])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!productsData || !productsData.success) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Failed to load products</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-600 mt-2">
            Showing {productsData.count} of {productsData.totalProducts} products
            (Page {productsData.page} of {productsData.totalPages})
          </p>
        </div>
        
        <Link 
          href="/admin/products/create"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
        >
          <FaPlus />
          Create Product
        </Link>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Compare Price
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  For
                </th>
                <th scope="col" className="px 6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productsData.products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <img
                          className="h-12 w-12 rounded-lg object-cover"
                          src= { `${img_url}/${product.images[0]}` || '/placeholder-image.jpg'}
                          alt={product.title}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.title.substring(0, 50)}...
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.shortDescription.substring(0, 50)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">
                      ₹{product.sellingPrice}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 line-through">
                      ₹{product.compareAtPrice}
                    </div>
                    <div className="text-xs text-red-600 font-medium">
                      Save ₹{product.compareAtPrice - product.sellingPrice}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.productfor === 'male' 
                        ? 'bg-blue-100 text-blue-800'
                        : product.productfor === 'female'
                        ? 'bg-pink-100 text-pink-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {product.productfor}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      <FaCheck className="mr-1" /> Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <Link  href={`/admin/products/view/${product.slug}`} className="text-blue-600 hover:text-blue-900 transition duration-150">
                        <FaEye className="text-lg" />
                      </Link>
                      <Link 
                        href={`/admin/products/edit/${product.slug}`}
                        className="text-green-600 hover:text-green-900 transition duration-150"
                      >
                        <FaEdit className="text-lg" />
                      </Link>
                      {/* <button className="text-red-600 hover:text-red-900 transition duration-150">
                        <FaTrash className="text-lg" />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">
                Showing page {productsData.page} of {productsData.totalPages}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                disabled={productsData.page <= 1}
                onClick={() => getProduct(`page=${productsData.page - 1}`)}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${
                  productsData.page <= 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>
              <button
                disabled={productsData.page >= productsData.totalPages}
                onClick={() => getProduct(`page=${productsData.page + 1}`)}
                className={`px-4 py-2 text-sm font-medium rounded-lg ${
                  productsData.page >= productsData.totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-blue-600">{productsData.totalProducts}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Current Page</h3>
          <p className="text-3xl font-bold text-green-600">{productsData.page}/{productsData.totalPages}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Products on this page</h3>
          <p className="text-3xl font-bold text-purple-600">{productsData.count}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage