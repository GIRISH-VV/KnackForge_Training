import { useState } from 'react'
import searchIcon from './assets/search.png'
import clearIcon from './assets/clear.png'
import cloudIcon from './assets/cloud.png'
import humidityIcon from './assets/humidity.png'
import windIcon from './assets/wind.png' 
import snowIcon from './assets/snow.png'
import rainIcon from './assets/rain.png'
import drizzleIcon from './assets/drizzle.png'
import './App.css'

const WeatherDetails = ({ icon, temp, city, country, lat, long, humidity, wind }) => {
  return (
    <>
      <div className="image">
        <img src={icon} alt="Weather Icon" />
      </div>

      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>

      <div className="cord">
        <div>
          <span className="lat">Latitude: </span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="lon">Longitude: </span>
          <span>{long}</span>
        </div>
      </div>

      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="Humidity" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={windIcon} alt="Wind Speed" className="icon" />
          <div className="data">
            <div className="wind-percent">{wind} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

const App = () => {
  const [text, setText] = useState("Chennai")
  const [icon, setIcon] = useState(clearIcon)
  const [temp, setTemp] = useState(0)
  const [city, setCity] = useState("Chennai")
  const [country, setCountry] = useState("IN")
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [wind, setWind] = useState(0)
  const [cityNotFound, setCityNotFound] = useState(false)
  const [loading, setLoading] = useState(false)

  const search = async () => {
    setLoading(true)
    // const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=2916956470f1ab4ebc47a70b00c33719&units=Metric`

    try{
      let res = await fetch(url)
      let data = await res.json()
      console.log(data)
      if (data.cod === 404 || data.cod === 401) {
        setCityNotFound(true)
        setLoading(false)
        return
      }
      setIcon(
        data.weather[0].main === "Clouds"
          ? cloudIcon
          : data.weather[0].main === "Clear"
            ? clearIcon
            : data.weather[0].main === "Snow"
              ? snowIcon
              : data.weather[0].main === "Rain"
                ? rainIcon
                : drizzleIcon
      )
      setTemp(data.main.temp)
      setCity(data.name)
      setCountry(data.sys.country)
      setLat(data.coord.lat)
      setLong(data.coord.lon)
      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setCityNotFound(false)
    } catch (error) {
      console.log(error)
      setCityNotFound(true)
    } finally{
        setLoading(false)
    }
  }

  const handleCity = (e) => {
    setText(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search()
    }
  }

  return (
    <>
      <div className="container">
        <div className="input-container">
          <input type="text" placeholder="Search City" className="cityInput" onChange={handleCity} value={text} onKeyDown={handleKeyDown} />
          <div className="searchIcon">
            <img src={searchIcon} alt="Search" onClick={search} />
          </div> 
        </div>
        <WeatherDetails icon={icon} 
          temp={temp} 
          city={city} 
          country={country} 
          lat= {lat}
          long={long}
          humidity={humidity}
          wind={wind}
        />
        <p className="copyright">
          Designed by <span>Girish</span>
        </p>
      </div>

    </>
  )
}

export default App
