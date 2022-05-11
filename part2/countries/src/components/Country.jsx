import { useEffect, useState } from 'react';
import axios from 'axios';
import Weather from '../components/Weather';

export default function Country({ country }) {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => setWeather(response.data));
  }, []);
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>languages:</h2>
      <ul>
        {[...country.languages].map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name}`}
        width={150}
      />
      <Weather weather={weather} />
    </div>
  );
}
