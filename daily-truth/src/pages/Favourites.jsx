import React, { useEffect, useState } from 'react'

export default function Favourites() {
  const [favourites, setFavourites] = useState([])

  useEffect(() => {
    try {
      const s = localStorage.getItem('favourites')
      setFavourites(s ? JSON.parse(s) : [])
    } catch {
      setFavourites([])
    }
  }, [])

  const remove = (index) => {
    const next = favourites.filter((_, i) => i !== index)
    setFavourites(next)
    localStorage.setItem('favourites', JSON.stringify(next))
  }

  return (
    <div>
      <h2 className="text-3xl font-serif text-center my-4">Favourites</h2>
      {favourites.length === 0 ? (
        <div className="card">You haven\'t saved any affirmations yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {favourites.map((v, i) => (
            <div key={i} className="bg-black p-4 rounded-lg border border-gray-100">
              <div className="font-semibold">{v.text}</div>
              <div className="text-sm text-gray-600">{v.reference}</div>
              <div className="mt-2">
                <button className="btn btn-outline" onClick={() => remove(i)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
