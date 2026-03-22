import React from 'react'
import OrderCompo from './OrderCompo'

const page = async({params}) => {
    const {slug}= await params


    
  return (
    <div>
     <OrderCompo slug={slug} />
    </div>
  )
}

export default page
