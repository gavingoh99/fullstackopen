import { useDispatch, useSelector } from 'react-redux';
import { upvoteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) => {
    let sortedAnecdotes = [...state.anecdotes].sort((anecdote1, anecdote2) => {
      return anecdote2.votes < anecdote1.votes
        ? -1
        : anecdote2.votes > anecdote1.votes
        ? 1
        : 0;
    });
    return filter
      ? sortedAnecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
      : sortedAnecdotes;
  });
  const dispatch = useDispatch();

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                dispatch(upvoteAnecdote(anecdote));
                dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
