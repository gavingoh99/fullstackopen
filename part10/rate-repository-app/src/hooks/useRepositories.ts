import { useState, useEffect } from 'react';
// import { request } from '../utils/fetch';
import { Repository } from '../../types';
import { useLazyQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

interface Edge {
  node: Repository;
  cursor: string;
}
interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}
interface FetchedRepositories {
  totalCount?: number;
  edges: Edge[];
  pageInfo?: PageInfo;
}
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
const useRepositories = () => {
  const [repositories, setRepositories] = useState<FetchedRepositories>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [queryRepositories, { loading, data, error }] = useLazyQuery(
    GET_REPOSITORIES,
    {
      fetchPolicy: 'cache-and-network',
    }
  );
  useEffect(() => {
    void queryRepositories();
  }, []);

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
      setRepositories(data?.repositories as FetchedRepositories);
    }
  }, [loading]);

  return { repositories, isLoading, refetch: queryRepositories };
};
export default useRepositories;
