import {
  useQuery,
  useLazyQuery,
  useApolloClient,
  useSubscription,
} from '@apollo/client';
import { useEffect, useState } from 'react';
import { ALL_BOOKS, ALL_BOOKS_BY_GENRE, BOOK_ADDED } from '../queries';

const Books = (props) => {
  const client = useApolloClient();
  const results = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState('');
  const [queryByGenre, { data, loading, err }] =
    useLazyQuery(ALL_BOOKS_BY_GENRE);
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`${addedBook.title} added`);
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        };
      });
      addedBook.genres.forEach((genre) => {
        client.cache.updateQuery(
          { query: ALL_BOOKS_BY_GENRE, variables: { genre } },
          ({ allBooks }) => {
            return {
              allBooks: allBooks.concat(addedBook),
            };
          }
        );
      });
    },
  });
  useEffect(() => {
    queryByGenre({ variables: { genre } });
  }, [genre]);
  if (!props.show || !results.data.allBooks.length) {
    return null;
  }
  if (results.loading || loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>books</h2>
      {genre && (
        <p>
          in genre <strong>{genre}</strong>{' '}
          <button onClick={() => setGenre('')}>reset</button>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {!genre ? (
            <>
              {results.data.allBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </>
          ) : (
            <>
              {data.allBooks.map((book) => (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      {Array.from(
        new Set(
          results.data.allBooks
            .map((book) => book.genres)
            .reduce((prev, curr) => prev.concat(curr))
        )
      ).map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Books;
