import { NavigationProp } from '@react-navigation/core';
import useSignUp from '../../hooks/useSignUp';
import useSignIn from '../../hooks/useSignIn';
import { SignUpFormValues, SubmitFunctionObject } from '../../../types';
import SignUpContainer from './SignUpContainer';
import { useState } from 'react';
import { StyleSheet, View, Text, Keyboard } from 'react-native';
import { useApolloClient } from '@apollo/client';
import { initialValues } from './SignUpContainer';
import theme from '../../../theme';

const styles = StyleSheet.create({
  errorMessage: {
    color: theme.colors.error,
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.error,
    margin: 10,
  },
});
const SignUp = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  const [error, setError] = useState<string>('');
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();
  const apolloClient = useApolloClient();
  const onSubmit = async (
    values: SignUpFormValues,
    { resetForm, setSubmitting, setFieldTouched }: SubmitFunctionObject
  ) => {
    const { username, password } = values;
    try {
      const { data } = await signUp({ username, password });
      if (data.createUser) {
        const { data } = await signIn({ username, password });
        if (data.authenticate !== null) {
          navigation.navigate('RepositoryList');
          void apolloClient.resetStore();
          Keyboard.dismiss();
          setTimeout(() => {
            setSubmitting(false);
            resetForm(initialValues);
            setFieldTouched('confirmPassword', false, false);
          }, 5);
        }
      }
    } catch (e: any) {
      const { message } = e;
      setError(message as string);
    }
  };
  return (
    <>
      {error !== '' && (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      )}
      <SignUpContainer onSubmit={onSubmit} />
    </>
  );
};
export default SignUp;
