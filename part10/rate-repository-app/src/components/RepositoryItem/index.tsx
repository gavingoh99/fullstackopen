import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Repository } from '../../../types';
import RepositoryHeader from './RepositoryHeader';
import RepositoryFooter from './RepositoryFooter';
import theme from '../../../theme';
import * as Linking from 'expo-linking';
const styles = StyleSheet.create({
  repoContainer: {
    backgroundColor: 'white',
  },
  redirectButton: {
    backgroundColor: theme.colors.primary,
    textAlign: 'center',
    margin: 10,
    padding: 15,
    borderRadius: 5,
    overflow: 'hidden',
    fontSize: 15,
    color: 'white',
    fontFamily: theme.fonts.main,
  },
});
const RepositoryItem = ({
  repository,
  showRedirect,
}: {
  repository: Repository;
  showRedirect: boolean;
}) => {
  const openLink = async () => {
    Linking.openURL(repository.url);
  };
  if (typeof repository === 'undefined') return null;
  return (
    <View testID='repositoryItem' style={styles.repoContainer}>
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
      {showRedirect && (
        <Pressable onPress={openLink}>
          <Text style={styles.redirectButton}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};
export default RepositoryItem;
