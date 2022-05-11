export default function Weather({ weather }) {
  if (weather === null) return null;
  return (
    <>
      <h2>Weather in {weather.name}</h2>
      <p>temperature {weather.main.temp} Celcius</p>
      <p>wind {weather.wind.speed} m/s</p>
    </>
  );
}
