import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    content: '',
    timeoutId: '',
  },
  reducers: {
    createNotification(state, action) {
      const content = action.payload;
      return {
        content,
      };
    },
    addTimeoutId(state, action) {
      state.timeoutId = action.payload;
    },
    clearNotification(state, action) {
      return {};
    },
  },
});

export const { createNotification, addTimeoutId, clearNotification } =
  notificationSlice.actions;
export const setNotification =
  (notification, duration) => (dispatch, getState) => {
    let existingId = getState().notification.timeoutId;
    clearTimeout(existingId);
    dispatch(createNotification(notification));
    const id = setTimeout(
      () => dispatch(clearNotification()),
      duration * 10 ** 3
    );
    dispatch(addTimeoutId(id));
  };
export default notificationSlice.reducer;
