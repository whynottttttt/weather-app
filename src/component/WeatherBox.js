import React from 'react'

export const WeatherBox = ({ weather }) => {
  if (!weather) {
    return <div className="weather-box">날씨 정보를 불러오는 중입니다...</div>;
  }

  const fahrenheit = weather?.main?.temp ? ((weather.main.temp * 1.8) + 32).toFixed(1) : "";

  return (
    <div className="weather-box">
      <div className="city">{weather?.name}</div>
      <h2>
        {weather?.main?.temp?.toFixed(1)}°C / {fahrenheit}°F
      </h2>
      <h3>{weather?.weather?.[0]?.description}</h3>
    </div>
  )
}