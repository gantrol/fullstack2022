import { useState, useEffect } from 'react'
import { Filter } from './Filter'
import { PersonForm } from './PersonForm'
import { Persons } from './Persons'
import personsService from './service/persons'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ 'name': '', 'number': '' })
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
      const index = persons.findIndex(p => newPerson.name === p.name)
      if (index > -1) {
        const id = index + 1
        const isConfirm = window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)
        if (isConfirm) {
          const personObject = {
            ...newPerson,
            id: id
          }
          try {
            await personsService.put(personObject)
            setPersons(persons.map(p => p.id === id ? personObject : p))
          } catch (e) {
            alert(`Failed to change ${newPerson.name}`)
          }
        }
      } else {
        const personObject = {
          ...newPerson,
          id: persons.length + 1
        }
        try {
          const response = await personsService.create(personObject)
          // TODO: if (response.status === 200) {
          setPersons(persons.concat(response.data));
          setNewPerson({ 'name': '', 'number': '' })
          // }
        } catch (e) {
          alert('Node Created Failed')
        }
      }
    } else {
      alert('No empty value')
    }
  }

  const delPerson = async (id) => {
    const isConfirm = window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)
    if (isConfirm) {
      try {
        const response = await personsService.del(id);
        if (response.status === 200) {
          try {
            const getResp = await personsService.getAll();
            if (response.status === 200) {
              setPersons(getResp.data)
            }
          } catch (e) {
            alert('Refetch all Failed')
          }
        }
      } catch (e) {
        alert('Node delete Failed')
      }  
    }
  }

  console.log('rendering')
  return (
    <>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} changeHandler={(e) => setNameFilter(e.target.value)} />

      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newPerson={newPerson} setNewPerson={setNewPerson} />

      <h3>Numbers</h3>
      <Persons persons={persons} nameFilter={nameFilter} delPerson={delPerson} />
    </>
  )
}

export default App;
