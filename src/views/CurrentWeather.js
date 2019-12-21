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




    // return (
    //     <WeatherContext.Consumer>{context => {
    //         const {
    //             isReady,
    //             city, region, country_name, country, timezone,
    //             uom
    //         } = context
    //         let current, current_date, current_time, hour
    //         if (context.data) {
    //             current = context.data[0]
    //             current_date = Location.getDateByTimezone(timezone, "en-" + country)
    //             current_time = Location.getTimeByTimezone(timezone, "en-" + country)
    //             hour = parseInt(current_time.substr(0, current_time.indexOf(':')))
    //             hour = hour + (current_time.toLowerCase().indexOf('p') > -1 ? 12 : 0)
    //             if (parseInt(current_time.substr(0, current_time.indexOf(':'))) === 12)
    //                 hour = current_time.toLowerCase().indexOf('p') > -1 ? 12 : 0
    //         }
    //         if (!isReady) {
    //             return (
    //                 <div>Loading</div>
    //             )
    //         } else {
    //             return (
    //                 <div className="weather-current-container">
    //                     <div className={`column-grid weather-current${context.data ? ' flip-open' : ''}`}>
    //                         <div className="row-wrap">
    //                             <div className="col-12 s12">
    //                                 <p className="weather-current-date">{current_date}</p>
    //                                 <h1 className="weather-current-time">{current_time}</h1>
    //                                 <h1>{city}</h1>
    //                                 <h2>{region}, {country_name}</h2>
    //                                 <img className="weather-current-icon"
    //                                     src={current ? Weather.getIcon(current['weather']['code'], context.imagePath, hour > 6 && hour < 18) : ''} alt="" />
    //                                 <h1 className="weather-current-temp">{current ? Math.floor(current['temp']) : ''}
    //                                     <sup>{uom['temp']}</sup>
    //                                 </h1>
    //                                 <h2 className="weather-current-desc">{current ? current['weather']['description'] : ''}</h2>
    //                                 <h1 className="weather-current-feels">
    //                                     {current ? Math.floor(current['max_temp']) : ''}<sup>{uom['temp']}</sup>
    //                                     {current ? ' / ' + Math.floor(current['min_temp']) : ''}<sup>{uom['temp']}</sup>
    //                                 </h1>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             )
    //         }
    //     }}</WeatherContext.Consumer >
    // )
}