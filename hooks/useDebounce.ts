import { useState, useEffect } from 'react'

export default function useDebounce<T>(value: T, wait = 500) {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebounceValue(value), wait)

    return () => window.clearTimeout(timeoutId)
  }, [value])

  return debounceValue
}
