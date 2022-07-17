export const Statistics = ({ good, nentral, bad }) => {
  if (good === 0 && nentral === 0 && bad === 0) {
    return <p>No feedback given</p>
  }
  const sum = good + nentral + bad
  const point = good - bad
  const average = point / sum
  const positive =  good / sum
  return (
    <>
      <h3>statistics</h3>
      <p>good {good}</p>
      <p>neutral {nentral}</p>
      <p>bad {bad}</p>
      <p>all {sum}</p>
      <p>average {average}</p>
      <p>positive {positive * 100} %</p>
    </>
  )
}