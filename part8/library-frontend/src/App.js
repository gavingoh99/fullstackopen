import { useApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import Login from './components/Login';
import NewBook from './components/NewBook';
import Recommend from './components/Recommend';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState('');
  const client = useApolloClient();

  useEffect(() => {
    const existingToken = window.localStorage.getItem('token');
    if (!existingToken) return;
    setToken(JSON.parse(existingToken));
  }, []);
  const logoutUser = () => {
    setPage('authors');
    window.localStorage.removeItem('token');
    setToken('');
    client.resetStore();
  };
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={() => setPage('add')}>add book</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
        {token && <button onClick={logoutUser}>logout</button>}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <Login show={page === 'login'} />

      <NewBook show={page === 'add'} />

      <Recommend show={page === 'recommend'} />
    </div>
  );
};

export default App;
