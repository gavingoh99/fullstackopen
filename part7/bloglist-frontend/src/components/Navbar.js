import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { logoutUser } from '../reducers/userReducer';
import { setFadingNotification } from '../reducers/notificationReducer';
import { FormButton } from '../components/LoginForm';

const NavbarDiv = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  border: 1px solid;
  padding: 30px;
`;
const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (Object.keys(user).length === 0) return null;
  return (
    <NavbarDiv>
      <Link to='/'>blogs</Link> <Link to='/users'>users</Link>
      <div>
        {user.username} logged in{' '}
        <FormButton
          onClick={() => {
            dispatch(logoutUser());
            navigate('/');
            dispatch(setFadingNotification('logged out successfully'));
          }}
        >
          logout
        </FormButton>
      </div>
    </NavbarDiv>
  );
};
export default Navbar;
