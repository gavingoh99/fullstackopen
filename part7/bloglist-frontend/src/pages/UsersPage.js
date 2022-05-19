import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUsers } from '../reducers/usersReducer';
import { Link } from 'react-router-dom';

const UsersPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const users = useSelector((state) => state.users);
  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <th></th>
          <th>blogs created</th>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default UsersPage;
