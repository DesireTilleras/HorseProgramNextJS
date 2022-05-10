import { useEffect, useState } from "react";
import axios from "axios";

export const Weather = () => {
  const [lat, setLat] = useState();
  const [long, setLong] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  });

  useEffect(() => {




    // axios
    //   .get(apiUrl, { headers: { "Access-Control-Allow-Origin": "*" ,withCredentials: false,} })
    //   .then((repos) => {
    //     const allRepos = repos.data;
    //     console.log(allRepos);
    //   });
  });   

  return (
    <div>
      <p>{lat}</p>
      <p>{long}</p>
    </div>
  );
};
