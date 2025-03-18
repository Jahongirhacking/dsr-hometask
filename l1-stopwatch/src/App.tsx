import { Suspense } from 'react'
import './style.scss'
import StopwatchContainer from './components/StopwatchContainer'

function App() {
  return (
    <div className='app'>
      <h2>Hometask 1: Stopwatch</h2>
      <p className='author'>Task is completed by Jahongir Hayitov</p>
      <Suspense fallback={"Loading..."}>
        <StopwatchContainer />
      </Suspense>
    </div>
  )
}

export default App
