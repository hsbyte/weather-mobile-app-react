import React, { useState, useEffect } from 'react'
import { WeatherContext } from '../contexts/weather-context'

export default function CurrentWeather() {
    const [reload, setReload] = useState(false)

    useEffect(() => {
        const freq = localStorage.getItem('selectedFreq')
        if (parseInt(freq) > 0)
            setInterval(() => { setReload(!reload) }, parseInt(freq))
        else
            clearInterval()
    })

    return (
        <WeatherContext.Consumer>{context => {
            if (context.isReady) {
                const { city, region, country_name, uom } = context
                const current = context.data[0]
                return (
                    <div className="weather-current-container">
                        <div className="column-grid weather-current flip-open">
                            <div className="row-wrap">
                                <div className="col-12 s12">
                                    <p className="weather-current-date">{context.getLocaleDate()}</p>
                                    <h1 className="weather-current-time">{context.getLocaleTime()}</h1>
                                    <h1>{city}</h1>
                                    <h2>{region}, {country_name}</h2>
                                    <img className="weather-current-icon" src={context.getWeatherIcon(current['weather']['code'])} alt="weather-icon" />
                                    <h1 className="weather-current-temp">{parseInt(current['temp'])}
                                        <sup>{context.getUnits(uom)['temp']}</sup>
                                    </h1>
                                    <h2 className="weather-current-desc">{current['weather']['description']}</h2>
                                    <h1 className="weather-current-feels">
                                        {parseInt(current['max_temp'])}<sup>{context.getUnits(uom)['temp']}</sup>
                                        {' / ' + parseInt(current['min_temp'])}<sup>{context.getUnits(uom)['temp']}</sup>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div>Loading</div>
                )
            }
        }}</WeatherContext.Consumer>
    )
}