import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login, Registry } from './pages'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="registry" element={<Registry />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
