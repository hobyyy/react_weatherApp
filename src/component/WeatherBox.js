import React from 'react'

const WeatherBox = ({weather}) => {
  // console.log('dd',weather)
  const fahrenheit = Math.round((weather?.main.temp*1.8 + 32)*10)/10; // 섭씨온도 화씨로 변환
  return (
    <div className='weather-box'>
      <div>{weather?.name}</div>
      <h2>{weather?.main.temp}°C / {fahrenheit}°F</h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  )
}

export default WeatherBox