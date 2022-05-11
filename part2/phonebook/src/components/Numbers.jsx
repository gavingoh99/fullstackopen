import { Person } from '../components/Person';
export const Numbers = ({ persons, handleDelete }) => (
  <div>
    {[...persons].map((person) => (
      <Person key={person.name} person={person} handleDelete={handleDelete} />
    ))}
  </div>
);
