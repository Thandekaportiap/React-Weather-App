import { useEffect, useState } from 'react'
import TopButtons from './components/TopButtons'

import './App.css'
import Inputs from './components/Inputs'
import TimeAndLocalion from './components/TimeAndLocalion'
import Temp from './components/Temp'
import Forecast from './components/Forecast'
import getFormattedWeatherData from '../services/weather'

const coldBackground = require('./assets/cold.jpg');   
const warmBackground = require('./assets/sun2.jpeg');   
const defaultBackground = require('./assets/default.avif');   

function App() {

  const [query, setQuery] = useState({q: 'pietermaritzburg'});
  const [units, setUnits] = useState('metric')
  const [weather, setWeather ] = useState(null)
  
  const getWeather = async () => {
  await getFormattedWeatherData( { ...query, units }).then( (data) =>{
    setWeather(data);
  });
  //  console.log(data);
  };

  useEffect(() => {
    getWeather()
  }, [query, units]);


const getBackgroundImage = () => {
  if (!weather) return defaultBackground; 

  const threshold = units === "metric" ? 20 : 60;
  if (weather.temp <= threshold) return coldBackground; 
  return warmBackground; 
};

  return (
    <>
   <div 
      style={{ 
        backgroundImage: `url(${getBackgroundImage()})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center'
      }} 
      className="mx-auto max-w-screen-lg mt-4 py-5 px-32 text-white shadow-xl shadow-gray-500"
    >
   <TopButtons setQuery={setQuery} />
   <Inputs setQuery={setQuery} setUnits={setUnits}  />
   { weather && (
    <>
     <TimeAndLocalion weather={weather}/>
   <Temp weather={weather}/>
   <Forecast title="3 hour step forecast" data={weather.hourly} />
   <Forecast title="daily forecast" data={weather.daily} />
   <h2 className='mt-4 items-center justify-items-center'>Coded By Thandeka Portia P Mazibuko</h2>
    </>
   )
   }
  
   </div>
    </>
  )
}

export default App
