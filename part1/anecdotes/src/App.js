import { useState } from 'react'
import { Anecdote } from './Anecdote'
import { Button } from './Button'

const randomInt = (start, end) => {
  // random return an int >= start and < end
  const r = Math.random()
  return Math.floor(r * (end - start)) + start
}

const App = () => {
  // from https://www.comp.nus.edu.sg/~damithch/pages/SE-quotes.htm
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const randomSelect = () => {
    const position = randomInt(0, anecdotes.length)
    setSelected(position)
  }

  const voteUp = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  // TODO: 这里去掉初始化的0，好像会有问题？可以研究一下reduce……
  const maxIndex = points.reduce((maxIndex, item, index, arr) => item > arr[maxIndex] ? index : maxIndex, 0)

  return (
    <div>
      <h3>Anecdote of the day</h3>
      <Anecdote text={anecdotes[selected]} point={points[selected]} />
      <Button text="random" onClick={randomSelect} />
      <Button text="vote" onClick={voteUp} />
      <h3>Anecdote with most votes</h3>
      <Anecdote text={anecdotes[maxIndex]} point={points[maxIndex]} />
    </div>
  )
}

export default App