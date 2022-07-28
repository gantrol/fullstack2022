import { useState } from 'react'
import { Filter } from './Filter'
import { PersonForm } from './PersonForm'
import { Persons } from './Persons'
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
      <Filter nameFilter={nameFilter} changeHandler={(e) => setNameFilter(e.target.value)}/>

      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newPerson={newPerson} setNewPerson={setNewPerson}/>

      <h3>Numbers</h3>
      <Persons persons={persons} nameFilter={nameFilter} />
    </>
  )
}

export default App;
