const BlogDetail = ({ blog, updateLikes, deleteBlog }) => {
  return (
    <>
      {' '}
      <div data-testid='blogUrl'>{blog.url}</div>
      <div id='blog-likes' data-testid='blogLikes'>
        {blog.likes}{' '}
        <button
          id='like-button'
          onClick={() =>
            updateLikes({ ...blog, likes: blog.likes + 1, user: blog.user.id })
          }
        >
          like
        </button>
      </div>
      <div data-testid='blogUsername'>{blog.user.username}</div>
      <button onClick={() => deleteBlog(blog)}>remove</button>
    </>
  );
};

export default BlogDetail;
