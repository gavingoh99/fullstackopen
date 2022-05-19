import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateBlog,
  deleteBlog,
  addCommentToBlog,
} from '../reducers/blogReducer';
import { setFadingNotification } from '../reducers/notificationReducer';
import { useField } from '../hooks/index.js';
const BlogPage = () => {
  const navigate = useNavigate();
  const id = useParams().blogId;
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );
  const dispatch = useDispatch();
  const likeBlog = () => {
    dispatch(updateBlog(blog));
    dispatch(setFadingNotification(`liked ${blog.title}`));
  };
  const removeBlog = () => {
    dispatch(deleteBlog(blog));
    navigate('/');
    dispatch(setFadingNotification(`removed ${blog.title}`));
  };
  const comment = useField('text');
  const addComment = (event) => {
    event.preventDefault();
    dispatch(addCommentToBlog(blog, comment.value));
    comment.reset();
    dispatch(setFadingNotification(`commented on ${blog.title}`));
  };
  if (!blog) return null;
  return (
    <>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes <button onClick={likeBlog}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      <button onClick={removeBlog}>remove</button>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input {...{ ...comment, reset: 0 }} />
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {blog.comments &&
          blog.comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
      </ul>
    </>
  );
};
export default BlogPage;
