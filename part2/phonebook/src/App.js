import { useState, useEffect } from 'react'
import { Filter } from './Filter'
import { PersonForm } from './PersonForm'
import { Persons } from './Persons'
import { Notification } from './Notification'
import personsService from './service/persons'
import './app.css'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ 'name': '', 'number': '' })
  // TODO: 一个message队列，而且可以x掉或一段时间后消除（这个练习貌似没有必要搞了）
  const [errorMessage, setErrorMessage] = useState('')
  const [warningMessage, setWarningMessage] = useState('')
  const [infoMessage, setInfoMessage] = useState('')
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
            setInfoMessage(`${personObject.name} Updated`)
            setTimeout(() => {
              setInfoMessage(null)
            }, 5000)
          } catch (e) {
            setErrorMessage(`Failed to change ${newPerson.name}`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
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
          setInfoMessage(`${personObject.name} Added`)
            setTimeout(() => {
              setInfoMessage(null)
            }, 5000)
          setNewPerson({ 'name': '', 'number': '' })
          // }
        } catch (e) {
          setErrorMessage('Node Created Failed')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
      }
    } else {
      setErrorMessage('No empty value')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const delPerson = async (id) => {
    const isConfirm = window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)
    if (isConfirm) {
      try {
        const response = await personsService.del(id);
        if (response.status === 204) {
          try {
            const getResp = await personsService.getAll();
            if (getResp.status === 200) {
              setPersons(getResp.data)
            }
          } catch (e) {
            setErrorMessage('Refetch all Failed')
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          }
        }
      } catch (e) {
        setErrorMessage('Node delete Failed')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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

      <Notification message={errorMessage} messageType='error' />
      <Notification message={warningMessage} messageType='warning' />
      <Notification message={infoMessage} messageType='info' />
      <h3>Numbers</h3>
      <Persons persons={persons} nameFilter={nameFilter} delPerson={delPerson} />
    </>
  )
}

export default App;
