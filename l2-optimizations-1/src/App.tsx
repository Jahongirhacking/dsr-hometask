import { Suspense } from 'react'
import StopwatchContainer from './components/StopwatchContainer'
import './style.scss'

function App() {
  return (
    <div className='app'>
      <h2>Hometask 2: Optimization 1</h2>
      <p className='author'>Task is completed by Jahongir Hayitov</p>
      <Suspense fallback={"Loading..."}>
        <StopwatchContainer />
      </Suspense>
    </div>
  )
}

export default App
