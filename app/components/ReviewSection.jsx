"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FaStar, FaRegStar, FaUser, FaMapMarkerAlt, FaCalendarAlt, FaComment } from 'react-icons/fa';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Replace with your actual base_url path
import { base_url } from './urls';

// Helper component to render star ratings
const StarRating = ({ rating }) => {
  const totalStars = 5;
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(totalStars)].map((_, i) => (
        i < rating ? (
          <FaStar key={i} className="text-yellow-500 w-4 h-4" />
        ) : (
          <FaRegStar key={i} className="text-gray-300 w-4 h-4" />
        )
      ))}
      <span className="ml-2 text-sm text-gray-600 font-medium">{rating}.0</span>
    </div>
  );
};

// Skeleton loader for reviews
const ReviewSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-md p-5 animate-pulse">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-gray-200 rounded-full" />
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-24" />
      </div>
    </div>
    <div className="h-4 bg-gray-200 rounded w-28 mb-3" />
    <div className="h-3 bg-gray-200 rounded w-full mb-2" />
    <div className="h-3 bg-gray-200 rounded w-5/6" />
  </div>
);





const ReviewSection = ({ productid }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    if (!productid) return;
    
    try {
      setLoading(true);
      const response = await axios.get(`${base_url}/review/get/${productid}`);
      if (response.data && response.data.success) {
        // Sort reviews by newest first
        const sortedReviews = [...response.data.reviews].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setReviews(sortedReviews);
        setError(null);
      } else {
        setReviews([]);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to load reviews. Please try again later.");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productid) {
      fetchReviews();
    }
  }, [productid]);

  // Calculate average rating and statistics
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
    : '0.0';

  // Format date nicely
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!productid) {
    return (
      <div className="text-center py-8 text-gray-500">
        No product selected
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error}</p>
        <button
          onClick={fetchReviews}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Reviews Header with Stats */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaComment className="text-blue-600" />
            Customer Reviews
          </h2>
          <p className="text-gray-500 mt-1">
            What our customers are saying
          </p>
        </div>
        
        {totalReviews > 0 && (
          <div className="flex items-center gap-4 bg-gray-50 rounded-2xl px-5 py-3 shadow-sm">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">{averageRating}</div>
              <div className="flex items-center gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= parseFloat(averageRating)
                        ? 'text-yellow-500'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="border-l border-gray-300 pl-4">
              <div className="text-2xl font-semibold text-gray-800">{totalReviews}</div>
              <div className="text-sm text-gray-500">Reviews</div>
            </div>
          </div>
        )}
      </div>

      {/* Reviews Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReviewSkeleton />
          <ReviewSkeleton />
        </div>
      ) : totalReviews === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <FaComment className="text-5xl text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-700">No reviews yet</h3>
          <p className="text-gray-500 mt-1">Be the first to share your experience!</p>
        </div>
      ) : (
        // Swiper Carousel for Reviews
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
            }}
            className="review-swiper pb-12"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col p-6 border border-gray-100">
                  {/* User Info */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm">
                      {review.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {review.name || 'Anonymous'}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                        <FaMapMarkerAlt className="w-3 h-3" />
                        <span>{review.place || 'Not specified'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-3">
                    <StarRating rating={review.rating} />
                  </div>

                  {/* Review Message */}
                  <p className="text-gray-700 leading-relaxed mb-4 flex-grow">
                    {review.message || 'No comments provided.'}
                  </p>

                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2 pt-2 border-t border-gray-100">
                    <FaCalendarAlt className="w-3 h-3" />
                    <time dateTime={review.createdAt}>
                      Reviewed on {formatDate(review.createdAt)}
                    </time>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Custom CSS to style Swiper navigation buttons nicely */}
      <style jsx>{`
        :global(.review-swiper .swiper-button-next),
        :global(.review-swiper .swiper-button-prev) {
          background-color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.2s ease;
        }
        :global(.review-swiper .swiper-button-next:hover),
        :global(.review-swiper .swiper-button-prev:hover) {
          background-color: #f3f4f6;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        :global(.review-swiper .swiper-button-next:after),
        :global(.review-swiper .swiper-button-prev:after) {
          font-size: 18px;
          font-weight: bold;
          color: #374151;
        }
        :global(.review-swiper .swiper-pagination-bullet) {
          background-color: #cbd5e1;
          width: 8px;
          height: 8px;
        }
        :global(.review-swiper .swiper-pagination-bullet-active) {
          background-color: #3b82f6;
        }
        @media (max-width: 640px) {
          :global(.review-swiper .swiper-button-next),
          :global(.review-swiper .swiper-button-prev) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ReviewSection;