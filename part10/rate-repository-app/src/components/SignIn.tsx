import { Formik } from 'formik';
import { Pressable, StyleSheet, View, Keyboard } from 'react-native';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../../theme';
import useSignIn from '../hooks/useSignIn';
import { NavigationProp } from '@react-navigation/native';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  signInButton: {
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    color: 'white',
    textAlign: 'center',
    margin: 10,
    marginBottom: 15,
    padding: 15,
    fontSize: 15,
    overflow: 'hidden',
  },
});
interface SignInFormValues {
  username: string;
  password: string;
}
const initialValues: SignInFormValues = {
  username: '',
  password: '',
};
const SignInForm = ({ onSubmit }: { onSubmit: () => void }) => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput name='password' placeholder='Password' />
      <Pressable onPress={onSubmit}>
        <Text style={styles.signInButton}>Sign in</Text>
      </Pressable>
    </View>
  );
};
const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SignIn = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  const { signIn } = useSignIn();
  const apolloClient = useApolloClient();
  const onSubmit = async (
    values: SignInFormValues,
    {
      resetForm,
      setSubmitting,
      setFieldTouched,
    }: {
      resetForm: (object: SignInFormValues) => void;
      setSubmitting: (submit: boolean) => void;
      setFieldTouched: (field: string, _: boolean, __: boolean) => void;
    }
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
  return (
    <View
      style={{
        backgroundColor: '#e1e4e8',
      }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};
export default SignIn;
