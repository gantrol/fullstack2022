export const Total = ( {parts} ) => {
  return (
    <p>total of exercises {parts.reduce((a, part) => {
      console.log(part)
      return a + part.exercises
    }, 0)}</p>
  )
}