"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import Sidebar from './Componentsadmin/Slidebar'
import axios from 'axios'
axios.defaults.withCredentials = true
const layout = ({ children }) => {
  const pathname = usePathname()

  return (
   <html lang="en">
      <body

      >
<div  className='flex'>

<div>

        {pathname.includes("/login") ? "" :
<Sidebar /> }
</div>
<div className='w-full'>

        {children}
</div>
</div>
   
      </body>
    </html>
  )
}

export default layout