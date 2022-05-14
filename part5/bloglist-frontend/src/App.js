import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState('');
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    let storedUser = window.localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const setMessage = (notification, type = 'info') => {
    setNotification({ notification, type });
    setTimeout(() => setNotification(''), 5000);
  };

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      setUser(user);
      window.localStorage.setItem('user', JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (exception) {
      setMessage('wrong username or password', 'error');
    }
  };

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog);
      setBlogs(blogs.concat(newBlog));
      blogFormRef.current.toggleVisibility();
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`);
    } catch (exception) {
      setMessage('Invalid fields', 'error');
    }
  };

  const updateLikes = async (blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(blogToUpdate);
      const blogsWithUpdatedBlog = [
        ...blogs.filter((blog) => blog.id !== updatedBlog.id),
        updatedBlog,
      ];
      setBlogs(blogsWithUpdatedBlog);
    } catch (exception) {
      setMessage('Error updating likes of blog', 'error');
    }
  };

  const deleteBlog = async (blogToDelete) => {
    if (user.username !== blogToDelete.user.username)
      return setMessage(
        'Only the user who added the blog post can delete it',
        'error'
      );
    let confirmDelete = window.confirm(
      `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`
    );
    if (!confirmDelete) return;
    try {
      await blogService.remove(blogToDelete);
      const blogsWithoutDeletedBlog = blogs.filter(
        (blog) => blog.id !== blogToDelete.id
      );
      setBlogs(blogsWithoutDeletedBlog);
    } catch (exception) {
      setMessage('Error deleting blog', 'error');
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      {notification && <Notification notification={notification} />}
      {user === null ? (
        <Togglable buttonLabel='login'>
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      ) : (
        <>
          <p>
            {user.username} logged in
            <button
              onClick={() => {
                setUser(null);
                window.localStorage.removeItem('user');
              }}
            >
              logout
            </button>
          </p>
          <Togglable buttonLabel='create blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogs
            .sort((blog1, blog2) => {
              let likes1 = blog1.likes;
              let likes2 = blog2.likes;
              return likes1 < likes2 ? -1 : likes2 > likes1 ? 1 : 0;
            })
            .map((blog, index) => (
              <Blog
                index={index}
                key={blog.id}
                blog={blog}
                updateLikes={updateLikes}
                deleteBlog={deleteBlog}
              />
            ))}{' '}
        </>
      )}
    </div>
  );
};

export default App;
