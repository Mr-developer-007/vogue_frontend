"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ProductCompo = ({slug}) => {



const fetchCollection= async()=>{
    try {
        const res= await axios.get(`${base_url}/collection/product/${slug}`)
        const data = await res.data;
    
         console.log(data)


    } catch (error) {
        
    }
}


    useEffect(()=>{
fetchCollection()
    },[])

  return (
    <div>
      {slug}
    </div>
  )
}

export default ProductCompo
