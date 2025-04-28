import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router'

const ProtectedRoute = ({allowedRoles}) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  // useEffect(() => {
  //   axios.post('http://localhost:3333/api/check-token')

  // }, [])
  
  if(!token) {
    return (
      <Navigate to='/login' replace />
    )
  }

  if(allowedRoles && allowedRoles !== role) {
    return (
      <Navigate to='/unauthorized' replace />
    )
  }
  return <Outlet />
}

export default ProtectedRoute