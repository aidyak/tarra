import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(100)
  const [hello, setHello] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch('/api/hello')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const text = await res.text()
        if (!cancelled) setHello(text)
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'unknown error')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <h1>Tarra</h1>
      <div>
        <p>tarraとはフィンランド語でシールという意味です</p>
      </div>
      <div>
        <h2>APIからのメッセージ</h2>
        {loading && <p>Loading...</p>}
        {!loading && error && <p style={{ color: 'crimson' }}>Error: {error}</p>}
        {!loading && !error && <p>{hello}</p>}
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count - 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
