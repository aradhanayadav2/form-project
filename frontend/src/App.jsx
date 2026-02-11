
import React from 'react'
import { Routes,Route } from 'react-router-dom'

import Dashboard from './components/Dashboard'


import { Login } from './components/Login'
import { Registers } from './components/Registers'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Registers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </div>
  )
}

export default App
