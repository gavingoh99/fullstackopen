import { StyleSheet, View } from 'react-native';
import theme from '../../../theme';
import { Review } from '../../../types';
import Text from '../Text';

const styles = StyleSheet.create({
  reviewContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
  },
  reviewRight: {
    display: 'flex',
    marginLeft: 15,
  },
  ratingDisplay: {
    borderWidth: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    borderColor: 'green',
  },
});
const ReviewItem = ({ review }: { review: Review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingDisplay}>
        <Text style={{ textAlign: 'center', color: 'green' }}>
          {review.rating}
        </Text>
      </View>
      <View style={styles.reviewRight}>
        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
          {review.user.username}
        </Text>
        <Text style={{ marginBottom: 5, color: theme.colors.textSecondary }}>
          {new Date(review.createdAt).toLocaleString()}
        </Text>
        <Text style={{ marginBottom: 5 }}>{review.text}</Text>
      </View>
    </View>
  );
};
export default ReviewItem;
