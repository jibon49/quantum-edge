import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useToast from './hooks/useToast'

function App() {
  const [count, setCount] = useState(0)
  const toast = useToast()

  const testToasts = () => {
    toast.success("This is a success message!");
    setTimeout(() => toast.error("This is an error message!"), 1000);
    setTimeout(() => toast.info("This is an info message!"), 2000);
    setTimeout(() => toast.warning("This is a warning message!"), 3000);
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className='text-red-500 font-bold text-4xl'>Vite + React</h1>
      <div className="card">
        <button className='btn btn-soft btn-primary' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button className='btn btn-secondary ml-4' onClick={testToasts}>
          Test Toasts
        </button>
        
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
