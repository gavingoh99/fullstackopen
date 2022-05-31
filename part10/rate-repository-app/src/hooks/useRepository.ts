import { useQuery } from '@apollo/client';
import { FetchedRepository } from '../../types';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (variables: object) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    variables,
    fetchPolicy: 'cache-and-network',
  });
  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository?.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) return;
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };
  return {
    repository: data?.repository as FetchedRepository,
    reviews: data?.repository.reviews.edges.map((edge) => edge.node),
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};
export default useRepository;
