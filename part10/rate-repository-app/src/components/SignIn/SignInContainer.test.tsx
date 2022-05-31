import { fireEvent, render, waitFor } from '@testing-library/react-native';
import SignInContainer from './SignInContainer';

describe('SignInContainer unit test', () => {
  it('calls onSubmit function correct number of times with correct arguments when a valid form is submitted', async () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <SignInContainer onSubmit={onSubmit} />
    );
    fireEvent.changeText(getByPlaceholderText('Username'), 'kalle');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.press(getByText('Sign in'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: 'kalle',
        password: 'password',
      });
    });
  });
});
