import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div>
      <h1 className="text-3xl font-serif text-center my-4">Start Your Day with God's Word</h1>
      <div className="card">
        <p className="text-lg">Welcome to Daily Light, a simple place to receive short, Scripture-based affirmations to encourage your walk with Christ.</p>
        <div className="flex gap-2 flex-wrap mt-3">
          <button className="btn btn-primary" onClick={() => navigate('/daily')}>Get Today's Affirmation</button>
          <Link to="/submit" className="btn btn-outline">Share an Affirmation</Link>
        </div>
      </div>
    </div>
  )
}
