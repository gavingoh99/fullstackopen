import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState('');
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0,
  });

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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem('user', JSON.stringify(user));
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setMessage('wrong username or password', 'error');
    }
  };
  const loginForm = () => (
    <form onSubmit={handleLogin}>
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

      <button type='submit'>login</button>
    </form>
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create(blog);
      setBlogs(blogs.concat(newBlog));
      setBlog({ title: '', author: '', url: '', likes: 0 });
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`);
    } catch (exception) {
      setMessage('Invalid fields', 'error');
    }
  };

  const blogForm = () => (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>title</label>
        <input
          id='title'
          onChange={({ target }) => setBlog({ ...blog, title: target.value })}
          value={blog.title}
        />
      </div>

      <div>
        <label htmlFor='author'>author</label>
        <input
          id='author'
          onChange={({ target }) => setBlog({ ...blog, author: target.value })}
          value={blog.author}
        />
      </div>

      <div>
        <label htmlFor='url'>url</label>
        <input
          id='url'
          onChange={({ target }) => setBlog({ ...blog, url: target.value })}
          value={blog.url}
        />
      </div>

      <div>
        <label htmlFor='likes'>likes</label>
        <input
          id='likes'
          onChange={({ target }) => setBlog({ ...blog, likes: target.value })}
          value={blog.likes}
        />
      </div>

      <button type='submit'>create</button>
    </form>
  );

  return (
    <div>
      <h2>blogs</h2>
      {notification && <Notification notification={notification} />}
      {user === null ? (
        loginForm()
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
          {blogForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}{' '}
        </>
      )}
    </div>
  );
};

export default App;
