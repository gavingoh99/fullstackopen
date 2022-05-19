import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { setFadingNotification } from './notificationReducer';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    incrementLikes(state, action) {
      const id = action.payload;
      const blogToUpdate = state.find((blog) => blog.id === id);
      const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };
      return state.map((blog) => (blog.id === id ? updatedBlog : blog));
    },
    addCommentTo(state, action) {
      const id = action.payload.id;
      const comment = action.payload.comment;
      const blogToUpdate = state.find((blog) => blog.id === id);
      const updatedBlog = {
        ...blogToUpdate,
        comments: [...blogToUpdate.comments, comment],
      };
      return state.map((blog) => (blog.id === id ? updatedBlog : blog));
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const {
  setBlogs,
  appendBlog,
  incrementLikes,
  removeBlog,
  addCommentTo,
} = blogSlice.actions;

export const getBlogs = () => async (dispatch) => {
  try {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  } catch (exception) {
    dispatch(setFadingNotification(exception.message));
  }
};

export const createBlog = (blog) => async (dispatch) => {
  try {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
  } catch (exception) {
    dispatch(setFadingNotification(exception.message));
  }
};

export const updateBlog = (blog) => async (dispatch) => {
  try {
    const updatedBlog = await blogService.update({
      ...blog,
      user: blog.user.id,
      comments: blog.comments.map((comment) => comment.id),
      likes: blog.likes + 1,
    });
    dispatch(incrementLikes(updatedBlog.id));
  } catch (exception) {
    dispatch(setFadingNotification(exception.message));
  }
};

export const deleteBlog = (blog) => async (dispatch) => {
  try {
    await blogService.remove(blog);
    dispatch(removeBlog(blog.id));
  } catch (exception) {
    dispatch(setFadingNotification(exception.message));
  }
};

export const addCommentToBlog = (blog, comment) => async (dispatch) => {
  try {
    const { updatedBlog, newComment } = await blogService.createComment(
      blog,
      comment
    );
    dispatch(addCommentTo({ id: updatedBlog.id, comment: newComment }));
  } catch (exception) {
    dispatch(setFadingNotification(exception.message));
  }
};

export default blogSlice.reducer;
