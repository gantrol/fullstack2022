export const Persons = ({persons, nameFilter}) => {
  return (
    <>
      {persons
        .filter(p => p.name.includes(nameFilter))
        .map(p => <p key={p.id}>{p.name} {p.number}</p>)}
    </>
  )
}