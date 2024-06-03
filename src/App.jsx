import { useEffect, useState } from "react";
import styles from "./App.module.css";

import search from "./assets/search.svg";
import fetchData from "./fetchLocation";

function App() {
  const [location, setLocation] = useState("");
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [loading, setisLoading] = useState(false);

  console.log(weatherDetails);

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWeatherDetails(null);
    setisLoading(true);
    try {
      const result = await fetchData(`${location}`);
      setWeatherDetails(result);
    } catch (err) {
      console.log(err);
      alert(`Failed to fetch weather data`);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <input
          type="text"
          name=""
          id=""
          placeholder="Enter City Name"
          className={styles.inputLocation}
          value={location}
          onChange={handleInputChange}
        />
        <button className={styles.buttonSearch} type="submit">
          Search
        </button>
      </form>

      {loading && <p>Loading data…</p>}

      {weatherDetails != null && weatherDetails.current && (
        <div className={styles.weatheDetailsContainer}>
          <div className={styles.weatherDetailCard}>
            <h3>Temperature</h3>
            <p>{weatherDetails.current.feelslike_c} °C</p>
          </div>
          <div className={styles.weatherDetailCard}>
            <h3>Humidity</h3>
            <p>{weatherDetails.current.humidity}%</p>
          </div>
          <div className={styles.weatherDetailCard}>
            <h3>Condition</h3>
            <p>{weatherDetails.current.condition.text}</p>
          </div>
          <div className={styles.weatherDetailCard}>
            <h3>Wind Speed</h3>
            <p>{weatherDetails.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
