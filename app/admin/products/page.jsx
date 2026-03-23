import React, { Suspense } from 'react'
import ADminCompo from './ADminCompo'

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ADminCompo />
      </Suspense>
    </div>
  )
}

export default page
