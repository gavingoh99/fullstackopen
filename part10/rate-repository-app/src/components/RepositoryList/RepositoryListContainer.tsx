import { FlatList, Pressable } from 'react-native';
import RepositoryItem from '../RepositoryItem';
import { FetchedRepositories, Repository } from '../../../types';
import ItemSeparator from '../ItemSeparator';

const RepositoryListContainer = ({
  repositories,
  navigation,
  onEndReach,
}: {
  repositories: FetchedRepositories | undefined;
  navigation: any;
  onEndReach: () => void;
}) => {
  const repositoryNodes: Repository[] = repositories
    ? repositories.edges
        .map((edge) => edge.node)
        .map((node) => ({ ...node, key: node.fullName }))
    : [];
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => navigation.push('Repository', { id: item.id })}
        >
          <RepositoryItem repository={item} showRedirect={false} />
        </Pressable>
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};
export default RepositoryListContainer;
