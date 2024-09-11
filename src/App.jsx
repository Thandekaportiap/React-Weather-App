import { useState } from 'react'
import TopButtons from './components/TopButtons'

import './App.css'
import Inputs from './components/Inputs'
import TimeAndLocalion from './components/TimeAndLocalion'
import Temp from './components/Temp'
import Forecast from './components/Forecast'
import getFormattedWeatherData from '../services/weather'

function App() {

  const [query, setQuery] = useState({q: 'london'});
  const [units, setUnits] = useState('metric')
  const [weather, setWeather ] = useState(null)
  
  const getWeather = async () => {
    const data = await getFormattedWeatherData( {q: "pietermaritzburg"});
   console.log(data)
  }

  getWeather();

  return (
    <>
   <div className='mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-cyan-400'>
   <TopButtons/>
   <Inputs/>
   <TimeAndLocalion/>
   <Temp/>
   <Forecast/>
   <Forecast/>
   </div>
    </>
  )
}

export default App
