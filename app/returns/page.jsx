import React from 'react';
import { 
  FaBoxOpen, 
  FaRegTimesCircle, 
  FaMoneyBillWave, 
  FaExclamationTriangle, 
  FaExchangeAlt 
} from 'react-icons/fa';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Refund & Return Policy
          </h1>
          <p className="text-sm text-gray-500 font-medium mb-6">
            Last Updated: June 2026
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At <span className="font-semibold text-gray-900">The Vogue Wardrobe</span>, customer satisfaction is our priority. If you're not completely satisfied with your purchase, we're here to help.
          </p>
        </div>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Eligibility for Refund */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full text-green-600 mr-4">
                <FaBoxOpen size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Eligibility for Refund</h2>
            </div>
            <p className="text-gray-600 mb-4">
              You may request a refund within <strong className="text-gray-900">7 days</strong> of receiving your order. To be eligible, the product must meet the following criteria:
            </p>
            <ul className="space-y-2 text-gray-600 list-disc list-inside marker:text-green-500">
              <li>Must be unused and unwashed</li>
              <li>Original tags must remain attached</li>
              <li>Must be in original packaging</li>
              <li>Should not show signs of wear or damage</li>
            </ul>
          </div>

          {/* Non-Refundable Items */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full text-red-600 mr-4">
                <FaRegTimesCircle size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Non-Refundable Items</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Please note that refunds will <strong className="text-red-600">not</strong> be applicable for the following:
            </p>
            <ul className="space-y-2 text-gray-600 list-disc list-inside marker:text-red-500">
              <li>Products damaged due to customer misuse</li>
              <li>Products returned without original tags</li>
              <li>Products returned after the 7-day window</li>
              <li>Gift cards and promotional items</li>
            </ul>
          </div>

          {/* Refund Process */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:col-span-2 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600 mr-4">
                <FaMoneyBillWave size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Refund Process</h2>
            </div>
            <p className="text-gray-600 mb-4">Once the returned item is received and inspected:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-1">1. Approval Notification</h3>
                <p className="text-sm text-gray-600">Refund approval will be communicated via email or WhatsApp.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-1">2. Processing Time</h3>
                <p className="text-sm text-gray-600">Approved refunds will be processed within 5-7 working days.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-1">Prepaid Orders</h3>
                <p className="text-sm text-gray-600">Credited directly back to the original payment method.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-1">COD Orders</h3>
                <p className="text-sm text-gray-600">Processed via bank transfer or UPI after receiving customer details.</p>
              </div>
            </div>
          </div>

          {/* Damaged or Incorrect Products */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-3 rounded-full text-orange-600 mr-4">
                <FaExclamationTriangle size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Damaged or Incorrect Items</h2>
            </div>
            <p className="text-gray-600">
              If you receive a damaged, defective, or wrong item, please contact us within <strong className="text-gray-900">48 hours</strong> of delivery. 
              <br/><br/>
              Providing photos or an unboxing video will help us ensure a faster resolution. We will arrange a replacement at no additional cost to you.
            </p>
          </div>

          {/* Exchange Approval */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full text-purple-600 mr-4">
                <FaExchangeAlt size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Exchange Approvals</h2>
            </div>
            <p className="text-gray-600">
              Our team may request product images to verify the condition of the item before approving an exchange request. 
              This helps us maintain our quality standards and process your request smoothly.
            </p>
          </div>

        </div>

        {/* Footer/Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Need further assistance? <a href="mailto:thevoguewardrobeofficial@gmail.com" className="text-blue-600 font-semibold hover:underline">Contact our Support Team</a>.
          </p>
        </div>

      </div>
    </div>
  );
};

export default RefundPolicy;