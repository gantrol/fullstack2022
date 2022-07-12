export const Content = ({ parts }) => {
  const listItems = parts.map((part) => {
    return <p>
      {part.name} {part.exercises}
    </p>
  })
  return (
    <>
      {listItems}
    </>
  )
}