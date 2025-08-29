import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Submit() {
  const [text, setText] = useState('')
  const [ref, setRef] = useState('')
  const [message, setMessage] = useState('')

  const handle = (e) => {
    e.preventDefault()
    if (!text.trim()) {
      setMessage('Please enter an affirmation.')
      return
    }
    const v = { text: text.trim(), reference: ref.trim() || 'Submitted' }
    const current = JSON.parse(localStorage.getItem('favourites') || '[]')
    current.unshift(v)
    localStorage.setItem('favourites', JSON.stringify(current))
    setMessage('Thank you! Your affirmation has been saved to Favourites.')
    setText('')
    setRef('')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div>
      <h2 className="text-3xl font-serif text-center my-4">Submit a verse that you love.</h2>
      <form onSubmit={handle} className="card">
        <label className="block mb-2 font-semibold">Affirmation</label>
        <textarea className="w-full border rounded-lg p-2" rows={4} value={text} onChange={(e) => setText(e.target.value)} />

        <label className="block my-2 font-semibold">Reference (optional)</label>
        <input className="w-full border rounded-lg p-2" value={ref} onChange={(e) => setRef(e.target.value)} />

        <div className="flex gap-2 mt-3">
          <button className="btn btn-primary" type="submit">Submit</button>
          <Link to="/daily" className="btn btn-outline">See Daily</Link>
        </div>
        {message && <div className="mt-3 text-green-700">{message}</div>}
      </form>
    </div>
  )
}