import React from 'react'
// import { Button } from 'react-bootstrap';
import './WeatherButton.css';

const WeatherButton = ({cities, handleCityChange, selectedCity}) => {
  // console.log('cities', cities)
  return (
    <div className='button-area'>
      <button 
        className={`${selectedCity == null ? "active" : ""}`}
        onClick={() => handleCityChange('current')}
      >
        current location
      </button>
      {cities.map((city) => (
        <button
          className={`${selectedCity == city ? "active" : ""}`}
          onClick={() => handleCityChange(city)}
        >
          {city}
        </button>
      ))}
    </div>
  )
}

export default WeatherButton