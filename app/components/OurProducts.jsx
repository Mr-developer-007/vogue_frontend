"use client"
import React, { useEffect, useState } from 'react';
import TagLineCompo from './TagLineCompo';
import { HiOutlineEye, HiArrowRight } from "react-icons/hi";
import axios from 'axios';
import { base_url } from './urls';
import ProductCart from './ProductCart';

const OurProducts = () => {
  const [activeTab, setActiveTab] = useState("isNewArrival");
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async (params) => {
    try {
      setLoading(true);
      const response = await axios.get(`${base_url}/products/get/${params}`);
      const data = await response.data;
      if (data.success) {
        setProduct(data.data);
      } else {
        setProduct([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProduct([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct(activeTab);
  }, [activeTab]);

  if (loading) {
    return (
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            {/* Funky Black & White Loader */}
            <div className="animate-spin h-12 w-12 border-4 border-black border-t-transparent border-b-transparent border-dashed"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-white">
      {/* Header Section */}
      <TagLineCompo 
        tag="Explore Us"
        heading="Our Featured Products"
      />
      
      <div className="container mx-auto px-4 mt-8">
        {/* Funky Tabs */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {[{key:"isNewArrival",val:"New Arrival"}, {key:"isBestSeller",val:"Best Seller"}, {key:"isFeatured",val:"Featured"}].map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(tab.key)}
              className={`
                px-6 py-3 font-mono text-sm md:text-base font-bold uppercase tracking-widest transition-all duration-200 border-2 border-black
                ${activeTab === tab.key
                  ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1 -translate-x-1" 
                  : "bg-white text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1"
                }
              `}
            >
              {tab.val}
            </button>
          ))}
        </div>

        {/* Products Grid - Card View */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => <ProductCart key={index} product={product} />)}
            </div>

            {/* View All Link */}
            <div className="mt-16 text-center">
              <a 
                href="/products" 
                className="inline-flex items-center gap-3 bg-white text-black font-mono font-bold uppercase tracking-wider px-8 py-4 border-2 border-black hover:bg-black hover:text-white transition-all duration-300 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]"
              >
                View All Products <HiArrowRight size={20} />
              </a>
            </div>
          </>
        ) : (
          // Funky Empty State
          <div className="text-center py-16 border-4 border-black border-dashed max-w-2xl mx-auto bg-gray-50 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="mx-auto w-24 h-24 border-2 border-black bg-white flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-3">
              <HiOutlineEye size={40} className="text-black" />
            </div>
            <h3 className="text-2xl font-black font-mono uppercase tracking-widest text-black mb-4">Nothing Here!</h3>
            <p className="text-black font-mono mb-8 max-w-md mx-auto text-sm leading-relaxed">
              We couldn't find any products for this category. Try poking around somewhere else!
            </p>
            <button 
              onClick={() => setActiveTab("isNewArrival")}
              className="px-8 py-3 bg-black text-white font-mono font-bold uppercase tracking-widest border-2 border-black hover:bg-white hover:text-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Back to New Arrivals
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OurProducts;

// "use client"
// import React, { useEffect, useState } from 'react';
// import TagLineCompo from './TagLineCompo';
// import { HiStar, HiOutlineHeart, HiOutlineEye, HiShoppingBag, HiArrowRight } from "react-icons/hi";
// import axios from 'axios';
// import { base_url, img_url } from './urls';
// import Link from 'next/link';
// import ProductCart from './ProductCart';

// const OurProducts = () => {
//   const [activeTab, setActiveTab] = useState("isNewArrival");
//   const [products, setProduct] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchProduct = async (params) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${base_url}/products/get/${params}`);
//       const data = await response.data;
//       if (data.success) {
//         setProduct(data.data);
//       } else {
//         setProduct([]);
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setProduct([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProduct(activeTab);
//   }, [activeTab]);



//   if (loading) {
//     return (
//       <div className="py-20 bg-stone-50">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="py-20 bg-stone-50">
//       {/* Header Section */}
//       <TagLineCompo 
//         tag="Explore Us"
//         heading="Our Featured Products"
//       />
      
//       <div className="container mx-auto px-4">
//         {/* Tabs */}
//         <div className="flex flex-wrap gap-4 mb-10 ">
//           {[{key:"isNewArrival",val:"New Arrival"}, {key:"isBestSeller",val:"Best Seller"}, {key:"isFeatured",val:"Featured"}].map((tab,index) => (
//             <button
//             key={index}
//               onClick={() => setActiveTab(tab.key)}
//               className={`
//                px-4 md:px-8 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 border
//                 ${activeTab === tab.key
//                   ? "bg-stone-900 text-white border-rose-600 shadow-lg transform scale-105" 
//                   : "bg-white text-stone-500 border-stone-200 hover:border-stone-400 hover:text-stone-800"
//                 }
//               `}
//             >
//               {tab.val}
//             </button>
//           ))}
//         </div>

//         {/* Products Grid - Card View */}
//         {products.length > 0 ? (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//               {products.map((product,index) => <ProductCart key={index}  product={product}/>)}
//             </div>

//             {/* View All Link */}
//             <div className="mt-12 text-center">
//               <a 
//                 href="/products" 
//                 className="inline-flex items-center gap-2 text-stone-900 font-semibold hover:text-rose-700 hover:gap-3 transition-all duration-300 px-6 py-3 rounded-lg border border-stone-200 hover:border-rose-600 hover:bg-rose-50"
//               >
//                 View All Products <HiArrowRight />
//               </a>
//             </div>
//           </>
//         ) : (
//           // Empty State
//           <div className="text-center py-16">
//             <div className="mx-auto w-24 h-24 rounded-full bg-stone-100 flex items-center justify-center mb-6">
//               <HiOutlineEye size={40} className="text-stone-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-stone-700 mb-2">No Products Found</h3>
//             <p className="text-stone-500 mb-8 max-w-md mx-auto">
//               We couldn't find any products for the selected category. Try selecting a different category or check back later.
//             </p>
//             <button 
//               onClick={() => setActiveTab("isNewArrival")}
//               className="px-6 py-3 bg-stone-900 text-white font-medium rounded-lg hover:bg-stone-800 transition-colors"
//             >
//               View New Arrivals
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OurProducts;

// make black and white and funcky cool font