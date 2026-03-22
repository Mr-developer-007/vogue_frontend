import React from 'react';
import { HiOutlineSparkles, HiOutlineTruck, HiOutlineShieldCheck, HiOutlineRefresh } from "react-icons/hi";

const FeaturesStrip = () => {
  // Updated copy specifically for a T-shirt brand
  const features = [
    {
      id: 1,
      Icon: HiOutlineSparkles,
      title: "Premium Fabric",
      desc: "100% super combed breathable cotton"
    },
    {
      id: 2,
      Icon: HiOutlineTruck,
      title: "Fast Delivery",
      desc: "Free shipping on orders over ₹999"
    },
    {
      id: 3,
      Icon: HiOutlineShieldCheck,
      title: "Quality Built",
      desc: "Fade-proof prints & preshrunk fit"
    },
    {
      id: 4,
      Icon: HiOutlineRefresh,
      title: "Easy Exchanges",
      desc: "15-day hassle-free return policy"
    }
  ];

  return (
    <section className="bg-white border-y border-gray-100 my-16 font-sans selection:bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="flex flex-col md:flex-row items-center gap-5 px-6 pt-8 sm:pt-0 text-center md:text-left group cursor-default"
            >
              {/* Icon Box */}
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-sm text-gray-900 group-hover:bg-black group-hover:text-white transition-all duration-300">
                <feature.Icon size={24} className="currentColor" />
              </div>
              
              {/* Text Content */}
              <div>
                <h4 className="font-medium text-gray-900 text-sm uppercase tracking-wide mb-1">
                  {feature.title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}

export default FeaturesStrip;