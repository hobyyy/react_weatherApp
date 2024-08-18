import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, handleCityChange, selectedCity}) => {
  // console.log('cities', cities)
  return (
    <div>
      <Button 
        variant={`${selectedCity == null ? "outline-info" : "info"}`}
        onClick={() => handleCityChange('current')}
      >
        current location
      </Button>
      {cities.map((city) => (
        <Button 
          variant={`${selectedCity == city ? "outline-info" : "info"}`}
          onClick={() => handleCityChange(city)}
        >
          {city}
        </Button>
      ))}
    </div>
  )
}

export default WeatherButton