import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { GET_USER, ALL_BOOKS_BY_GENRE } from '../queries';

const Recommend = (props) => {
  const results = useQuery(GET_USER);
  const [queryByGenre, { data, loading, err }] =
    useLazyQuery(ALL_BOOKS_BY_GENRE);

  useEffect(() => {
    if (!results.loading && results.data.me) {
      queryByGenre({ variables: { genre: results.data.me.favouriteGenre } });
    }
  }, [results]);
  if (results.loading) {
    return <div>loading...</div>;
  }
  if (!props.show) {
    return null;
  }
  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favourite genre{' '}
        <strong>{results.data.me.favouriteGenre}</strong>{' '}
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Recommend;
