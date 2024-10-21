import "./App.css";
import hotBg from "./assets/hot-pexel.jpg";
import coldBg from "./assets/cold.jpg";
import { Description } from "./Components/Description";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService.js";
import { CiBookmark } from "react-icons/ci";
import { Favourite } from "./Components/Favourite.jsx";
import { IoBookmark } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Forecast } from "./Components/Forecast.jsx";
import React from 'react';


function App() {
  const fav = JSON.parse(localStorage.getItem("favArray")) || [];
  const lastCity = localStorage.getItem("lastCity");
  const [city, setCity] = useState(lastCity || "delhi");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);
  const [favouriteWeather, setfavouriteWeather] = useState(fav);
  const [isFavourite, setIsFavourite] = useState(false);



  useEffect(() => {
    const fetchWeatherData = async () => {
        const data = await getFormattedWeatherData(city, units);
        setWeather(data);
      // console.log("dddddddddddddd", data)
      const threshold = units === "metric" ? 18 : 64;
      if (data?.temp <= threshold) {
        setBg(coldBg);
      } else {
        setBg(hotBg);
      }
    };
    fetchWeatherData();
  }, [units, city]);

  useEffect(() => {
    console.log(",,,",weather);
    if (weather) {
      const checkIfFav = favouriteWeather.some(
        (item) => item?.name === weather?.name
      );
      console.log(checkIfFav)
      setIsFavourite(checkIfFav);
    }
  }, [weather, favouriteWeather]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelcius = currentUnit === "C";
    button.innerText = isCelcius ? "°F" : "°C";

    setUnits(isCelcius ? "metric" : "imperial");
  };

  const enterKeypressed = (e) => {
    if (e.key === "Enter") {
      setCity(e.currentTarget?.value);
      localStorage.setItem("lastCity", e.currentTarget?.value);
      e.currentTarget.value = ''
      e.currentTarget.blur();
    }
  };

  const addFav = () => {
    if (!isFavourite && weather) {
      const weatherArray = [...favouriteWeather, weather];
      setfavouriteWeather(weatherArray);
      localStorage.setItem("favArray", JSON.stringify(weatherArray));
    } else {
      console.log("Weather is already in favorites");
    }
  };

  const emptyFav = () => {
    localStorage.removeItem("favArray");
    setfavouriteWeather([]);
  };
  const removeFav = () => {
    if (weather) {
      const updatedFavourites = favouriteWeather.filter(
        (item) => item.id !== weather.id
      );
      setfavouriteWeather(updatedFavourites);
      localStorage.setItem("favArray", JSON.stringify(updatedFavourites));
    }
  };
  const handleFavClick = (newCity) =>{
    localStorage.setItem("lastCity", newCity);
    setCity(newCity)
  }
  return (
    <div className="App" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            {favouriteWeather.length === 0 ? (
              ""
            ) : (
              <div className="cross" title="empty favourite" onClick={emptyFav}>
                <RxCross2 />
              </div>
            )}
            <Favourite favouriteWeather={favouriteWeather} units={units} handleFavClick={handleFavClick} />
            <div className="section section-input">
              <input
                onKeyDown={enterKeypressed}
                type="text"
                name="city"
                placeholder="Enter your city..."
              />
              <div className="btn-box">
                {!isFavourite ? (
                  <h2 className="fav" onClick={addFav}>
                    <CiBookmark />
                  </h2>
                ) : (
                  <h2 className="fav" onClick={removeFav}>
                    <IoBookmark />
                  </h2>
                )}
                &nbsp; &nbsp;
                <button onClick={handleUnitsClick}>°F</button>
              </div>
            </div>
            <div className="section secton-temperature">
           
              <div className="description">

                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconUrl} alt="weather-icon" />
                <h3>{`${weather.description}`}</h3>
                
              </div>
              <div className="temperature" title={`Min⬇️ - ${weather.temp_min} - Max⬆️ - ${weather.temp_max}`} >
                <h1>{`${weather.temp.toFixed()}°${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>

            <Description weather={weather} units={units} />
            <Forecast  list={weather?.list} units={units} iconUrl={weather.iconUrl}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

