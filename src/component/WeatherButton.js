import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, selectedCity, handleCityChange }) => {
  return (
    <div className="menu-container">
      <Button
        variant={selectedCity === "" ? "outline-warning" : "warning"}
        onClick={() => handleCityChange("current")}
        className="location-button"
      >
        Current Location
      </Button>

      {cities.map((item, index) => (
        <Button
          variant={selectedCity === item ? "outline-warning" : "warning"}
          key={index}
          onClick={() => handleCityChange(item)}
          className="city-button"
        >
          {item}
        </Button>
      ))}
    </div>
  )
}

export default WeatherButton