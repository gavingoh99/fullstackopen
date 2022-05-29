import { useMutation } from '@apollo/client';
import { AUTHENTICATE_USER } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE_USER);
  const authStorage = useAuthStorage();

  const signIn = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const mutateResult = await mutate({
      variables: { credentials: { username, password } },
    });
    await authStorage.setAccessToken(
      mutateResult.data.authenticate.accessToken as string
    );
    return mutateResult;
  };
  return { signIn, result };
};
export default useSignIn;
