import React from 'react';

const WeatherDetails = ({ data, forecast }) => {
  const {
    main,
    wind,
    clouds,
    visibility,
    sys
  } = data;

  const getDailyForecast = () => {
    const dailyData = {};
    
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = item;
      }
    });

    return Object.values(dailyData).slice(0, 5);
  };

  const dailyForecast = getDailyForecast();

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWindDirection = (degree) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degree / 45) % 8;
    return directions[index];
  };

  return (
    <div className="weather-details">
      <h2 className="section-title">
        <span className="title-icon">📊</span>
        Weather Details
      </h2>
      
      <div className="details-grid">
        <div className="detail-card">
          <div className="detail-icon">🌡️</div>
          <div className="detail-content">
            <p className="detail-label">Temperature Range</p>
            <p className="detail-value">
              {Math.round(main.temp_min)}° / {Math.round(main.temp_max)}°C
            </p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">💨</div>
          <div className="detail-content">
            <p className="detail-label">Wind</p>
            <p className="detail-value">
              {wind.speed} m/s {wind.deg && getWindDirection(wind.deg)}
            </p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">💧</div>
          <div className="detail-content">
            <p className="detail-label">Humidity</p>
            <p className="detail-value">{main.humidity}%</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">☁️</div>
          <div className="detail-content">
            <p className="detail-label">Cloudiness</p>
            <p className="detail-value">{clouds.all}%</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">👁️</div>
          <div className="detail-content">
            <p className="detail-label">Visibility</p>
            <p className="detail-value">{(visibility / 1000).toFixed(1)} km</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">🧭</div>
          <div className="detail-content">
            <p className="detail-label">Pressure</p>
            <p className="detail-value">{main.pressure} hPa</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">🌅</div>
          <div className="detail-content">
            <p className="detail-label">Sunrise</p>
            <p className="detail-value">{formatTime(sys.sunrise)}</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">🌇</div>
          <div className="detail-content">
            <p className="detail-label">Sunset</p>
            <p className="detail-value">{formatTime(sys.sunset)}</p>
          </div>
        </div>
      </div>

      <div className="forecast-section">
        <h2 className="section-title">
          <span className="title-icon">📅</span>
          5-Day Forecast
        </h2>
        <div className="forecast-grid">
          {dailyForecast.map((day, index) => (
            <div key={index} className="forecast-card">
              <p className="forecast-date">{formatDate(day.dt)}</p>
              <img 
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                className="forecast-icon"
              />
              <p className="forecast-temp">
                <span className="temp-max">{Math.round(day.main.temp_max)}°</span>
                <span className="temp-min">{Math.round(day.main.temp_min)}°</span>
              </p>
              <p className="forecast-desc">{day.weather[0].main}</p>
              <div className="forecast-details">
                <span>💧 {day.main.humidity}%</span>
                <span>💨 {day.wind.speed} m/s</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;