import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(100)

  return (
    <>
      <h1>Tarra</h1>
      <div>
        <p>tarraとはフィンランド語でシールという意味です</p>
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
