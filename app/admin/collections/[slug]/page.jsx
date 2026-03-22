import React from 'react'
import CollectionCompo from './CollectionCompo'

const page = async({params}) => {
    const {slug} = await params
  return (
    <div>
<CollectionCompo slug={slug} />
    </div>
  )
}

export default page
