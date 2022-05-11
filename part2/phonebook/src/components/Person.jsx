export const Person = ({ person, handleDelete }) => (
  <p>
    {person.name} {person.number}{' '}
    <button onClick={handleDelete.bind(null, person)}>delete</button>
  </p>
);
