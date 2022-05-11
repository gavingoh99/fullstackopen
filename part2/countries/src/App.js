import { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter } from './components/Filter';
import Countries from './components/Countries';

const App = () => {
  let [countries, setCountries] = useState([]);
  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then((response) => setCountries(response.data));
  }, []);
  let [filter, setFilter] = useState('');
  let [displayedCountries, setDisplayedCountries] = useState([]);
  let handleSearchFilter = (event) => {
    setFilter(event.target.value);
  };
  useEffect(() => {
    setDisplayedCountries(
      countries.filter((country) =>
        country.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter]);
  return (
    <div>
      <Filter handleSearchFilter={handleSearchFilter} filter={filter} />
      {filter ? (
        <Countries countries={displayedCountries} setFilter={setFilter} />
      ) : (
        'Start searching for countries'
      )}
    </div>
  );
};
export default App;
