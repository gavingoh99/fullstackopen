import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { ReviewFormValues } from '../../types';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const createReview = async ({
    repositoryName,
    ownerName,
    rating,
    text,
  }: ReviewFormValues) => {
    return mutate({
      variables: { review: { repositoryName, ownerName, rating, text } },
    });
  };
  return { createReview, result };
};
export default useCreateReview;
