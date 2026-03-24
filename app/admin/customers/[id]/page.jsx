import React from 'react'
import UserCompo from './UserCompo'

const page = async({params}) => {
    const {id} = await params
  return (
  <>
  <UserCompo id={id} />
  </>
  )
}

export default page
