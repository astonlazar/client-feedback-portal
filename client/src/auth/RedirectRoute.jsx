import React from 'react'
import { Navigate } from 'react-router'

const RedirectRoute = ({children}) => {
  const token = localStorage.getItem('token') || null
  const role = localStorage.getItem('role')

  if(token) {
    if(role === 'user') {
      return (
        <Navigate to='/' replace />
      )
    } else if(role === 'admin') {
      return (
        <Navigate to='/admin' replace />
      )
    }
  }

  return children
}

export default RedirectRoute