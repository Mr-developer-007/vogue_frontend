import React from 'react'
import ProductComp from './ProductComp'

const page = async ({params}) => {
  const {slug} = await params
  return (
    <ProductComp slug={slug} />
  )
}

export default page
