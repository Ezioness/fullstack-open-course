import { useState, useEffect } from 'react'

import Persons from './components/Persons.jsx'
import PersonForm from './components/PersonForm.jsx'
import Filter from './components/Filter.jsx'
import Notification from './components/Notification.jsx'

import personServices from "./services/persons.js"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameSearch, setNameSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState("success")

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personCheck = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    if (personCheck) {
      if (confirm(`${personCheck.name} is already added to phonebook, replace the old number with a new one ?`)) {
        const changedPerson = { ...personCheck, number: newNumber }
        personServices.update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setMessageType("success")
            setMessage(
              `Modified ${returnedPerson.name}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)

            setPersons(persons.map(p => p.id !== changedPerson.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
          }).catch(error => {
            setMessageType("error")
            setMessage(`Information of ${changedPerson.name} has already been removed from server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== personToDelete.id))

          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personServices
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))

          setMessageType("success")
          setMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)

          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleDeletion = (id) => {
    const personToDelete = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personServices
        .deletePerson(personToDelete.id)
        .then(r => {
          setMessageType("success")
          setMessage(`Deleted ${personToDelete.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== personToDelete.id))
        }).catch(error => {
          setMessageType("error")
          setMessage(`Information of ${personToDelete.name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== personToDelete.id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNameSearch(event.target.value)
  }

  const personsToShow = nameSearch === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(nameSearch.toLowerCase()))

  return (
    <div>
      <h1 className='title'>Phonebook</h1>
      <Notification message={message} messageType={messageType} />
      <Filter
        nameSearch={nameSearch}
        handleSearchChange={handleSearchChange}
      />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        nameChange={handleNameChange}
        numberChange={handleNumberChange}
        name={newName}
        number={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={handleDeletion} />
    </div>
  )
}

export default App