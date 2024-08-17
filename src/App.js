import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
// 1. app이 실행되자마자 현재위치 기반의 날씨가 보인다.
// 2. 날씨정보에는 도시, 섭씨, 화씨, 날씨상태
// 3. 5개의 버튼이 있다. (1개는 현재위치, 4개는 다른 도시)
// 4. 도시버튼을 클릭할 때마다 도시의 날씨가 나온다.
// 5. 현재 위치 기반 날씨버튼을 클릭하면 다시 현재 위치 기반의 날씨가 나온다.
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다.

function App() {
  const [weather, setWeather] = useState(null);
  const cities = ['paris', 'london', 'italy', 'seoul']
  const getCurrentLocation = () => {
    // console.log('getCurrentLocation')
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      // console.log('현재 위치 : ', lat,lon)
      getWeatherByCurrentLocation(lat, lon)
    });
  }
  
  //현재 위치를 기반한 날씨를 알 수 있는 함수
  const getWeatherByCurrentLocation = async(lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=81ebfcd1504f95e9f62303b3c6c3ce53&units=metric`
    let response = await fetch(url);
    let data = await response.json();
    // console.log('data',data)
    setWeather(data);
  }
  useEffect(() => {
    getCurrentLocation()
  }, [])
  return (
    <div className='container'>
      <WeatherBox weather={weather}/>
      <WeatherButton cities={cities}/>
    </div>
  );
}

export default App;

