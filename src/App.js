import { useEffect, useState } from "react";
import "./App.css";

import Map from "./Components/Map/Map";
import useGetLocation from "./hooks/useGetLocation";
import logo from "./mlh-prep.png";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [city, setCity] = useState("your city");
  // const [geoLocation, setGeoLocation] = useState({
  //   lat: 19.08333,
  //   lng: 72.83333,
  // });
  const [results, setResults] = useState(null);

  const [geoLocation, setGeoLocation, city, setCity] = useGetLocation("Agra", {
    lat: 19.08333,
    lng: 72.83333,
  });

  useEffect(() => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&lon=${geoLocation.lng}&appid=${process.env.REACT_APP_APIKEY}`;
    fetch(URL)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result["cod"] !== 200) {
            setIsLoaded(false);
          } else {
            setIsLoaded(true);
            setResults(result);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [city]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <img className="logo" src={logo} alt="MLH Prep Logo"></img>
        <div>
          <h2>Enter a city below 👇</h2>
          <input
            type="text"
            value={city}
            placeholder="Enter a city"
            onChange={(event) => setCity(event.target.value)}
          />
          <Map
            city={city}
            setCity={setCity}
            geoLocation={geoLocation}
            setGeoLocation={setGeoLocation}
          />
          <div className="Results">
            {!isLoaded && <h2>Loading...</h2>}
            {/* {console.log(results)} */}
            {isLoaded && results && (
              <>
                <h3>{results.weather[0].main}</h3>
                <p>Feels like {results.main.feels_like}°C</p>
                <i>
                  <p>
                    {results.name}, {results.sys.country}
                  </p>
                </i>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default App;
