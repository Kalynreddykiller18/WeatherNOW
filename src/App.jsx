import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async () => {
    if (!location) {
      setError("Please enter a location!");
      return;
    }

    try {
      setLoading(true);
      console.log(loading, weather);
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json`,
        {
          params: {
            key: API_KEY,
            q: location,
          },
        }
      );
      setWeather(response.data);
      setError("");
      setLoading(false);
    } catch (err) {
      setError("Unable to fetch weather data. Check your location!");
      setWeather(null);
    }
  };

  return (
    <div className="app">
      <div className="title">
        <img src="icons.png" alt="icon not loaded" />
        <h1>Weather Now</h1>
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather &&
        (!loading ? (
          <div className="weather">
            <h2>
              {weather.location.name}, {weather.location.region},
              {weather.location.country}
            </h2>
            <p>{weather.current.condition.text}</p>
            <p>Temperature: {weather.current.temp_c}°C</p>
            <p>Humidity: {weather.current.humidity}%</p>
            <img
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
            />
          </div>
        ) : (
          <h3>Loading...</h3>
        ))}
    </div>
  );
};

export default App;
