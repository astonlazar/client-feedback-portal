import React from 'react'
import LoginComponent from '../components/LoginComponent'
import { Link } from 'react-router'

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing[20]))]">
      <LoginComponent page="Signup" />
      <p className="mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup