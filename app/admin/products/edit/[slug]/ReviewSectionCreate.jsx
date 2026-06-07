import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { base_url } from '@/app/components/urls';
import { FaStar, FaUser, FaMapMarkerAlt, FaCommentAlt, FaSpinner, FaTrash } from 'react-icons/fa';

const ReviewSectionCreate = ({ productid }) => {
  const [reviews, setReviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({
    name: "",
    message: "",
    place: "",
    product: productid,
    rating: 5 
  });

  // Fetch Reviews
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${base_url}/review/get/${productid}`);
      if (response.data && response.data.success) {
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    if (productid) {
      fetchReviews();
    }
  }, [productid]);

  // Handle Form Submission
  const handleAddReview = async (e) => {
    e.preventDefault();

    if (!reviewFormData.name || !reviewFormData.message || !reviewFormData.place) {
      toast.warning("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${base_url}/review/create`, reviewFormData);
      
      if (response.data) {
        toast.success("Review submitted successfully!");
        setReviewFormData({
          name: "",
          message: "",
          place: "",
          product: productid,
          rating: 5
        });
        fetchReviews();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Review Deletion
  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      // NOTE: Ensure this matches your backend delete route
      const response = await axios.delete(`${base_url}/review/delete/${reviewId}`);
      
      if (response.data) {
        toast.success("Review deleted successfully!");
        fetchReviews(); // Refresh the list after deletion
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete review.");
    }
  };

  // Helper for interactive stars
  const handleStarClick = (rateValue) => {
    setReviewFormData((prev) => ({ ...prev, rating: rateValue }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      
      {/* --- FORM SECTION --- */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Write a Review</h3>
        
        <form onSubmit={handleAddReview} className="space-y-4">
          
          {/* Interactive Star Rating */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium text-gray-700">Your Rating:</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-xl transition-colors ${
                    star <= reviewFormData.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => handleStarClick(star)}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                value={reviewFormData.name}
                onChange={(e) => setReviewFormData((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>

            {/* Place Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Your Location/City"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                value={reviewFormData.place}
                onChange={(e) => setReviewFormData((prev) => ({ ...prev, place: e.target.value }))}
              />
            </div>
          </div>

          {/* Message Input */}
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none">
              <FaCommentAlt className="text-gray-400" />
            </div>
            <textarea
              rows="4"
              placeholder="Tell us about your experience..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
              value={reviewFormData.message}
              onChange={(e) => setReviewFormData((prev) => ({ ...prev, message: e.target.value }))}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin" /> Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </button>
        </form>
      </div>

      {/* --- REVIEWS DISPLAY SECTION --- */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Customer Reviews</h3>
        
        {reviews.length === 0 ? (
          <p className="text-gray-500 italic">No reviews yet. Be the first to leave one!</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => {
              // Handle potential naming mismatch from db (rating vs ratting)
              const reviewRating = review.rating || review.ratting || 5; 
              
              return (
                <div key={review._id} className="p-4 bg-gray-50 rounded-lg border border-gray-100 group">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800 capitalize">{review.name}</h4>
                      
                      {/* Render Submitted Rating Stars */}
                      <div className="flex mt-1 mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={`text-sm ${
                              star <= reviewRating ? "text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <FaMapMarkerAlt /> {review.place}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                      {/* Delete Button - Made visible consistently, but fades slightly until hover */}
                      <button 
                        onClick={() => handleDeleteReview(review._id)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1"
                        title="Delete Review"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-3 text-sm">{review.message}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
    </div>
  );
};

export default ReviewSectionCreate;