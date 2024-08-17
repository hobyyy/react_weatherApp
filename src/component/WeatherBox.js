import React from 'react'

const WeatherBox = ({weather}) => {
  console.log('dd',weather)
  const hwasi = weather?.main.temp*1.8 + 32;
  return (
    <div className='weather-box'>
      <div>{weather?.name}</div>
      <h2>{weather?.main.temp}C / {hwasi}화씨</h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  )
}

export default WeatherBox