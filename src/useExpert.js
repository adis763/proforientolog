import { useState, useEffect } from 'react'
import { EXPERT } from './data'

const KEY = 'expert_overrides'

export function useExpert() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(KEY)
      return saved ? { ...EXPERT, ...JSON.parse(saved) } : EXPERT
    } catch {
      return EXPERT
    }
  })

  function save(updates) {
    const merged = { ...data, ...updates }
    localStorage.setItem(KEY, JSON.stringify(updates))
    setData(merged)
  }

  function reset() {
    localStorage.removeItem(KEY)
    setData(EXPERT)
  }

  return { data, save, reset }
}

export function getExpertData() {
  try {
    const saved = localStorage.getItem(KEY)
    return saved ? { ...EXPERT, ...JSON.parse(saved) } : EXPERT
  } catch {
    return EXPERT
  }
}
