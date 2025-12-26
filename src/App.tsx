import { Suspense } from 'react'
import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>
      <nav style={{ display: 'flex', gap: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <hr />
      <Suspense fallback={<p>Loading page...</p>}>
        <Outlet />
      </Suspense>
    </>
  )
}

export default App
