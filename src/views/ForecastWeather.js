import React from 'react'
import DayWeather from '../components/DayWeather'
import { WeatherContext } from '../contexts/weather-context'

export default function ForecastWeather() {
    const onClick = (e, index) => {
        e.preventDefault()
        const otherInfos = document.querySelector('.weather-forecast').getElementsByClassName('day')
        for (let i = 0; i < otherInfos.length; i++) {
            if (i !== index)
                otherInfos[i].querySelector('.other-info').classList.remove('expanded')
            else
                e.target.querySelector('.other-info').classList.toggle('expanded')
        }
    }

    return (
        <WeatherContext.Consumer>{context => {
            if (context.isReady) {
                return (
                    <div className="weather-forecast">
                        <h1>14-day Forecast</h1><br />
                        {context.data.map((dayForecast, index) => {
                            if (index === 0) {
                                return null
                            }
                            return (
                                <div className="day" id={`day-${index}`} onClick={e => onClick(e, index)} key={index}>
                                    <DayWeather
                                        data={{
                                            ...dayForecast,
                                            valid_date: context.getLocaleDate(new Date(`${dayForecast.valid_date}T12:00`), ['short', 'short']),
                                            sunrise_ts: context.get12HourTime(dayForecast.sunrise_ts),
                                            sunset_ts: context.get12HourTime(dayForecast.sunset_ts),
                                            moonrise_ts: context.get12HourTime(dayForecast.moonrise_ts),
                                            moonset_ts: context.get12HourTime(dayForecast.moonset_ts),
                                            uom: context.getUnits(context.uom),
                                            icon: context.getWeatherIcon(dayForecast['weather']['code'])
                                        }}
                                    />
                                </div>
                            )
                        })}
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