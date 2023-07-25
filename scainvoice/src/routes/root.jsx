import React from 'react'
import Login from '../components/authentification/Login'
import Dashboard from '../pages/dashboard/Dashboard'
import Register from '../components/authentification/Register'
import { Outlet } from 'react-router-dom'
const root = () => {
    
  return (
   <>
   <Dashboard/>
  
   </>
  )
}

export default root