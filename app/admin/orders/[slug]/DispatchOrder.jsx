
import { base_url } from '@/app/components/urls'
import axios from 'axios'
import React, { useState } from 'react'
import { FiCreditCard } from 'react-icons/fi'

const DispatchOrder = ({orderid}) => {
const [dispathcData,setDispatchData]=useState({
orderid,length:"",breadth:"",height:"",weight:""
})


const handelDispatch = async()=>{
    try {
        const response = await axios.post(`${base_url}/shipment/create`,dispathcData)
        const data = await response.data;
        console.log(data)
    } catch (error) {
        
    }
}

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FiCreditCard className="text-gray-500" /> Shipment details
              </h2>
            </div>
            <div className="p-6 text-sm text-gray-600 space-y-3">
             
             <input type="text" name="" id=""  placeholder='length' value={dispathcData.length} onChange={(e)=>setDispatchData(prev=>({...prev,length:e.target.value}))} />
            <input type="text" name="" id=""  placeholder='breadth' value={dispathcData.breadth} onChange={(e)=>setDispatchData(prev=>({...prev,breadth:e.target.value}))} />
            <input type="text" name="" id="" placeholder='height' value={dispathcData.height} onChange={(e)=>setDispatchData(prev=>({...prev,height:e.target.value}))} />
            <input type="text" name="" id="" placeholder='weight' value={dispathcData.weight} onChange={(e)=>setDispatchData(prev=>({...prev,weight:e.target.value}))} />

              <hr className="my-4 border-gray-200" />
              
           
<div className='text-center'>
<button onClick={()=>handelDispatch()} className=" cursor-pointer px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-full shadow-[0_4px_14px_0_rgba(147,51,234,0.39)] hover:shadow-[0_6px_20px_rgba(147,51,234,0.23)] hover:scale-[1.02] transition-all duration-200 ease-in-out active:scale-95">
  Ready for Dispatch
</button>
</div>
            </div>
          </div>
  )
}

export default DispatchOrder
