import { TextInput as NativeTextInput } from 'react-native';

const TextInput = ({
  style,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error,
  ...props
}: {
  style: object;
  error: string | undefined | false;
}) => {
  const textInputStyle = [style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};
export default TextInput;
