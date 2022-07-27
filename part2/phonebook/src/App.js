import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  // TODO: object like this `{}`?
  const [newPerson, setNewPerson] = useState({'name': '', 'number': ''})
  const [nameFilter, setNameFilter] = useState('')

  // event handler
  const addPerson = (event) => {
    event.preventDefault();
    // TODO: test check empty
    if (newPerson.name && newPerson.number) {
      // TODO: get id
      const personObject = {
        ...newPerson,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject));
      setNewPerson({'name': '', 'number': ''})
    } else {
      alert('No empty value')
    }
  }

  // renderer
  return (
    <>
      <h2>Phonebook</h2>
      <p>filter shown with <input type='text' value={nameFilter} onChange={(e) => setNameFilter(e.target.value)}/></p>

      <h3>add a new</h3>
      <form onSubmit={addPerson}>
        <p>name: <input type="text" value={newPerson.name} onChange={e => setNewPerson({...newPerson, 'name': e.target.value})}/></p>
        <p>number: <input type="text" value={newPerson.number} onChange={e => setNewPerson({...newPerson, 'number': e.target.value})}/></p>
        <button type='submit'>save</button>
      </form>

      <h3>Numbers</h3>
      {persons
        .filter(p => p.name.includes(nameFilter))
        .map(p => <p key={p.id}>{p.name} {p.number}</p>)}
    </>
  )
}

export default App;
