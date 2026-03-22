"use client";
import { base_url, img_url } from "@/app/components/urls";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { 
  FiBox, 
  FiTag, 
  FiImage, 
  FiMapPin, 
  FiClock, 
  FiAlignLeft,
  FiCheckCircle,
  FiXCircle
} from "react-icons/fi";
import { MdOutlineColorLens } from "react-icons/md";
import { toast } from "react-toastify";

const CollectionCompo = ({ slug }) => {
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchval,setSearchval]=useState("")
  const [searchData,setSearchData]=useState([ ])

  const fetchCollection = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${base_url}/collection/getsinglecoll/${slug}`);
      const data = response.data;
      if (data.success) {
        setCollection(data.data);
      }
    } catch (error) {
      console.error("Error fetching collection:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchHandel = async(searchdata)=>{
try {
    const response = await axios.get(`${base_url}/products/search/?search=${searchdata}`)
    const data = await response.data;
    if(data.success){
        setSearchData(data.data)
    }
} catch (error) {
    setSearchData([ ])
}
  }



  useEffect(() => {
    if (slug) {
      fetchCollection();
    }
  }, [slug]);

  useEffect(()=>{
     if (searchval.length <= 2) return;

    const inverval = setTimeout(() => {
        searchHandel(searchval) 
    }, 600);
    
    return ()=>clearTimeout(inverval)
  },[searchval])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="text-center py-10 text-gray-500">
        <FiBox className="mx-auto h-12 w-12 text-gray-400 mb-3" />
        <p>Collection not found.</p>
      </div>
    );
  }


const handelAddtoProduct = async(id)=>{
  try {
    setLoading(true)
    const response = await axios.put(`${base_url}/collection/addProduct/${slug}`,{
      productid:id
    })
    const data = await response.data;
    if(data.success){
      toast.success(data.message)
      fetchCollection()
      setSearchval("")
    }
  } catch (error) {
    toast.error(error.response.data.message)
  }finally{
    setLoading(false)
  }
}

const handelremoveProduct = async(id)=>{
  try {
    setLoading(true)
    const response = await axios.put(`${base_url}/collection/removeProduct/${slug}`,{
      productid:id
    })
    const data = await response.data;
    if(data.success){
      toast.success(data.message)
      fetchCollection()
    
    }
  } catch (error) {
    toast.error(error.response.data.message)
  }finally{
    setLoading(false)
  }
}




  return (
    <div className=" mx-auto p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FiBox className="text-blue-600" />
            {collection.title}
          </h1>
          <p className="text-gray-500 mt-1 flex items-center gap-2">
            <FiTag /> /{collection.slug}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 ${
            collection.status 
              ? "bg-green-100 text-green-700 border border-green-200" 
              : "bg-red-100 text-red-700 border border-red-200"
          }`}>
            {collection.status ? <FiCheckCircle /> : <FiXCircle />}
            {collection.status ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

<div className="my-4 flex justify-center relative ">
  <input type="search" value={searchval} onChange={(e)=>setSearchval(e.target.value)} name="" id="" placeholder="Search Product " className="w-4/5 border border-dashed px-2 rounded-2xl focus:border-0" />
  
<div className="absolute top-full left-0 w-full flex justify-center">

 {searchval.length >2 && searchData.length > 0  &&    <div className="w-4/5 p-2 bg-white border border-gray-300 shadow">










 { searchData.map((item)=>{
    return(
        <div key={item._id} onClick={()=>handelAddtoProduct(item._id)}>
<p>{item.title}</p>


            </div>
    )
})
}
    </div>

}
</div>

</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Image Card */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm md:col-span-1">
          <div className="flex items-center gap-2 mb-3 text-gray-700 font-semibold border-b pb-2">
            <FiImage /> Cover Image
          </div>
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
            {collection.image ? (
              <img 
                src={`${img_url}/${collection.image}`} 
                alt={collection.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400?text=Image+Not+Found";
                }}
              />
            ) : (
              <FiImage className="text-4xl text-gray-300" />
            )}
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm md:col-span-2 space-y-6">
          {/* Description */}
          <div>
            <h3 className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <FiAlignLeft className="text-gray-500" /> Description
            </h3>
            <p className="text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
              {collection.des || "No description provided."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Theme Color */}
            <div>
              <h3 className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <MdOutlineColorLens className="text-gray-500" /> Theme Color
              </h3>
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div 
                  className="w-8 h-8 rounded-full border border-gray-300 shadow-inner"
                  style={{ backgroundColor: collection.color }}
                ></div>
                <span className="font-mono text-gray-600 text-sm uppercase">
                  {collection.color}
                </span>
              </div>
            </div>

            {/* States/Regions */}
            <div>
              <h3 className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <FiMapPin className="text-gray-500" /> Associated States
              </h3>
              <div className="flex flex-wrap gap-2">
                {collection.state && collection.state.length > 0 ? (
                  collection.state.map((st, index) => (
                    <span 
                      key={index} 
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm border border-blue-100"
                    >
                      {st}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">None specified</span>
                )}
              </div>
            </div>
          </div>

          {/* Meta Information */}
          <div className="border-t border-gray-100 pt-5 mt-5">
            <h3 className="text-gray-700 font-semibold mb-3">System Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex flex-col gap-1">
                <span className="text-gray-400 flex items-center gap-1"><FiBox /> Products Attached</span>
                <span className="font-medium text-gray-800">{collection.products?.length || 0} items</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-400 flex items-center gap-1"><FiClock /> Created On</span>
                <span className="font-medium text-gray-800">
                  {new Date(collection.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "long", year: "numeric"
                  })}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {collection.products?.length >0 && <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm md:col-span-2 space-y-6 my-5">

{collection.products.map((item,index)=>{
  return(
    <div className="flex  items-center justify-between ">
      <div className=" flex  items-center  gap-3">
      <img src={`${img_url}/${item.images[0]}`} alt="" className="h-20 w-20 rounded-full" />
<p className="text-xl">{item.title}</p>

</div>
<div onClick={()=>handelremoveProduct(item._id)} className="cursor-pointer">
  remove
</div>
      </div>
  )
})}

        </div>

      }
    </div>
  );
};

export default CollectionCompo;