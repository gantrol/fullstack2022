import { StatisticLine } from "./StatisticLine"

export const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>
  }
  const sum = good + neutral + bad
  const point = good - bad
  const average = sum === 0 ? 0 : point / sum
  const positive = sum === 0 ? 0 : good / sum
  const positive_text = `${positive * 100} %`
  return (
    <>
      <h3>statistics</h3>
      <table>
        <tr><th></th><th></th></tr>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={sum} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive_text} />
      </table>
    </>
  )
}