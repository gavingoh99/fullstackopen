import { useState } from 'react';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import theme from '../../../theme';
import { ReviewFormValues, SubmitFunctionObject } from '../../../types';
import useCreateReview from '../../hooks/useCreateReview';
import CreateReviewContainer from './CreateReviewContainer';
import { initialValues } from './CreateReviewContainer';
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
const CreateReview = ({ navigation }) => {
  const [error, setError] = useState<string>('');
  const { createReview } = useCreateReview();
  const onSubmit = async (
    values: ReviewFormValues,
    { resetForm, setSubmitting, setFieldTouched }: SubmitFunctionObject
  ) => {
    const { repositoryName, rating, ownerName, text } = values;
    try {
      const { data } = await createReview({
        repositoryName,
        ownerName,
        rating: +rating,
        text,
      });
      if (data.createReview) {
        navigation.push('Repository', {
          id: data.createReview.repositoryId as string,
        });
        Keyboard.dismiss();
        setSubmitting(false);
        resetForm(initialValues);
        setFieldTouched('text', false, false);
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
      <CreateReviewContainer onSubmit={onSubmit} />
    </>
  );
};
export default CreateReview;
