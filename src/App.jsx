import { useState } from "react";
import "./App.css";

import fetchData from "./fetchLocation";

function App() {
  const [location, setLocation] = useState("");
  const [weatherDetails, setWeatherDetails] = useState(null);
  const [loading, setisLoading] = useState(false);

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
    <div className="wrapper">
      <form className="formContainer" onSubmit={handleSubmit}>
        <input
          type="text"
          name=""
          id=""
          placeholder="Enter City Name"
          className="inputLocation"
          value={location}
          onChange={handleInputChange}
        />
        <button className="buttonSearch" type="submit">
          Search
        </button>
      </form>

      {loading && <p>Loading data…</p>}

      {weatherDetails != null && weatherDetails.current && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weatherDetails.current.feelslike_c} °C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weatherDetails.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weatherDetails.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weatherDetails.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
