import { useState, useEffect } from 'react'
import countryServices from '../services/countries.js'

const CountryDetails = (props) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        countryServices
            .getWeatherDatas(props.capital)
            .then(datas => {
                setWeather(datas)                
            })
    }, [])

    if(weather) {
        return (
            <div>
                <h1>{props.name}</h1>
                <div>capital {props.capital}</div>
                <div>area {props.area}</div>
                <h2>languages</h2>
                <ul>
                    {
                        props.languages.map(lang =>
                            <li key={lang}>{lang}</li>)
                    }
                </ul>
                <img src={props.flag} />
                <h2>weather in {props.capital}</h2>
                <p>temperature {weather.main.temp} °C</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                <p>wind {weather.wind.speed}</p>
            </div>
        )
    }
}

export default CountryDetails