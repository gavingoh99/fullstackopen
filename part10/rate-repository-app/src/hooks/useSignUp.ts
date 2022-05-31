import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import { SignInFormValues } from '../../types';

const useSignUp = () => {
  const [mutate, results] = useMutation(CREATE_USER);
  const signUp = async ({ username, password }: SignInFormValues) => {
    return mutate({ variables: { user: { username, password } } });
  };
  return { signUp, results };
};
export default useSignUp;
