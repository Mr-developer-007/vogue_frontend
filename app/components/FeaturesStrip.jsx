"use client"
import React from 'react';
import { BiSolidTShirt } from 'react-icons/bi';
import { 
  HiOutlineSparkles, 
  HiOutlineShieldCheck, 
  HiOutlineArrowsExpand, 
  HiOutlineCloud,
  HiOutlineBriefcase,
  HiOutlineSun,
  HiOutlineInformationCircle
} from 'react-icons/hi';
import TagLineCompo from './TagLineCompo';

const FeaturesStrip = () => {
  const features = [
    {
      id: 1,
      title: 'Premium 230 GSM Fabric',
      description: 'Crafted using a high-quality Cotton, Matty, and Lycra blend. Offers a perfect balance of durability and comfort with a rich, structured feel.',
      icon: <BiSolidTShirt size={26} />,
    },
    {
      id: 2,
      title: 'Exclusive Quality',
      description: 'This unique fabric blend is rare in the market, ensuring your garment stands out with a truly premium and distinguished touch.',
      icon: <HiOutlineSparkles size={26} />,
    },
    {
      id: 3,
      title: 'Bubble-Free Finish',
      description: 'Engineered to resist pilling—absolutely no bubble formation even after multiple washes, guaranteeing a lasting, clean look.',
      icon: <HiOutlineShieldCheck size={26} />,
    },
    {
      id: 4,
      title: 'Stretchable & Perfect Fit',
      description: 'The premium Lycra blend provides exceptional flexibility and ease of movement while maintaining its tailored shape over time.',
      icon: <HiOutlineArrowsExpand size={26} />,
    },
    {
      id: 5,
      title: 'All-Day Comfort',
      description: 'Experience a soft, breathable texture designed for maximum comfort, keeping you feeling fresh from morning to night.',
      icon: <HiOutlineCloud size={26} />,
    },
    {
      id: 6,
      title: 'Versatile Styling',
      description: 'Thoughtfully designed to seamlessly transition between casual weekend outings and semi-formal settings effortlessly.',
      icon: <HiOutlineBriefcase size={26} />,
    },
  ];

  return (
    <section className="bg-slate-50 py-16  font-sans">
      <div className="container mx-auto">
        
        {/* Header Section */}
        {/* <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-3">
            Vogue Wardrobe
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Elevate Your Everyday Wear
          </h2>
          <p className="text-lg text-slate-600">
            Discover the perfect intersection of luxury, comfort, and durability with our signature fabric blend.
          </p>
        </div> */}


 <TagLineCompo 
        tag="Elevate Your Everyday Wear" 
        heading="Discover the perfect intersection" 
      />


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Care Instructions Banner */}
        <div className="bg-slate-900 rounded-2xl p-8 md:p-10 shadow-xl overflow-hidden relative">
          {/* Decorative background element */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-slate-800 rounded-full opacity-50 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="flex items-center gap-4 text-amber-400">
              <HiOutlineInformationCircle size={32} className="shrink-0" />
              <div>
                <h4 className="text-xl font-bold text-white tracking-wide">
                  Garment Care Instructions
                </h4>
                <p className="text-slate-300 mt-1">
                  Keep your Vogue Wardrobe pieces looking pristine.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg py-3 px-5 text-slate-200">
                <HiOutlineSun size={20} className="text-rose-400" />
                <span className="text-sm font-medium">Do not dry in direct sunlight</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg py-3 px-5 text-slate-200">
                <HiOutlineCloud size={20} className="text-blue-400" />
                <span className="text-sm font-medium">Always prefer shade drying</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturesStrip;