import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  let mockCreateBlog;
  beforeEach(() => {
    mockCreateBlog = jest.fn();
    render(<BlogForm createBlog={mockCreateBlog} />);
  });
  test('calls event handler when a new blog is created', async () => {
    const user = userEvent.setup();
    const blog = {
      title: 'testTitle',
      author: 'testAuthor',
      url: 'testUrl',
      likes: 5,
      user: {
        username: 'testUsername',
        name: 'testName',
      },
    };
    const title = screen.getByTestId('title');
    await user.type(title, blog.title);
    const author = screen.getByTestId('author');
    await user.type(author, blog.author);
    const url = screen.getByTestId('url');
    await user.type(url, blog.url);
    const likes = screen.getByTestId('likes');
    await user.clear(likes);
    await user.type(likes, blog.likes.toString());

    const submit = screen.getByText('create');
    await user.click(submit);

    expect(mockCreateBlog.mock.calls).toHaveLength(1);
    expect(mockCreateBlog.mock.calls[0][0].title).toBe(blog.title);
    expect(mockCreateBlog.mock.calls[0][0].author).toBe(blog.author);
    expect(mockCreateBlog.mock.calls[0][0].url).toBe(blog.url);
    expect(mockCreateBlog.mock.calls[0][0].likes).toBe(blog.likes.toString());
  });
});
