import { useDispatch } from 'react-redux';
import { useField } from '../hooks/index.js';
import { createBlog } from '../reducers/blogReducer';
import { setFadingNotification } from '../reducers/notificationReducer.js';
import {
  FormContainer,
  FormGroup,
  FormLabel,
  FormButton,
} from '../components/LoginForm';

const BlogForm = () => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');
  const likes = useField('number');

  const dispatch = useDispatch();
  const addBlog = (event) => {
    event.preventDefault();
    dispatch(
      createBlog({
        title: title.value,
        author: author.value,
        url: url.value,
        likes: +likes.value,
      })
    );
    dispatch(
      setFadingNotification(`created ${title.value} by ${author.value}`)
    );
    title.reset();
    author.reset();
    url.reset();
    likes.reset();
  };
  return (
    <FormContainer>
      <form onSubmit={addBlog}>
        <FormGroup>
          <FormLabel htmlFor='title'>Title</FormLabel>
          <input id='title' {...{ ...title, reset: 0 }} />
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor='author'>Author</FormLabel>
          <input id='author' {...{ ...author, reset: 0 }} />
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor='url'>URL</FormLabel>
          <input id='url' {...{ ...url, reset: 0 }} />
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor='likes'>Likes</FormLabel>
          <input id='likes' {...{ ...likes, reset: 0 }} />
        </FormGroup>

        <FormButton type='submit'>create</FormButton>
      </form>
    </FormContainer>
  );
};
export default BlogForm;
