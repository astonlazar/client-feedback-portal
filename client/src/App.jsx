import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router'
import Login from './pages/LoginPage'
import Signup from './pages/SignupPage'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import ProtectedRoute from './auth/ProtectedRoute'
import RedirectRoute from './auth/RedirectRoute'


function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='*' element={<div>404 - Not Found</div>}  />
        <Route path='/login' element={<RedirectRoute><Login /></RedirectRoute>} />
        <Route path='/signup' element={<RedirectRoute><Signup /></RedirectRoute>} />
        <Route path='/*' element={<ProtectedRoute allowedRoles={'user'} />}>
          <Route index element={<HomePage />} />
        </Route>

        <Route path='/admin/*' element={<ProtectedRoute allowedRoles={'admin'} />}>
          <Route index element={<AdminPage />} />
        </Route>
        <Route path='/unauthorized' element={<div>Unauthorized</div>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
