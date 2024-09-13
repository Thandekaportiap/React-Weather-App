import { useEffect, useState } from 'react'
import TopButtons from './components/TopButtons'

import './App.css'
import Inputs from './components/Inputs'
import TimeAndLocalion from './components/TimeAndLocalion'
import Temp from './components/Temp'
import Forecast from './components/Forecast'
import getFormattedWeatherData from '../services/weather'

function App() {

  const [query, setQuery] = useState({q: 'pietermaritzburg'});
  const [units, setUnits] = useState('metric')
  const [weather, setWeather ] = useState(null)
  
  const getWeather = async () => {
  await getFormattedWeatherData( { ...query, units }).then( (data) =>{
    setWeather(data);
  });
   console.log(data);
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

 const formatBackground = () => {
  if (!weather) return "from-cyan-400 to-blue-700";
  const threshold = units === "metric" ? 20 : 60;
  if (weather.temp <= threshold) return "from-cyan-400 to-blue-700";
  return "from-yellow-600 to-orange-700"
 };

  return (
    <>
   <div className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-cyan-400
    shadow-xl shadow-gray-500 ${formatBackground()}`}>
   <TopButtons setQuery={setQuery} />
   <Inputs setQuery={setQuery} setUnits={setUnits}  />
   { weather && (
    <>
     <TimeAndLocalion weather={weather}/>
   <Temp weather={weather}/>
   <Forecast title="3 hour step forecast" data={weather.hourly} />
   <Forecast title="daily forecast" data={weather.daily} />
    </>
   )
   }
  
   </div>
    </>
  )
}

export default App
