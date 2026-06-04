import React from 'react';
import { 
  HiOutlineTruck, 
  HiOutlineClock, 
  HiOutlineCurrencyRupee, 
  HiOutlineLocationMarker, 
  HiOutlineExclamationCircle,
  HiOutlineHeart,
  HiSparkles
} from 'react-icons/hi';

const ShippingPolicy = () => {
  const policies = [
    {
      title: "Processing Time",
      icon: <HiOutlineClock className="w-6 h-6" />,
      content: (
        <ul className="space-y-2 text-gray-600 text-sm md:text-base">
          <li>• Orders are processed within <strong>24-48 hours</strong>.</li>
          <li>• Orders placed on weekends or public holidays may require additional processing time.</li>
        </ul>
      )
    },
    {
      title: "Delivery Time",
      icon: <HiOutlineTruck className="w-6 h-6" />,
      content: (
        <ul className="space-y-2 text-gray-600 text-sm md:text-base">
          <li>• <strong>Metro Cities:</strong> 2-5 Business Days</li>
          <li>• <strong>Other Locations:</strong> 4-8 Business Days</li>
          <li className="text-xs text-gray-500 mt-2 italic">*Delivery timelines may vary due to unforeseen circumstances.</li>
        </ul>
      )
    },
    {
      title: "Shipping Charges",
      icon: <HiOutlineCurrencyRupee className="w-6 h-6" />,
      content: (
        <ul className="space-y-2 text-gray-600 text-sm md:text-base">
          <li>• <strong>Free Shipping</strong> on eligible prepaid orders.</li>
          <li>• Any shipping promotions will be clearly displayed during checkout.</li>
        </ul>
      )
    },
    {
      title: "Order Tracking",
      icon: <HiOutlineLocationMarker className="w-6 h-6" />,
      content: (
        <p className="text-gray-600 text-sm md:text-base">
          Once your order is shipped, complete tracking details will be promptly shared with you via Email, SMS, or WhatsApp.
        </p>
      )
    },
    {
      title: "Failed Delivery Attempts",
      icon: <HiOutlineExclamationCircle className="w-6 h-6" />,
      content: (
        <p className="text-gray-600 text-sm md:text-base">
          Our courier partners may attempt delivery multiple times. If the delivery cannot be completed, the package may be safely returned to us.
        </p>
      )
    }
  ];

  const promises = [
    "Premium Comfort",
    "Luxury Feel",
    "Honest Pricing",
    "Reliable Service"
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] py-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-stone-200">
      
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-3">
          Last Updated: June 2026
        </p>
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
          Shipping Policy
        </h1>
        <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
          At <span className="font-medium text-gray-900">The Vogue Wardrobe</span>, we aim to deliver premium fashion quickly and safely right to your doorstep.
        </p>
      </div>

      {/* Policies Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-20">
        {policies.map((policy, index) => (
          <div 
            key={index} 
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-4 text-gray-900">
              <div className="p-3 bg-stone-50 rounded-full text-indigo-900">
                {policy.icon}
              </div>
              <h2 className="text-xl font-serif font-medium tracking-wide">
                {policy.title}
              </h2>
            </div>
            <div className="pl-[3.25rem]">
              {policy.content}
            </div>
          </div>
        ))}
      </div>

      {/* Customer First Promise Section */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 text-white rounded-2xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <HiOutlineHeart className="w-10 h-10 mx-auto text-stone-300 mb-6" />
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              Customer First Promise
            </h2>
            <p className="text-stone-300 text-base md:text-lg max-w-2xl mx-auto font-light mb-10">
              At The Vogue Wardrobe, our goal isn't just to sell clothing. We want every customer to experience:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
              {promises.map((promise, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <HiSparkles className="text-stone-400 w-5 h-5" />
                  <span className="font-medium tracking-wide text-sm md:text-base">
                    {promise}
                  </span>
                </div>
              ))}
            </div>

            <div className="w-24 h-px bg-stone-700 mx-auto mb-8"></div>
            
            <p className="text-xl md:text-2xl font-serif italic text-stone-200">
              "Because great fashion should feel as good as it looks."
            </p>
          </div>
        </div>
      </div>

    </main>
  );
};

export default ShippingPolicy;