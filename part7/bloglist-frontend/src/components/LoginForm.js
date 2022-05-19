import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useField } from '../hooks/index.js';
import { loginUser } from '../reducers/userReducer';
import { setFadingNotification } from '../reducers/notificationReducer';

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;
export const FormLabel = styled.label`
  font-size: 10px;
`;
export const FormButton = styled.button`
  display: block;
  margin: 5px auto 0 auto;
  background-color: white;
  padding: 5px 10px;
  border: 1px solid;
  cursor: pointer;
`;

const LoginForm = () => {
  const username = useField('text');
  const password = useField('password');
  const dispatch = useDispatch();
  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(
      loginUser({
        username: username.value,
        password: password.value,
      })
    );
    dispatch(setFadingNotification(`login successful`));
  };
  return (
    <FormContainer>
      <form onSubmit={handleLogin}>
        <FormGroup>
          <FormLabel htmlFor='username'>Username</FormLabel>
          <input id='username' {...{ ...username, reset: 0 }} />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <input id='password' {...{ ...password, reset: 0 }} />
        </FormGroup>
        <FormButton type='submit'>login</FormButton>
      </form>
    </FormContainer>
  );
};
export default LoginForm;
