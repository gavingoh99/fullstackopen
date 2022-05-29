import { Formik } from 'formik';
import { Pressable, StyleSheet, View } from 'react-native';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../../theme';

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
const SignIn = () => {
  const onSubmit = (values: SignInFormValues) => {
    console.log(`Username: ${values.username}`);
    console.log(`Password: ${values.password}`);
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
