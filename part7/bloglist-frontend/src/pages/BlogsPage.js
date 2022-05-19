import styled from 'styled-components';
import Togglable from '../components/Togglable';
import BlogForm from '../components/BlogForm';
import BlogList from '../components/BlogList';

export const StyledSubTitle = styled.h2`
  text-align: center;
`;
const BlogsPage = ({ user }) => {
  return (
    <>
      {Object.keys(user).length === 0 || (
        <Togglable buttonLabel='create new'>
          <StyledSubTitle>create blog</StyledSubTitle>
          <BlogForm />
        </Togglable>
      )}
      <BlogList />
    </>
  );
};
export default BlogsPage;
