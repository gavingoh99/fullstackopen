import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';
import { setFadingNotification } from './notificationReducer';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    appendUser(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setUsers, appendUser } = usersSlice.actions;

export const getUsers = () => async (dispatch) => {
  try {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  } catch (exception) {
    dispatch(setFadingNotification(exception.message));
  }
};
export default usersSlice.reducer;
