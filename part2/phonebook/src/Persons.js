export const Persons = ({persons, nameFilter, delPerson}) => {
  return (
    <>
      {persons
        .filter(p => p.name.includes(nameFilter))
        .map(p => <p key={p.id}>{p.name} {p.number} <button onClick={() => delPerson(p.id)}>delete</button></p>)}
    </>
  )
}