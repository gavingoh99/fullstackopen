const { createSlice } = require('@reduxjs/toolkit');

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    content: '',
    timerId: '',
  },
  reducers: {
    createNotification(state, action) {
      return { ...state, content: action.payload };
    },
    clearNotification(state, action) {
      return {};
    },
    appendTimerId(state, action) {
      return { ...state, timerId: action.payload };
    },
  },
});

export const { createNotification, clearNotification, appendTimerId } =
  notificationSlice.actions;

export const setFadingNotification = (notification) => (dispatch, getState) => {
  const {
    notification: { timerId: id },
  } = getState();
  if (id) clearTimeout(id);
  dispatch(createNotification(notification));
  const newId = setTimeout(() => dispatch(clearNotification()), 5000);
  dispatch(appendTimerId(newId));
};
export default notificationSlice.reducer;
