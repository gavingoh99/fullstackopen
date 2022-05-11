export default function Form({ handleSubmit, handleChange, newPerson }) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{' '}
        <input
          onChange={handleChange.bind(null, 'name')}
          value={newPerson.name}
        />
      </div>
      <div>
        number:{' '}
        <input
          type='tel'
          onChange={handleChange.bind(null, 'number')}
          value={newPerson.number}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
}
