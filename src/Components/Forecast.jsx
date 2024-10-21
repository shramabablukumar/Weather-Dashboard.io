import React from "react";
import { CiClock1 } from "react-icons/ci";

export const Forecast = ({ list, units , name,iconUrl}) => {
  const monthsShortForm = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec"
  };

  return (
    <div className="section section-fav" title="Weather Forecast" >
      {list?.map((item) => {
          return (
            <div style={{cursor:"pointer"}} className="forecast description"><h6>{item.dt_txt.slice(8,10)}-{monthsShortForm[item.dt_txt.slice(5,7).toString()]}</h6>
              <h3> {item.main.temp.toFixed()}°{
                units === "metric" ? "C" : "F"
              } - {item.dt_txt.slice(10,16)} <CiClock1 /></h3>
              <img src={`https://openweathermap.org/img/wn/${item?.weather[0]?.icon}@2x.png`} alt="weather-icon" />
              <h3>{`${item?.weather[0].description}`}</h3>
            </div>
          );
      })}
    </div>
  );
};
