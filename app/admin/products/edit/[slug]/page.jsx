import React from 'react'
import EditPRoductCompo from './EditPRoductCompo'

const page = async({params}) => {
const {slug} = await params
    

  return (
    <div>

      <EditPRoductCompo  slug={slug}/>
      
    </div>
  )
}

export default page
