import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledBlog = styled.div`
  border: 1px solid;
  padding: 20px;
  font-size: 20px;
`;
const Blog = ({ blog }) => {
  return (
    <StyledBlog>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </StyledBlog>
  );
};

export default Blog;
