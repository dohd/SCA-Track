import React from 'react'

import { Outlet } from 'react-router-dom'
import AdminDashboard from '../pages/admindashboard/AdminDash'
const root = () => {
    
  return (
   <>
   <AdminDashboard/>
   
  <Outlet/>
   </>
  )
}

export default root