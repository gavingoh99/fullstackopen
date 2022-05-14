import { useState } from 'react';

export default function BlogForm({ createBlog }) {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog(blog);
    setBlog({ title: '', author: '', url: '', likes: 0 });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>title</label>
        <input
          data-testid='title'
          id='title'
          onChange={({ target }) => setBlog({ ...blog, title: target.value })}
          value={blog.title}
        />
      </div>

      <div>
        <label htmlFor='author'>author</label>
        <input
          data-testid='author'
          id='author'
          onChange={({ target }) => setBlog({ ...blog, author: target.value })}
          value={blog.author}
        />
      </div>

      <div>
        <label htmlFor='url'>url</label>
        <input
          id='url'
          data-testid='url'
          onChange={({ target }) => setBlog({ ...blog, url: target.value })}
          value={blog.url}
        />
      </div>

      <div>
        <label htmlFor='likes'>likes</label>
        <input
          data-testid='likes'
          id='likes'
          onChange={({ target }) => setBlog({ ...blog, likes: target.value })}
          value={blog.likes}
        />
      </div>

      <button id='create-blog' type='submit'>
        create
      </button>
    </form>
  );
}
