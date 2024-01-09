import axios from 'axios'

const baseUrl = `https://studies.cs.helsinki.fi/restcountries/api/all`
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather`

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getWeatherDatas = (city) => {
    const request = axios.get(`${weatherUrl}?q=${city}&appid=${import.meta.env.VITE_SOME_KEY}&units=metric`)
    return request.then(response => response.data)
}

export default { getAll, getWeatherDatas }