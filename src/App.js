import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherDetails from './components/WeatherDetails';
import Loader from './components/Loader';
import config from './config';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    setForecastData(null);

    try {
      const weatherResponse = await fetch(
        `${config.apiBaseUrl}/weather?q=${cityName}&appid=${config.apiKey}&units=metric`
      );

      if (!weatherResponse.ok) {
        throw new Error('City not found. Please check the spelling and try again.');
      }

      const weatherJson = await weatherResponse.json();

      const forecastResponse = await fetch(
        `${config.apiBaseUrl}/forecast?q=${cityName}&appid=${config.apiKey}&units=metric`
      );

      if (!forecastResponse.ok) {
        throw new Error('Unable to fetch forecast data.');
      }

      const forecastJson = await forecastResponse.json();

      setWeatherData(weatherJson);
      setForecastData(forecastJson);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">🌤️ Weather Dashboard</h1>
          <p className="subtitle">Get real-time weather information for any city worldwide</p>
        </header>

        <SearchBar onSearch={fetchWeather} />

        {loading && <Loader />}

        {error && (
          <div className="error-message">
            <div className="error-icon">❌</div>
            <p>{error}</p>
            <button className="retry-button" onClick={() => setError(null)}>
              Try Again
            </button>
          </div>
        )}

        {weatherData && forecastData && !loading && (
          <>
            <WeatherCard data={weatherData} />
            <WeatherDetails data={weatherData} forecast={forecastData} />
          </>
        )}

        {!weatherData && !loading && !error && (
          <div className="welcome-message">
            <div className="welcome-icon">🔍</div>
            <h2>Welcome to Weather Dashboard!</h2>
            <p>Search for any city to see current weather and 5-day forecast</p>
            <div className="suggestions">
              <p>Try searching for:</p>
              <div className="suggestion-chips">
                <button onClick={() => fetchWeather('London')} className="chip">London</button>
                <button onClick={() => fetchWeather('New York')} className="chip">New York</button>
                <button onClick={() => fetchWeather('Tokyo')} className="chip">Tokyo</button>
                <button onClick={() => fetchWeather('Paris')} className="chip">Paris</button>
                <button onClick={() => fetchWeather('Mumbai')} className="chip">Mumbai</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>Powered by OpenWeather API | Built with React</p>
      </footer>
    </div>
  );
}

export default App;