import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClipLoader from "react-spinners/ClipLoader";

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
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aipError, setAPIError] = useState("");
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
    try {
      setLoading(true)
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=81ebfcd1504f95e9f62303b3c6c3ce53&units=metric`
      let response = await fetch(url);
      let data = await response.json();
      // console.log('data',data)
      setWeather(data);
      setLoading(false)
    } catch(err) {
      setAPIError(err.message);
      setLoading(false)
    }
  }

  //클릭한 city 기반으로 날씨 API 호출하여 데이터를 셋팅하는 함수
  const getWeatherByCity = async() => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=81ebfcd1504f95e9f62303b3c6c3ce53&units=metric`
      setLoading(true)
      let response = await fetch(url);
      let data = await response.json();
      // console.log('data',data)
      setWeather(data);
      setLoading(false)
     } catch(err) {
      setAPIError(err.message);
      setLoading(false)
    }
  }
  const handleCityChange = (city) => {
    if(city==='current')  setCity(null);
    else  {
      setCity(city)
    }
  }
  useEffect(() => {
    if(!city)  getCurrentLocation()
    else  getWeatherByCity()
  }, [city])
  return (
    <div>
      {loading ? (
        <div className='container'>
          <ClipLoader color='#FFCFF1' loading={loading} size={130}/> 
        </div>
      ) : (
        <div className='container'>
          <WeatherBox weather={weather}/>
          <WeatherButton 
            cities={cities} 
            handleCityChange={handleCityChange}
            selectedCity={city}
          />
        </div>
      )}
    </div>
  );
}

export default App;

