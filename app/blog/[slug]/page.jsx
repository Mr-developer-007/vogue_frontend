import { base_url, img_url } from '@/app/components/urls';
import axios from 'axios';
import React from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiTag, FiClock, FiShare2 } from 'react-icons/fi';

const BlogSinglePage = async ({ params }) => {
  const { slug } = await params;
  let post = null;

  try {
    const response = await axios.get(`${base_url}/blog/single/${slug}`);
    // Note: Axios automatically parses JSON. No need to `await response.data`
    post = response.data.data; // Assuming your API returns { success: true, data: { ... } }
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 font-medium">Failed to load the blog post. Please try again later.</p>
      </div>
    );
  }

  // Fallback UI if no post is returned
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">Post not found.</p>
      </div>
    );
  }

 
  return (
    <article className="min-h-screen bg-white pb-16">
      
      {/* Top Navigation Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link 
          href="/blog" // Update this to your actual blogs listing route
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <FiArrowLeft className="text-lg" />
          Back to all posts
        </Link>
      </div>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
          <img 
            src={`${img_url}/${post.image}`} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <header className="mb-8 border-b border-gray-100 pb-8">
          
          {/* Metadata & Tags */}
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-indigo-50 text-indigo-600 uppercase">
              <FiTag />
              {post.type}
            </span>
            
            <div className="flex gap-4 text-gray-400 text-sm">
              <span className="flex items-center gap-1.5">
                <FiClock /> 5 min read
              </span>
              <button className="hover:text-indigo-600 transition-colors" title="Share this post">
                <FiShare2 />
              </button>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            {post.title}
          </h1>

          {/* Short Description / Lead Paragraph */}
          <p className="text-lg sm:text-xl text-gray-500 leading-relaxed font-medium">
            {post.shortdes}
          </p>
        </header>

        {/* Main Body Content */}
        <div className="prose prose-lg prose-indigo max-w-none text-gray-700">
          {/* If your 'des' field contains raw HTML, you would use:
            <div dangerouslySetInnerHTML={{ __html: post.des }} />
            Otherwise, just render the text:
          */}
          <p className="whitespace-pre-wrap">{post.des}</p>
        </div>
        
      </div>
    </article>
  );
};

export default BlogSinglePage;