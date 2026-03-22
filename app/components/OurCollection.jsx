'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TagLineCompo from './TagLineCompo';
import { HiArrowRight, HiChevronDown } from "react-icons/hi";
import axios from 'axios';
import { base_url, img_url } from './urls';

/* ===========================
   COLLECTION DATA (Scalable)
=========================== */
// const COLLECTIONS = [
//   {
//     id: 1,
//     region: "The Punjabi Edit",
//     specialty: "Phulkari & Patiala Suits",
//     image: "https://cdn.shopify.com/s/files/1/0341/4805/7228/files/img5_5_04b2b77f-9c8a-494b-b3c2-0d5d8a865006.webp?v=1714718734",
//     link: "/collections/punjab",
//     accent: "bg-amber-600",
//   },
//   {
//     id: 2,
//     region: "Royal Rajasthan",
//     specialty: "Bandhani & Leheriya",
//     image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1887&auto=format&fit=crop",
//     link: "/collections/rajasthan",
//     accent: "bg-rose-700",
//   },
//   {
//     id: 3,
//     region: "Kashmiri Heritage",
//     specialty: "Pashmina & Tilla Work",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcSA6eB2vh6FR2whLj8UqO_Fh3YcTmxuc4MQ&s",
//     link: "/collections/kashmir",
//     accent: "bg-emerald-800",
//   },
//   {
//     id: 4,
//     region: "Himachali Weaves",
//     specialty: "Kullu Shawls & Woolens",
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh1jZ3oPwTewTQeCV_VAPgQ-p1CdKHgbNRkQ&s",
//     link: "/collections/himachal",
//     accent: "bg-stone-600",
//   },
// ];


// const INITIAL_LOAD = 4;
// const LOAD_STEP = 4;

const OurCollection = () => {
  // const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);
  const [allCollection,setAllCollection]=useState([ ])
  // const handleLoadMore = () => {
  //   setVisibleCount((prev) => prev + LOAD_STEP);
  // };

  // const hasMore = visibleCount < COLLECTIONS.length;


const fetchCollection= async()=>{
  try {
    const response = await axios.get(`${base_url}/collection/getcollection`)
    const data = await response.data;
    if(data.success){
setAllCollection(data.data)
    }
    else{
         setAllCollection([ ])
 
    }
  } catch (error) {
    setAllCollection([ ])
  }
}

useEffect(()=>{
  fetchCollection()
},[])

  return (
    <section className="py-20 bg-stone-50">
      
      <TagLineCompo 
        tag="Explore India"
        heading="Regional Treasures"
      />

      <div className="container mx-auto px-4 ">

        {/* ================= Grid ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          { allCollection.length >0 && allCollection.map((item, index) => {
         
            return(
<Link
              key={item._id}
              href={`item.slug`}
              className="group block"
            >
              <div className="relative h-[480px] rounded-t-[90px] rounded-b-2xl overflow-hidden bg-white border border-stone-200 shadow-md hover:shadow-xl transition-shadow duration-500">

                {/* Image */}
                <img
                  src={`${img_url}/${item.image}`}
                  alt={item.title}
             
                  className= "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                 
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity group-hover:opacity-90"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">

                  <span className={`block w-14 h-1 mx-auto mb-4 rounded-full `}  style={{ backgroundColor: item.color }} />

                  <h3 className="text-2xl font-serif text-white tracking-wide mb-1">
                    {item.title}
                  </h3>

                  <p className="text-stone-300 text-xs tracking-widest uppercase mb-6">
                    {item.des}
                  </p>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="inline-flex items-center gap-2 px-6 py-2 text-sm rounded-full border border-white/40 bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-stone-900 transition-colors">
                      View Collection <HiArrowRight />
                    </span>
                  </div>

                </div>
              </div>
            </Link>
          )}
            
          )}
        </div>

        {/* ================= Load More ================= */}
        {/* {hasMore && (
          <div className="mt-16 text-center">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 px-10 py-3 rounded-full bg-stone-900 text-white text-sm tracking-wide hover:bg-stone-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
            >
              Load More Regions <HiChevronDown />
            </button>
          </div>
        )} */}

      </div>
    </section>
  );
};

export default OurCollection;
