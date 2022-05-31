import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

const useUserReviews = (variables: object) => {
  const queryVariables = { ...variables, includeReviews: true };
  const { data, loading, fetchMore, ...results } = useQuery(GET_CURRENT_USER, {
    variables: queryVariables,
    fetchPolicy: 'cache-and-network',
  });
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) return;
    fetchMore({
      variables: {
        after: data.me.reviews.pageInfo.endCursor,
        ...queryVariables,
      },
    });
  };
  return {
    reviews: data?.me.reviews.edges.map((edge) => edge.node),
    loading,
    fetchMore: handleFetchMore,
    ...results,
  };
};
export default useUserReviews;
