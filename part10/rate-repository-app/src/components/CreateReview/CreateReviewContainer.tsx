import { Formik } from 'formik';
import { Pressable, View, StyleSheet } from 'react-native';
import * as yup from 'yup';
import { ReviewFormValues } from '../../../types';
import FormikTextInput from '../FormikTextInput';
import Text from '../Text';
import theme from '../../../theme';
const styles = StyleSheet.create({
  createReviewButton: {
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
export const initialValues: ReviewFormValues = {
  repositoryName: '',
  ownerName: '',
  rating: '',
  text: '',
};
const validationSchema = yup.object().shape({
  repositoryName: yup.string().required('Repository name is required'),
  ownerName: yup.string().required('Owner name is required'),
  rating: yup.number().min(0).max(100).required('Rating is required'),
  text: yup.string().optional(),
});
const CreateReviewForm = ({ onSubmit }: { onSubmit: () => void }) => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <FormikTextInput name='repositoryName' placeholder='Repository Name' />
      <FormikTextInput name='ownerName' placeholder='Owner Name' />
      <FormikTextInput name='rating' placeholder='0-100' />
      <FormikTextInput name='text' placeholder='Review' />
      <Pressable onPress={onSubmit}>
        <Text style={styles.createReviewButton}>Create a review</Text>
      </Pressable>
    </View>
  );
};
const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};
export default CreateReviewContainer;
