import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function NavBar() {
  const linkBase = 'link px-2 py-1';
  return (
    <div className="flex items-center justify-between mb-4">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl">✝️</span>
        <strong>Daily Truth</strong>
      </Link>
      <nav className="flex gap-4">
        <NavLink to="/" className={({isActive}) => `${linkBase} ${isActive? 'underline':''}`}>Home</NavLink>
        <NavLink to="/daily" className={({isActive}) => `${linkBase} ${isActive? 'underline':''}`}>Daily</NavLink>
        <NavLink to="/favourites" className={({isActive}) => `${linkBase} ${isActive? 'underline':''}`}>Favourites</NavLink>
        <NavLink to="/submit" className={({isActive}) => `${linkBase} ${isActive? 'underline':''}`}>Submit</NavLink>
      </nav>
    </div>
  )
}