import React from 'react'

export default function DayWeather({ data }) {
    if (data) {
        const {
            valid_date, icon, uom,
            temp, max_temp, min_temp,
            rh, precip, pres, uv, vis,
            wind_spd, wind_cdir_full,
            sunrise_ts, sunset_ts,
            moonrise_ts, moonset_ts
        } = data
        const date = valid_date.replace(/\./g, '').split(',')
        return (
            <div className="day-forecast">
                <ul className="info">
                    <li>{date[0]}<br />{date[1]}</li>
                    <li><img className="weather-current-icon" src={icon} alt="weather-icon" /></li>
                    <li>{Math.floor(temp)}<sup>{uom['temp']}</sup></li>
                    <li>feels like<br />{Math.floor(max_temp)}<sup>{uom['temp']}</sup> / {Math.floor(min_temp)}<sup>{uom['temp']}</sup></li>
                </ul>
                <div className="other-info">
                    <ul>
                        <li>Humidity: <span>{rh}</span></li>
                        <li>Pressure: <span>{pres}</span></li>
                        <li>Precipitation: <span>{precip}{uom['precip']}</span></li>
                        <li>UV Index: <span>{uv}</span></li>
                        <li>Visibility: <span>{vis}{uom['vis']}</span></li>
                        <li>Wind: <span>{wind_spd}{uom['wind']} {wind_cdir_full}</span></li>
                        <li style={{ paddingTop: '10px' }}>
                            Sun-Rise/Set:<br /><span style={{ color: 'yellow' }}>☀</span> <span>{sunrise_ts}<br />
                                <span style={{ color: 'orangered' }}>☀</span> {sunset_ts}</span>
                        </li>
                        <li style={{ paddingTop: '10px' }}>
                            Moon-Rise/Set:<br /><span style={{ color: 'yellow' }}>☽</span> <span>{moonrise_ts}<br />
                                <span style={{ color: 'orangered' }}>☾</span> {moonset_ts}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
    return null
}