import { useState } from 'react'
import { TESTIMONIALS } from './data'

const KEY = 'testimonials_data'

export function useTestimonials() {
  const [list, setList] = useState(() => {
    try {
      const saved = localStorage.getItem(KEY)
      return saved ? JSON.parse(saved) : TESTIMONIALS
    } catch {
      return TESTIMONIALS
    }
  })

  function save(updated) {
    localStorage.setItem(KEY, JSON.stringify(updated))
    setList(updated)
  }

  function reset() {
    localStorage.removeItem(KEY)
    setList(TESTIMONIALS)
  }

  return { list, save, reset }
}
