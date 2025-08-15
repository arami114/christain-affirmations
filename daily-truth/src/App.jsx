import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/home'
import Daily from './pages/Daily'
import Favourites from './pages/Favourites'
import Submit from './pages/Submit'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="container-card w-full">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/daily" element={<Daily />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/submit" element={<Submit />} />
        </Routes>
        <div className="text-center text-sm text-gray-600 mt-4">
          Built with ❤️ using React — Oyinlade Aramide
        </div>
      </div>
    </div>
  )
}
