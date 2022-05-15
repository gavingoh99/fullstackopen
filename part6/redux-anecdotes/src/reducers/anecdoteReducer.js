import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdote';

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    incrementVoteOf(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id === id ? changedAnecdote : anecdote
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAsAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { incrementVoteOf, appendAnecdote, setAsAnecdotes } =
  anecdoteSlice.actions;
export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch(setAsAnecdotes(anecdotes));
};
export const createAnecdote = (content) => async (dispatch) => {
  const anecdote = await anecdoteService.create(content);
  dispatch(appendAnecdote(anecdote));
};
export const upvoteAnecdote = (anecdote) => async (dispatch) => {
  const updatedAnecdote = await anecdoteService.update(anecdote);
  dispatch(incrementVoteOf(updatedAnecdote.id));
};
export default anecdoteSlice.reducer;
