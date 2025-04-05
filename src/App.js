import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { WeatherBox } from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from 'react-bootstrap';


// 1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다.
// 2. 날씨정보에는 도시, 섭씨 화씨, 날씨상태
// 3. 5개의 버튼이 있다. (1개는 현재위치, )
// 4. 도시 버튼을 클릭할 때마다 도시별 날씨가 나온다.
// 5. 현재위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다
// 6. 데이터를 들고 오는 동안 로딩 스피너가 돈다.

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cities = ['paris', 'new york', 'tokyo', 'seoul'];

  const getCurrentLocation = () => {
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        getWeatherByCurrentLocation(lat, lon);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setError("현재 위치를 가져올 수 없습니다. 위치 권한을 확인해주세요.");
        setLoading(false);
      }
    );
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      setLoading(true);
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6c6a527bdcca53e5c9bc50147de27add&units=metric`;
      let response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Weather API Error: ${response.status} ${response.statusText}`);
      }

      let data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("현재 위치의 날씨를 가져오는 중 오류 발생:", error);
      setError("날씨 정보를 가져오는데 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    if (!city) return;

    try {
      setLoading(true);
      setError(null);
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6c6a527bdcca53e5c9bc50147de27add&units=metric`;
      let response = await fetch(url);


      if (!response.ok) {
        throw new Error(`Weather API Error: ${response.status} ${response.statusText}`);
      }

      let data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error(`${city} 도시의 날씨를 가져오는 중 오류 발생:`, error);
      setError(`'${city}' 도시의 날씨 정보를 가져오는데 실패했습니다.`);
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity("");
    } else {
      setCity(city);
    }
  };

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader color="#f88c6b" loading={loading} size={150} />
        </div>
      ) : error ? (
        <div className="container error">
          <h2>오류가 발생했습니다</h2>
          <p>{error}</p>
          <Button
            variant="warning"
            onClick={() => {
              setError(null);
              if (city === "") {
                getCurrentLocation();
              } else {
                getWeatherByCity();
              }
            }}
          >
            다시 시도
          </Button>
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            selectedCity={city}
            handleCityChange={handleCityChange}
          />
        </div>
      )}
    </div>
  );
}

export default App
