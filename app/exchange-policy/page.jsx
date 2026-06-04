import React from 'react';
import { 
  HiOutlineCalendar, 
  HiOutlineClipboardCheck, 
  HiOutlineArrowsExpand, 
  HiOutlineSwitchHorizontal,
  HiOutlineSparkles
} from 'react-icons/hi';

const ExchangePolicy = () => {
  const policies = [
    {
      title: "Exchange Window",
      icon: <HiOutlineCalendar className="w-6 h-6" />,
      content: (
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          Products can be exchanged within <strong>7 days</strong> from the date of delivery.
        </p>
      )
    },
    {
      title: "Exchange Eligibility",
      icon: <HiOutlineClipboardCheck className="w-6 h-6" />,
      content: (
        <div className="space-y-2">
          <p className="text-gray-600 text-sm md:text-base">Products must be:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-gray-600 text-sm md:text-base">
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-indigo-300 rounded-full"></span> Unused</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-indigo-300 rounded-full"></span> Unwashed</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-indigo-300 rounded-full"></span> In original condition</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-indigo-300 rounded-full"></span> Original tags attached</li>
          </ul>
        </div>
      )
    },
    {
      title: "Size Exchange",
      icon: <HiOutlineArrowsExpand className="w-6 h-6" />,
      content: (
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          If the size doesn't fit perfectly, you can request an exchange within 7 days. We want every customer to experience the comfort and premium fit that The Vogue Wardrobe is known for.
        </p>
      )
    },
    {
      title: "Product Exchange",
      icon: <HiOutlineSwitchHorizontal className="w-6 h-6" />,
      content: (
        <ul className="space-y-2 text-gray-600 text-sm md:text-base">
          <li>• You may exchange your product for another available size or product of <strong>equal value</strong>.</li>
          <li>• If the new product is <strong>higher in value</strong>, the price difference must be paid.</li>
          <li>• If the new product is <strong>lower in value</strong>, the remaining amount will be provided as store credit.</li>
        </ul>
      )
    }
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] py-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-stone-200">
      
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-3">
          Last Updated: June 2026
        </p>
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
          Exchange Policy
        </h1>
        <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
          We understand that sometimes a different size or product may be needed. That's why we offer a simple and <span className="font-medium text-gray-900">hassle-free exchange policy</span>.
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

      {/* The Vogue Wardrobe Promise Section */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 text-white rounded-2xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <HiOutlineSparkles className="w-10 h-10 text-stone-300 mb-6" />
            <h2 className="text-2xl md:text-3xl font-serif mb-4">
              The Perfect Fit Guarantee
            </h2>
            <p className="text-stone-300 text-base md:text-lg max-w-2xl mx-auto font-light mb-8">
              Fashion should empower you, and that starts with the right fit. Our streamlined exchange process ensures that you never have to settle for anything less than perfection.
            </p>

            <div className="w-24 h-px bg-stone-700 mx-auto mb-8"></div>
            
            <p className="text-sm text-stone-400 uppercase tracking-widest">
              The Vogue Wardrobe
            </p>
          </div>
        </div>
      </div>

    </main>
  );
};

export default ExchangePolicy;