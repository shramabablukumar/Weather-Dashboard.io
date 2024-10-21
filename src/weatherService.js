const API_Key = "3383660871df2edecc8bd978fa62f39c";

// const API_Key = "3b06ce2c942c279a4907a0d2eb7d398f"

const makeIconUrl  = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormattedWeatherData = async (city, units = "metric") => {
  let data;
  try{
  const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_Key}&units=${units}`
  // const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=${units}`;
  const api = await fetch(URL);
  data = await api.json()
  // console.log(data)
}catch(e){
  console.log("error",e)
}
if(data.cod === 404){
  localStorage.removeItem("lastCity");
  window.location.reload();

}
  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
  } = data.list[0];
  const {list } = data;
  const {name, country}  = data.city;

  const { description, icon , id} = weather[0];
  return {
    id,
    description,
    iconUrl: makeIconUrl(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    country,
    name,
    list
  };
};

export { getFormattedWeatherData };
