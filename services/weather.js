import { DateTime } from "luxon";

const API_KEY = 'cce1bc8b20e092363bf33c46e135378a'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType)
    url.search = new URLSearchParams({...searchParams, appid: API_KEY});

    return fetch(url)
    .then((res) => res.json());
};

const iconUrlFromCode = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (
    secs,
    offset,
    format = "cccc, dd lll yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs + offset, { zone: "utc"}).toFormat(format);

const formateCurrent = (data) => {
    console.log(data)
 const {
    coord: {lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name, dt, sys: {country, sunrise, sunset},
    weather,
    wind: { speed },
    timezone,
 }  = data;

const { main: details, icon } = weather[0]
const formattedLocalTime = formatToLocalTime(dt, timezone)

 return {
    temp, feels_like, temp_min, temp_max, humidity, name, country,
     sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
     sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
     speed,
     details,
     icon: iconUrlFromCode(icon),
     formattedLocalTime,
     dt,
     timezone,
     lat,
     lon
 };
};

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams)
    .then(formateCurrent)

    const {dt, lat, lon, timezone} = formattedCurrentWeather

    return { ...formattedCurrentWeather };
}

export default getFormattedWeatherData;

