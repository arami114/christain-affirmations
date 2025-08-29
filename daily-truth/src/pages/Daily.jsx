import React, { useEffect, useState } from 'react'
import VerseCard from '../components/versecard'

// Helper to get YYYY-MM-DD
function todayKey() {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth()+1).padStart(2,'0')
  const dd = String(d.getDate()).padStart(2,'0')
  return `${yyyy}-${mm}-${dd}`
}

// Small KJV fallback set to guarantee UI even if network fails
const KJV_FALLBACK = [
  { text: 'I can do all things through Christ which strengtheneth me.', reference: 'Philippians 4:13 (KJV)' },
  { text: 'The LORD is my shepherd; I shall not want.', reference: 'Psalm 23:1 (KJV)' },
  { text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding.', reference: 'Proverbs 3:5 (KJV)' },
  { text: 'For God so loved the world, that he gave his only begotten Son...', reference: 'John 3:16 (KJV)' },
]

export default function Daily() {
  const [verse, setVerse] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const key = `daily_kjv_${todayKey()}`
    const cached = localStorage.getItem(key)
    if (cached) {
      setVerse(JSON.parse(cached))
      setLoading(false)
      return
    }

    // Attempt to fetch a random KJV verse.
    fetch('https://bible-api.com/data/kjv/random')
      .then((r) => r.json())
      .then((data) => {
        // Build a displayable reference safely
        const ref = `${data.book_name ?? data.book_id ?? 'Verse'} ${data.chapter ?? ''}${data.verse ? ':'+data.verse : ''}`.trim()
        const v = { text: (data.text || '').trim(), reference: ref }
        if (!v.text) throw new Error('Empty verse text')
        setVerse(v)
        localStorage.setItem(key, JSON.stringify(v))
      })
      .catch(() => {
        const v = KJV_FALLBACK[Math.floor(Math.random()*KJV_FALLBACK.length)]
        setVerse(v)
        localStorage.setItem(key, JSON.stringify(v))
      })
      .finally(() => setLoading(false))
  }, [])

  const handleAnother = () => {
    setLoading(true)
    fetch('https://bible-api.com/data/kjv/random')
      .then((r) => r.json())
      .then((data) => {
        const ref = `${data.book_name ?? data.book_id ?? 'Verse'} ${data.chapter ?? ''}${data.verse ? ':'+data.verse : ''}`.trim()
        const v = { text: (data.text || '').trim(), reference: ref }
        if (!v.text) throw new Error('Empty verse text')
        setVerse(v)
        localStorage.setItem(`daily_kjv_${todayKey()}`, JSON.stringify(v))
      })
      .catch(() => {
        const v = KJV_FALLBACK[Math.floor(Math.random()*KJV_FALLBACK.length)]
        setVerse(v)
        localStorage.setItem(`daily_kjv_${todayKey()}`, JSON.stringify(v))
      })
      .finally(() => setLoading(false))
  }

  const handleSave = () => {
    if (!verse) return
    const current = JSON.parse(localStorage.getItem('favourites') || '[]')
    if (!current.some((x) => x.text === verse.text)) {
      current.unshift(verse)
      localStorage.setItem('favourites', JSON.stringify(current))
    }
    alert('Saved to Favourites')
  }

  return (
    <div>
      <h2 className="text-3xl font-serif text-center my-4">Daily Affirmation (KJV)</h2>
      <VerseCard verse={verse} loading={loading} onNext={handleAnother} onSave={handleSave} />
    </div>
  )
}
