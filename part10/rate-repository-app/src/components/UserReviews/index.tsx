import { FlatList } from 'react-native';
import useUserReviews from '../../hooks/useUserReviews';
import UserReview from './UserReview';
import ItemSeparator from '../ItemSeparator';
import ReviewButtons from './ReviewButtons';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../../graphql/mutations';

const UserReviews = ({ navigation }) => {
  const { reviews, fetchMore, refetch } = useUserReviews({ first: 6 });
  const onReachEnd = () => fetchMore();
  const [mutate, results] = useMutation(DELETE_REVIEW);
  const deleteReview = (id: string) => {
    void mutate({ variables: { deleteReviewId: id } });
    void refetch({ first: 6 });
  };
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <>
          <UserReview review={item} />
          <ReviewButtons
            item={item}
            navigation={navigation}
            deleteReview={deleteReview}
          />
        </>
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      onEndReachedThreshold={0.5}
      onEndReached={onReachEnd}
    />
  );
};
export default UserReviews;
