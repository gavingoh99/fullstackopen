import { useState, useEffect } from 'react';
import Form from './components/Form';
import Notification from './components/Notification';
import { Numbers } from './components/Numbers';
import { Filter } from './components/Filter';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [notification, setNotification] = useState('');
  const [filter, setFilter] = useState('');
  const [displayedPersons, setDisplayedPersons] = useState(persons);
  useEffect(() => {
    personService.getAll().then((notes) => setPersons(notes));
  }, []);
  let handleChange = (field, event) => {
    field === 'name'
      ? setNewPerson({ ...newPerson, name: event.target.value })
      : setNewPerson({ ...newPerson, number: event.target.value });
  };
  let addNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(''), 5000);
  };
  let handleSubmit = (event) => {
    event.preventDefault();
    let hasExistingName = persons.findIndex(
      (person) => person.name === newPerson.name
    );
    if (hasExistingName > -1) {
      let existingPerson = persons[hasExistingName];
      let confirmUpdate = window.confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmUpdate) {
        let updatedPerson = { ...existingPerson, number: newPerson.number };
        personService
          .update(existingPerson.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
            addNotification(`Updated number for ${updatedPerson.name}`);
          })
          .catch((error) => {
            addNotification(error.response.data.error, 'error');
          });
      }
      setNewPerson({ name: '', number: '' });
      return;
    }
    personService
      .create(newPerson)
      .then((response) => {
        setPersons(persons.concat(response.newPerson));
        addNotification(`Added ${response.newPerson.name}`);
        setNewPerson({ name: '', number: '' });
      })
      .catch((error) => {
        addNotification(error.response.data.error, 'error');
      });
  };
  useEffect(() => {
    setDisplayedPersons(persons);
    setFilter('');
  }, [persons]);
  let handleSearchFilter = (event) => {
    setFilter(event.target.value);
    if (!event.target.value) {
      setDisplayedPersons(persons);
      return;
    }
    setDisplayedPersons(
      persons.filter((person) =>
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };
  let handleDelete = (person, event) => {
    let confirmDelete = window.confirm(`Delete ${person.name}?`);
    if (confirmDelete) {
      personService
        .del(person.id)
        .then((response) => {
          setPersons(persons.filter((currPerson) => currPerson !== person));
          addNotification(`${person.name} has been deleted`);
        })
        .catch((error) => {
          addNotification(error.message, 'error');
        });
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter handleSearchFilter={handleSearchFilter} filter={filter} />
      <h3>Add a new</h3>
      <Form
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newPerson={newPerson}
      />
      <h3>Numbers</h3>
      <Numbers persons={displayedPersons} handleDelete={handleDelete} />
    </div>
  );
};
export default App;
