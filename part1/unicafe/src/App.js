import { useState } from 'react'
import { Button } from './Button'
import { Statistics } from './Statistic'
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <div>
        <h3>give feedback</h3>
        <Button onClick={() => setGood(good + 1)} text="good" />
        <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button onClick={() => setBad(bad + 1)} text="bad" />
      </div>
      <div>
        <Statistics good={good} nentral={neutral} bad={bad}/>
      </div>
    </>
    // statistics

  )
}

export default App
