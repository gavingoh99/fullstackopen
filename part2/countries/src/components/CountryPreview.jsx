export default function CountryPreview({ country, setFilter }) {
  return (
    <div>
      {country.name}{' '}
      <button onClick={() => setFilter(country.name)}>show</button>
    </div>
  );
}
