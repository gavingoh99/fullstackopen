import { useState } from 'react';
import BlogDetail from '../components/BlogDetail';

const Blog = ({ index, blog, updateLikes, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div data-index={index} style={blogStyle}>
      <div>
        <div data-testid='blogTitleAndAuthor'>
          {blog.title} {blog.author}{' '}
          <button onClick={() => setShowDetail(!showDetail)}>
            {showDetail ? 'hide' : 'view'}
          </button>
        </div>{' '}
        {showDetail && (
          <BlogDetail
            blog={blog}
            updateLikes={updateLikes}
            deleteBlog={deleteBlog}
          />
        )}
      </div>
    </div>
  );
};

export default Blog;
