import React from 'react'
import { useNavigate } from 'react-router'

const Navbar = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login', {replace: true})
  }

  return (
    <nav className='bg-blue-950 h-16 px-7 flex items-center justify-between'>
      <div className='text-white font-bold font-mono'>
        Client Feedback Portal
      </div>
      {token && (
        <button onClick={handleLogout} className='text-white bg-gray-700 p-1 rounded-md'>Logout</button>
      )}
    </nav>
  )
}

export default Navbar