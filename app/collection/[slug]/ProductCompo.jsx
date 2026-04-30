"use client"
import ProductCart from '@/app/components/ProductCart'
import { base_url, img_url } from '@/app/components/urls'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ProductCompo = ({ slug }) => {
    const [collection, setCollection] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCollection = async () => {
        try {
            const res = await axios.get(`${base_url}/collection/product/${slug}`);
            setCollection(res.data.data);
        } catch (error) {
            console.error("Error fetching collection:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCollection();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-pulse text-xl font-medium text-gray-400 tracking-widest uppercase">
                    Loading Collection...
                </div>
            </div>
        );
    }

    if (!collection) {
        return (
            <div className="flex items-center justify-center min-h-[50vh] text-gray-500">
                Collection not found.
            </div>
        );
    }

    return (
        <div className="container  mx-auto px-4 py-12 sm:px-6 lg:px-8">
            
            {/* --- Hero / Banner Section --- */}
            <div className="items-center mb-16 relative">
                {/* Image */}
                <div className="relative w-full rounded-2xl overflow-hidden shadow-lg">
                    <img 
                        src={`${img_url}/${collection.image}`} 
                        alt={collection.title} 
                        className="w-full h-full object-contain object-right max-h-[400px]" 
                    />
                </div>

                
                <div 
                    className="border-l-4 p-8 absolute top-1  rounded-r-2xl shadow-sm flex flex-col justify-center h-full" 
                    style={{ borderColor: collection.color || '#000' }}
                >
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">
                        {collection?.title}
                    </h1>
                    <p className="text-gray-600 max-w-2xl leading-relaxed whitespace-pre-line text-lg">
                        {collection?.des}
                    </p>
                </div>
            </div>

            {/* --- Product Grid --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {collection.products?.map((product) => (
                    <ProductCart key={product._id} product={product} />
                ))}
            </div>
            
            {/* Empty State Fallback */}
            {collection.products?.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200 mt-8">
                    <p className="text-xl text-gray-500">No products found in this collection.</p>
                </div>
            )}
        </div>
    )
}

export default ProductCompo