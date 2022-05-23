import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { LOGIN_USER } from '../queries';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, loading, err }] = useMutation(LOGIN_USER);

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
    setUsername('');
    setPassword('');
  };
  if (data) {
    window.localStorage.setItem('token', JSON.stringify(data.login.value));
    window.location.reload();
  }
  if (!props.show) {
    return null;
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>username</label>
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label>password</label>
          <input
            value={password}
            type='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};
export default Login;
