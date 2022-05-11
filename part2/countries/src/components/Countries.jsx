import Country from '../components/Country';
import CountryPreview from '../components/CountryPreview';

export default function Countries({ countries, setFilter }) {
  if (countries.length > 10) return 'Too many matches, specify another filter';
  if (!countries.length) return 'No matches, specify another filter';
  return (
    <div>
      {countries.length > 1 ? (
        [...countries].map((country) => (
          <CountryPreview
            country={country}
            key={country.name}
            setFilter={setFilter}
          />
        ))
      ) : (
        <Country country={countries[0]} />
      )}
    </div>
  );
}
