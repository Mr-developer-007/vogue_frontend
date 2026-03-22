import React, { Suspense } from 'react'
import FilterCompo from './FilterCompo'
import OurProducts from '../components/OurProducts'
import ProductCompo from './ProductCompo'

const page = () => {





  return (
    <div className='flex gap-5 '>
        <Suspense fallback={null} >
        <FilterCompo />
    </Suspense>
        
        <div className='w-full min-h-screen'>
      <Suspense fallback={null}>
        <ProductCompo />
      </Suspense>




        </div>
        
        </div>
  )
}

export default page