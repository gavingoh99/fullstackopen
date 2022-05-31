// import { request } from '../utils/fetch';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { FetchedRepositories } from '../../types';

// using fetch API to query REST endpoint
// const useRepositories = () => {
//   const [repositories, setRepositories] = useState<FetchedRepositories>();
//   const [loading, setLoading] = useState<boolean>(false);
//
//   const fetchRepositories = async () => {
//     const fetchedRepositories = await request<FetchedRepositories>(
//       'http://192.168.1.167:5001/api/repositories'
//     );
//     setLoading(false);
//     setRepositories(fetchedRepositories);
//   };
//   useEffect(() => void fetchRepositories(), []);
//   return { repositories, loading, refetch: fetchRepositories };
// };
const useRepositories = (variables: object) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) return;
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };
  return {
    repositories: data?.repositories as FetchedRepositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};
export default useRepositories;
