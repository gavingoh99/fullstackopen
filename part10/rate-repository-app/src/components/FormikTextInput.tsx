import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  errorText: {
    marginLeft: 10,
    color: theme.colors.error,
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
    margin: 10,
    borderRadius: 5,
    fontFamily: theme.fonts.main,
  },
  textInputError: {
    borderColor: theme.colors.error,
  },
});

const FormikTextInput = ({ name, ...props }: { name: string }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;
  const textInputStyle = [styles.textInput, showError && styles.textInputError];

  return (
    <>
      <TextInput
        style={textInputStyle}
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        secureTextEntry={name === 'password'}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};
export default FormikTextInput;
