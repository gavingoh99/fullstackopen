import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const UserPage = () => {
  const id = useParams().userId;
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  );
  if (!user) return null;
  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};
export default UserPage;
