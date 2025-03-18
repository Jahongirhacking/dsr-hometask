import { Suspense } from 'react'
import './style.scss'
import StopwatchContainer from './components/StopwatchContainer'

function App() {
  return (
    <Suspense fallback={"Loading..."}>
      <StopwatchContainer />
    </Suspense>
  )
}

export default App
