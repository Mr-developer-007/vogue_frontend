"use client"
import React, { useEffect, useState } from 'react'
import AddressCompo from '../components/AddressCompo'
import CartCompo from '../components/CartCompo'
import axios from 'axios'
import { base_url } from '../components/urls'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const page = () => {

const [checkoutData,setCheckoutData]= useState({
  address:"",
  itemsPrice:0,
  discountPrice:0,
  totalPrice:0,
  orderItems:[],
})
const router = useRouter()


const [handelSpin,setHandelSpin]=useState(false)

const [allreadyspin,setAllreadyspin]=useState(true)

const handelSpinWhile=()=>{
setHandelSpin(true);
const num = Math.floor( Math.random() *20);
const totalPrice = Math.round(checkoutData.totalPrice - (checkoutData.totalPrice *num)/100)
const discount = Math.round(checkoutData.totalPrice *num/100)
setInterval(() => {
  setCheckoutData(prev=>({...prev,discountPrice:discount}))
setHandelSpin(false);
setAllreadyspin(true)
const todayDate= new Date(Date.now()).getDate()
// localStorage.setItem("spin",todayDate)
}, 1000);
}



useEffect(()=>{
const alreadyspinToday = localStorage.getItem("spin")
if(alreadyspinToday){
const todayDate= new Date(Date.now()).getDate()
if(todayDate !=alreadyspinToday){
  setAllreadyspin(false)
}

}
else{
    setAllreadyspin(false)

}


},[ ])




const handelCheckout=async()=>{
  try {
    if(!checkoutData.address){
toast.error("Address not found")
return
    }
    const lastData= {...checkoutData,totalPrice: checkoutData.totalPrice - checkoutData.discountPrice}
    const response = await axios.post(`${base_url}/order/create`,lastData)
    const data = await response.data;
  
     const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: data.order.amount,
    currency: "INR",
    name: "Your Store",
    order_id: data.order.id,

    handler: async function (response) {
      const verifyresponse =  await axios.post(`${base_url}/order/verify-payment`, {
        ...response,
        orderId: data.createProductOrder._id,
      });

      const verifyData = await verifyresponse.data;
      console.log(verifyData)
      if(data.success){
        await axios.delete(`${base_url}/cart/delete`)
router.push("/");
      }
      // 
    },
  };
    const razor = new (window).Razorpay(options);
  razor.open();
  } catch (error) {
    
  }
}



  return (
    <div className='flex flex-col  md:flex-row container mx-auto gap-4 p-4 md:p-5 relative'>

      <AddressCompo  setCheckoutData={setCheckoutData}   />
      <CartCompo  setCheckoutData={setCheckoutData} checkoutData={checkoutData}  handelAddDiscount={(amount)=>setCheckoutData(prev=>({...prev,discountPrice:amount}))} handelCheckout={handelCheckout}/>
      {/* {!allreadyspin && 
<div className='absolute bottom-8  right-2 md:right-0'>
   
        <img src="/roulette.png" alt="" onClick={()=>handelSpinWhile()} className={`  h-14 md:h-20   ${handelSpin?"animate-spin":""}`} />

      </div>
} */}
    </div>
  )
}

export default page
