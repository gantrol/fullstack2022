export const Content = ({ parts, exercises }) => {
  const listItems = parts.map((part, i) => {
    return <p>
      {part} {exercises[i]}
    </p>
  })
  return (
    <>
      {listItems}
    </>
  )
}