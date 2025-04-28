import React from 'react'
import LoginComponent from '../components/LoginComponent'
import { Link } from 'react-router'

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center  min-h-[calc(100vh-theme(spacing[20]))]">
      <LoginComponent page="Login" />
      <p className="mt-4">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  )
}

export default Login