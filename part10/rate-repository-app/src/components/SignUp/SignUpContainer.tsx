import { Formik } from 'formik';
import { Pressable, View, StyleSheet } from 'react-native';
import * as yup from 'yup';
import { SignUpFormValues } from '../../../types';
import FormikTextInput from '../FormikTextInput';
import Text from '../Text';
import theme from '../../../theme';

const styles = StyleSheet.create({
  signUpButton: {
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
export const initialValues: SignUpFormValues = {
  username: '',
  password: '',
  confirmPassword: '',
};
const validationSchema = yup.object().shape({
  username: yup.string().min(1).max(30).required('Username is required'),
  password: yup.string().min(5).max(50).required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirm is required'),
});
const SignUpForm = ({ onSubmit }: { onSubmit: () => void }) => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <FormikTextInput name='username' placeholder='Username' />
      <FormikTextInput name='password' placeholder='Password' />
      <FormikTextInput name='confirmPassword' placeholder='Confirm Password' />
      <Pressable onPress={onSubmit}>
        <Text style={styles.signUpButton}>Sign up</Text>
      </Pressable>
    </View>
  );
};
const SignUpContainer = ({ onSubmit }) => {
  return (
    <View>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};
export default SignUpContainer;
