import { Alert, Pressable, StyleSheet, View } from 'react-native';
import theme from '../../../theme';
import Text from '../Text';

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 5,
    width: 150,
    textAlign: 'center',
    overflow: 'hidden',
    color: 'white',
    margin: 10,
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
});
const ReviewButtons = ({ item, navigation, deleteReview }) => {
  const confirmDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deleteReview(item.id),
        },
      ]
    );
  };
  return (
    <View
      style={{
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}
    >
      <Pressable
        onPress={() =>
          navigation.navigate('Repository', { id: item.repositoryId })
        }
      >
        <Text style={{ ...styles.button, ...styles.viewButton }}>
          View repository
        </Text>
      </Pressable>
      <Pressable onPress={confirmDelete}>
        <Text style={{ ...styles.button, ...styles.deleteButton }}>
          Delete review
        </Text>
      </Pressable>
    </View>
  );
};
export default ReviewButtons;
