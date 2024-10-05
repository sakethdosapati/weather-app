import React, { useState } from 'react'
import "./App.css";

const App = () => {
  let api = {
    key: "54331c433e226b0bd0d4c7be4d41b3b4",
    url: "https://api.openweathermap.org/data/2.5/weather"
  };

  let [search, setSearch] = useState("");
  let [weather, setWeather] = useState({});
  let [found, setFound] = useState("");
  let [isloading, setIsLoading] = useState(false);

  function searchCity() {
    setIsLoading(true);
    fetch(`${api.url}?q=${search}&appid=${api.key}&units=metric`)
      .then(res => res.json())
      .then(val => {
        setWeather(val)
        if(val.name === undefined){
          setFound("City not found.Enter valid city name");
        } else{
          setFound("");
        }
        setIsLoading(false);
      }).catch(()=>{
        setSearch("Error in loading weather")
        setIsLoading(false);
      } )
      
  }

  function keyPressEnter(e) {
    if (e.key === 'Enter') {
      searchCity();
    }
  }

  return (
    <div id='app'>
      <h1>Weather App</h1>
      <input
        placeholder='Enter the City'
        type='text'
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={keyPressEnter} 
      />
      <button onClick={searchCity}>Search</button>
      <div>
        {isloading? "Loading..." : found}
        {weather.name && (
          <div id='result'>
            <p>Name: <strong>{weather.name}</strong></p>
            <p>Temperature: <strong>{weather.main.temp} °C</strong> </p>
          </div>
        )}
      </div>
    </div>
   
  );
}

export default App;
