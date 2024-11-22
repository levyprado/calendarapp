import { useEffect, useState } from 'react'

export default function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    let value
    try {
      value = JSON.parse(localStorage.getItem(key) || String(initialValue))
    } catch {
      value = initialValue
    }
    return value
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}
