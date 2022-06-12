import { useEffect, useState } from "react";

export const Weather = (props) => {
  const [lat, setLat] = useState();
  const [long, setLong] = useState();

  let weather;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      console.log("Longitude is :", position.coords.longitude);
    });   
  });

  switch (props.weatherInfo) {
    case 1:
      weather = "Clear Sky";
      break;
    case 2:
      weather = "Nearly clear sky";
      break;
    case 3:
      weather = "Variable cloudiness";
      break;
    case 4:
      weather = "Halfclear sky";
      break;
    case 5:
      weather = "Cloudy sky";
      break;
    case 6:
      weather = "Overcast";
      break;
    case 7:
      weather = "Fog";
      break;
    case 8:
      weather = "Light rain showers";
      break;
    case 9:
      weather = "Moderate rain showers";
      break;
    case 10:
      weather = "Heavy rain showers";
      break;
    case 11:
      weather = "Thunderstorm";
      break;
    case 12:
      weather = "Light sleet showers";
      break;
    case 13:
      weather = "Moderate sleet showers";
      break;
    case 14:
      weather = "Heavy sleet showers";
      break;
    case 15:
      weather = "Light snow showers";
      break;
    case 16:
      weather = "Moderate snow showers";
      break;
    case 17:
      weather = "Heavy snow showers";
      break;
    case 18:
      weather = "Light rain";
      break;
    case 19:
      weather = "Moderate rain";
      break;
    case 20:
      weather = "Heavy rain";
      break;
    case 21:
      weather = "Thunder";
      break;
    case 22:
      weather = "Light sleet";
      break;
    case 23:
      weather = "Moderate sleet";
      break;
    case 24:
      weather = "Heavy sleet";
      break;
    case 25:
      weather = "Light snowfall";
      break;
    case 26:
      weather = "Moderate snowfall";
      break;
    case 27:
      weather = "Heavy snowfall";
      break;
    default:
      text = "No weather data";
  }
 
  console.log(weather)


  return (
    <div>
      <p>Weather forecast = {weather}</p>
      <p>Latitude = {lat}</p>
      <p>Longitude = {long}</p>
    </div>
  );
};
