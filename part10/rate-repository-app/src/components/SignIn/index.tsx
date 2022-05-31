import { Keyboard } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useApolloClient } from '@apollo/client';

import useSignIn from '../../hooks/useSignIn';
import SignInContainer from './SignInContainer';
import { SignInFormValues, SubmitFunctionObject } from '../../../types';
import { initialValues } from './SignInContainer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SignIn = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  const { signIn } = useSignIn();
  const apolloClient = useApolloClient();
  const onSubmit = async (
    values: SignInFormValues,
    { resetForm, setSubmitting, setFieldTouched }: SubmitFunctionObject
  ) => {
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });
      if (data.authenticate !== null) {
        navigation.navigate('RepositoryList');
        void apolloClient.resetStore();
        Keyboard.dismiss();
        setTimeout(() => {
          setSubmitting(false);
          resetForm(initialValues);
          setFieldTouched('password', false, false);
        }, 5);
      }
    } catch (e: unknown) {
      console.error(e);
    }
  };
  return <SignInContainer onSubmit={onSubmit} />;
};
export default SignIn;
