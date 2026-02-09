
import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/" element={<Dashboard/>} />
      </Routes>
    </div>
  )
}

export default App
