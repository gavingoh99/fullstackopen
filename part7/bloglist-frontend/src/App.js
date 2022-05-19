import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reattachUser } from './reducers/userReducer';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';
import BlogsPage from './pages/BlogsPage';
import BlogPage from './pages/BlogPage';

const BlogTitle = styled.h1`
  text-align: center;
`;
const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      const user = JSON.parse(window.localStorage.getItem('user'));
      if (user !== null) {
        dispatch(reattachUser(user));
      }
    }
  }, []);
  return (
    <div>
      <BlogTitle>blogs</BlogTitle>
      <Notification />
      <Navbar user={user} />
      {Object.keys(user).length === 0 && (
        <Togglable buttonLabel='login'>
          <LoginForm />
        </Togglable>
      )}
      <Routes>
        <Route path='/'>
          <Route index element={<BlogsPage user={user} />} />
          <Route path='users'>
            <Route index element={<UsersPage />} />
            <Route path=':userId' element={<UserPage />} />
          </Route>
          <Route path='blogs/:blogId' element={<BlogPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
