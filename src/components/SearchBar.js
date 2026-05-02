import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const trimmedCity = city.trim();
    
    if (trimmedCity === '') {
      setIsValid(false);
      return;
    }

    setIsValid(true);
    onSearch(trimmedCity);
    setCity('');
  };

  const handleChange = (e) => {
    setCity(e.target.value);
    if (!isValid) setIsValid(true);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-container">
        <input
          type="text"
          className={`search-input ${!isValid ? 'invalid' : ''}`}
          placeholder="Enter city name (e.g., London, New York, Tokyo)"
          value={city}
          onChange={handleChange}
        />
        <button type="submit" className="search-button">
          <span className="search-icon">🔍</span>
          Search
        </button>
      </div>
      {!isValid && <p className="validation-error">Please enter a city name</p>}
    </form>
  );
};

export default SearchBar;