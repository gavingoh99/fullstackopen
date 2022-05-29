import { View, StyleSheet } from 'react-native';
import { Repository } from '../../types';
import RepositoryHeader from './RepositoryHeader';
import RepositoryFooter from './RepositoryFooter';
const styles = StyleSheet.create({
  repoContainer: {
    backgroundColor: 'white',
  },
});
const RepositoryItem = ({ repository }: { repository: Repository }) => {
  return (
    <View style={styles.repoContainer}>
      <RepositoryHeader
        avatarUrl={repository.ownerAvatarUrl}
        description={repository.description}
        name={repository.fullName}
        language={repository.language}
      />
      <RepositoryFooter
        stars={repository.stargazersCount}
        forks={repository.forksCount}
        reviews={repository.reviewCount}
        ratings={repository.ratingAverage}
      />
    </View>
  );
};
export default RepositoryItem;
