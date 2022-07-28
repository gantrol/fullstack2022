import { useState, useEffect } from 'react'
import { Filter } from './Filter'
import { PersonForm } from './PersonForm'
import { Persons } from './Persons'
import personsService from './service/persons'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({'name': '', 'number': ''})
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    // TODO: 为何会有两次side effect?
    const fetchPersons = async () => {
      console.log('side effect...')
      const response = await personsService.getAll()
      setPersons(response.data)
    }
    fetchPersons()
  }, [])

  // event handler
  const addPerson = async (event) => {
    event.preventDefault();
    // TODO: test check empty
    if (newPerson.name && newPerson.number) {
      const personObject = {
        ...newPerson,
        id: persons.length + 1
      }
      const response = await personsService.create(personObject)
      // TODO: 
      setPersons(persons.concat(response.data));
      setNewPerson({'name': '', 'number': ''})
    } else {
      alert('No empty value')
    }
  }

  console.log('rendering')
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
