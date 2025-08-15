import React from 'react'

export default function VerseCard({ verse, onNext, onSave, loading }) {
  if (loading) {
    return <div className="card text-center">Loading verse…</div>
  }
  if (!verse) {
    return <div className="card text-center">No verse available right now. Please try again.</div>
  }
  return (
    <div className="card">
      <div className="text-xl leading-relaxed italic">“{verse.text}”</div>
      <div className="text-sm text-gray-600 mt-1">{verse.reference}</div>
      <div className="flex flex-wrap gap-2 mt-3">
        {onNext && <button className="btn btn-outline" onClick={onNext}>Another Verse</button>}
        {onSave && <button className="btn btn-primary" onClick={onSave}>Save to Favourites</button>}
      </div>
    </div>
  )
}