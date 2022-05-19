import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Blog from '../components/Blog';
import { getBlogs } from '../reducers/blogReducer';
import { StyledSubTitle } from '../pages/BlogsPage';

const BlogList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, []);
  const blogs = useSelector((state) => state.blogs);
  return (
    <>
      <StyledSubTitle>blogs</StyledSubTitle>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogList;
