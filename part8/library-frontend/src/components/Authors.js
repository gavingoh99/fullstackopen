import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { ALL_AUTHORS, UPDATE_AUTHOR_BIRTHYEAR } from '../queries';

const Authors = (props) => {
  const results = useQuery(ALL_AUTHORS);
  const [author, setAuthor] = useState('');
  const [born, setBorn] = useState('');
  const [editBirthYear, { data, loading, error }] = useMutation(
    UPDATE_AUTHOR_BIRTHYEAR
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    editBirthYear({
      variables: { name: author, setBornTo: +born },
      refetchQueries: [{ query: ALL_AUTHORS }],
    });
    setAuthor('');
    setBorn('');
  };
  if (!props.show) {
    return null;
  }
  if (results.loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {results.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={handleSubmit}>
        <select
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        >
          <option disabled value=''>
            -- select an author --
          </option>
          {results.data.allAuthors.map((author) => (
            <option key={author.name}>{author.name}</option>
          ))}
        </select>
        <div>
          <label htmlFor='born'>born</label>
          <input
            id='born'
            onChange={({ target }) => setBorn(target.value)}
            value={born}
          />
        </div>
        <button type='submit'>update</button>
      </form>
    </div>
  );
};

export default Authors;
