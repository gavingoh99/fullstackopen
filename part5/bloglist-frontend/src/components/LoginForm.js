import { useState } from 'react';
export default function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin({ username, password });
    setUsername('');
    setPassword('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='username'>username</label>
        <input
          id='username'
          onChange={({ target }) => setUsername(target.value)}
          value={username}
        />
      </div>

      <div>
        <label htmlFor='password'>password</label>
        <input
          id='password'
          onChange={({ target }) => setPassword(target.value)}
          value={password}
          type='password'
        />
      </div>

      <button id='login-button' type='submit'>
        login
      </button>
    </form>
  );
}
