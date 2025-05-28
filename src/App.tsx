import { useState } from 'react'
import './App.css'
import { Scene } from './threejs/components/Scene'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>React + ThreeJS Demo</h1>
      <Scene width={800} height={600} />
    </>
  )
}

export default App
