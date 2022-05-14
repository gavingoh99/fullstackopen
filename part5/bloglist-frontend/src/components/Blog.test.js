import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  let mockUpdateLikes;
  beforeEach(() => {
    const blog = {
      title: 'testTitle',
      author: 'testAuthor',
      url: 'testUrl',
      likes: 0,
      user: {
        username: 'testUsername',
        name: 'testName',
      },
    };
    mockUpdateLikes = jest.fn();
    render(<Blog blog={blog} updateLikes={mockUpdateLikes} />);
  });
  test('component renders title and author of blog', () => {
    screen.getByTestId('blogTitleAndAuthor');
  });
  test('url, likes and username are not rendered by default', () => {
    const url = screen.queryByTestId('blogUrl');
    expect(url).toBeNull();

    const likes = screen.queryByTestId('blogLikes');
    expect(likes).toBeNull();

    const username = screen.queryByTestId('blogUsername');
    expect(username).toBeNull();
  });
  test('after clicking button, url, likes and username are displayed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    screen.getByTestId('blogUrl');

    screen.getByTestId('blogLikes');

    screen.getByTestId('blogUsername');
  });
  test('clicking the button again can hide url, likes and username', async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText('view');
    await user.click(viewButton);
    const hideButton = screen.getByText('hide');
    await user.click(hideButton);

    const url = screen.queryByTestId('blogUrl');
    expect(url).toBeNull();

    const likes = screen.queryByTestId('blogLikes');
    expect(likes).toBeNull();

    const username = screen.queryByTestId('blogUsername');
    expect(username).toBeNull();
  });
  test('clicking the like button twice calls the event handler twice', async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText('view');
    await user.click(viewButton);
    const likeButton = screen.getByText('like');
    await user.click(likeButton);
    expect(mockUpdateLikes.mock.calls).toHaveLength(1);
    await user.click(likeButton);
    expect(mockUpdateLikes.mock.calls).toHaveLength(2);
  });
});
