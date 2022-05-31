import RepositoryListContainer from './RepositoryListContainer';
import useRepositories from '../../hooks/useRepositories';
import { NavigationProp } from '@react-navigation/native';
import RepositoryListControl from './RepositoryListControl';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

type Principle = 'latest' | 'highestRating' | 'lowestRating';
const RepositoryList = ({
  navigation,
}: {
  navigation: NavigationProp<any, any>;
}) => {
  const [selectedPrinciple, setSelectedPrinciple] =
    useState<Principle>('latest');
  const [searchKeyword, setSearchKeyword] = useState<string>();
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  let principle: object;
  if (selectedPrinciple === 'latest') {
    principle = { orderBy: 'CREATED_AT' };
  } else if (selectedPrinciple === 'highestRating') {
    principle = { orderBy: 'RATING_AVERAGE' };
  } else {
    principle = { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
  }
  const { repositories, fetchMore } = useRepositories({
    first: 8,
    ...principle,
    searchKeyword: debouncedSearchKeyword,
  });
  const onEndReach = () => fetchMore();
  return (
    <>
      <RepositoryListControl
        searchKeyword={searchKeyword}
        setSelectedPrinciple={setSelectedPrinciple}
        setSearchKeyword={setSearchKeyword}
      />
      <RepositoryListContainer
        navigation={navigation}
        repositories={repositories}
        onEndReach={onEndReach}
      />
    </>
  );
};
export default RepositoryList;
