import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { setFadingNotification } from './notificationReducer';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    addUser(state, action) {
      return action.payload;
    },
    clearUser(state, action) {
      return {};
    },
  },
});

export const { addUser, clearUser } = userSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await loginService.login(credentials);
    dispatch(addUser(response));
    window.localStorage.setItem('user', JSON.stringify(response));
  } catch (exception) {
    dispatch(setFadingNotification(exception.message));
  }
};

export const reattachUser = (user) => (dispatch) => {
  dispatch(addUser(user));
  blogService.setToken(user.token);
};

export const logoutUser = () => (dispatch) => {
  dispatch(clearUser());
  window.localStorage.removeItem('user');
};

export default userSlice.reducer;
