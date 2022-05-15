import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = '';
    props.createAnecdote(content);
    props.setNotification(`created ${content}`, 5);
  };
  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name='content' />
      </div>
      <button>create</button>
    </form>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    createAnecdote: (content) => dispatch(createAnecdote(content)),

    setNotification: (notification, duration) =>
      dispatch(setNotification(notification, duration)),
  };
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
