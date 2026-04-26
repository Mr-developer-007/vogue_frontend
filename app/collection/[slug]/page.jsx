import { base_url } from '@/app/components/urls'
import axios from 'axios'
import React from 'react'
import ProductCompo from './ProductCompo'

const page = async ({params}) => {
const {slug} = await params



  return (
    <div>
    <ProductCompo slug={slug} />
    </div>
  )
}

export default page
