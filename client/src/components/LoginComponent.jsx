import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const LoginComponent = ({page}) => {
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [userExistsError, setUserExistsError] = useState('')
  const API_URL = import.meta.env.VITE_API_URL
  const navigate = useNavigate()

  function handleFullname(e) {
    setFullname(e.target.value)
  }

  function handleUsername(e) {
    setUsername(e.target.value)
    if(e.target.value.length === 0)
      setUsernameError('')
    else if(e.target.value.length <= 4)
      setUsernameError('Username should have more that 4 characters.')
    else
      setUsernameError('')
  }

  function handlePassword(e) {
    setPassword(e.target.value)
    setPasswordError(validatePassword(e.target.value))
  }

  const validatePassword = (password) => {
    let error = '';
    if(password.length == 0) {
      error = ''
    } else if (password.length < 8) {
      error = 'Password must be at least 8 characters long.';
    } else if (!/[a-z]/.test(password)) {
      error = 'Password must contain at least one lowercase letter.';
    } else if (!/[A-Z]/.test(password)) {
      error = 'Password must contain at least one uppercase letter.';
    } else if (!/[0-9]/.test(password)) {
      error = 'Password must contain at least one number.';
    } else if (!/[^a-zA-Z0-9\s]/.test(password)) {
      error = 'Password must contain at least one special character.';
    }
    return error;
  };

  function handleConfirmPassword(e) {
    setConfirmPassword(e.target.value)
    if(page === 'Signup' && e.target.value !== password) {
      setConfirmPasswordError('Password does not match!')
    } else {
      setConfirmPasswordError('')
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if(page === 'Signup') {
      if(usernameError || passwordError || confirmPasswordError) {
        console.log('Error annu signup aavoola')
        return
      }
      console.log(fullname, username, password)
      axios.post(`${API_URL}/api/signup`, {fullname, username, password}, {
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => {
        let data = response.data
        let token = data.token
        let role = data.role
        localStorage.setItem('token', token)
        localStorage.setItem('role', role)
        navigate('/', {replace: true})
      })
      .catch(err => {
        console.log(err)
        if(err.response.status === 500) {
          setUserExistsError(err.response.data.message)
        }
      })
    } else if(page === 'Login') {
      if(usernameError || passwordError) {
        console.log('Error annu login aavoola')
        return
      }
      console.log(fullname, username, password)
      axios.post(`${API_URL}/api/login`, {username, password}, {
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => {
        let data = response.data
        let token = data.token
        let role = data.role
        localStorage.setItem('token', token)
        localStorage.setItem('role', role)
        if(role === 'admin')
          navigate('/admin', {replace: true})
        if(role === 'user')
          navigate('/', {replace: true})
      })
      .catch(err => {
        console.log(err)
        if(err.response.status === 500) {
          setUserExistsError(err.response.data.message)
        } else if(err.response.status === 501) {
          setUserExistsError(err.response.data.message)
        }
      })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <h4 className="text-2xl font-semibold mb-4 flex justify-center">{page}</h4>
        <form onSubmit={handleSubmit} className="container space-y-3 w-full sm:w-64 md:w-72 lg:w-72 xl:w-72">
          {page === 'Signup' && (
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={fullname}
              onChange={handleFullname}
            />
          )}
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            value={username}
            onChange={handleUsername}
          />
          {
            usernameError && (
              <p className='text-red-600 text-sm font-medium'>{usernameError}</p>
            )
          }
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={handlePassword}
          />
          {
            passwordError && (
              <p className='text-red-600 text-sm font-medium'>{passwordError}</p>
            )
          }
          {page === 'Signup' && (
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              onChange={handleConfirmPassword}
            />
          )}
          {
            confirmPassword && (
              <p className='text-red-600 text-sm font-medium'>{confirmPasswordError}</p>
            )
          }
          {
            userExistsError && (
              <p className='text-red-600 text-sm font-medium'>{userExistsError}</p>
            )
          }
          <button 
            type='submit' 
            className='w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
            onClick={handleSubmit}
          >{page}</button>
        </form>
      </div>
    </div>
  )
}

export default LoginComponent