import { FlatList } from 'react-native';
import useRepository from '../../hooks/useRepository';
import RepositoryItem from '../RepositoryItem';
import { Repository } from '../../../types';
import ReviewItem from './ReviewItem';
import ItemSeparator from '../ItemSeparator';

const RepositoryView = ({ route, navigation }) => {
  const { id } = route.params;
  console.log(id);
  const { repository, reviews, fetchMore } = useRepository({
    repositoryId: id as string,
    first: 2,
  });
  const onReachEnd = () => fetchMore();
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <RepositoryItem
          repository={repository as Repository}
          showRedirect={true}
        />
      )}
      onEndReachedThreshold={0.5}
      onEndReached={onReachEnd}
    />
  );
};
export default RepositoryView;
