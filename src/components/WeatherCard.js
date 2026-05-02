import React from 'react';

const WeatherCard = ({ data }) => {
  const {
    name,
    sys,
    main,
    weather,
    wind,
    dt
  } = data;

  const temperature = Math.round(main.temp);
  const feelsLike = Math.round(main.feels_like);
  const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
  
  const date = new Date(dt * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const time = new Date(dt * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const getWeatherGradient = (condition) => {
    const gradients = {
      'Clear': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'Clouds': 'linear-gradient(135deg, #757F9A 0%, #D7DDE8 100%)',
      'Rain': 'linear-gradient(135deg, #4b79a1 0%, #283e51 100%)',
      'Drizzle': 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
      'Thunderstorm': 'linear-gradient(135deg, #2c3e50 0%, #000000 100%)',
      'Snow': 'linear-gradient(135deg, #e6e9f0 0%, #eef1f5 100%)',
      'Mist': 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)',
      'Fog': 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)',
      'Haze': 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)'
    };
    return gradients[condition] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  };

  return (
    <div 
      className="weather-card" 
      style={{ background: getWeatherGradient(weather[0].main) }}
    >
      <div className="weather-card-header">
        <div className="location">
          <h2>
            <span className="location-icon">📍</span>
            {name}, {sys.country}
          </h2>
          <p className="date">{date}</p>
          <p className="time">{time}</p>
        </div>
      </div>

      <div className="weather-main">
        <img 
          src={weatherIcon} 
          alt={weather[0].description}
          className="weather-icon"
        />
        <div className="temperature">
          <h1>{temperature}°C</h1>
          <p className="feels-like">Feels like {feelsLike}°C</p>
        </div>
      </div>

      <div className="weather-description">
        <h3>{weather[0].main}</h3>
        <p>{weather[0].description}</p>
      </div>

      <div className="weather-stats">
        <div className="stat">
          <span className="stat-icon">💨</span>
          <div>
            <span className="stat-label">Wind Speed</span>
            <span className="stat-value">{wind.speed} m/s</span>
          </div>
        </div>
        <div className="stat">
          <span className="stat-icon">💧</span>
          <div>
            <span className="stat-label">Humidity</span>
            <span className="stat-value">{main.humidity}%</span>
          </div>
        </div>
        <div className="stat">
          <span className="stat-icon">🌡️</span>
          <div>
            <span className="stat-label">Pressure</span>
            <span className="stat-value">{main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;