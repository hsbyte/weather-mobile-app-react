import React from 'react'
import Temperature from './../components/Temperature'
import { WeatherContext } from '../contexts/weather-context'
import { LevelMeter } from './../components/Gauges'
import Variations from './../components/Variations'
import Wind from './../components/Wind'

export default function CurrentWeatherDetails() {
    return (
        <WeatherContext.Consumer>{context => {
            if (context.data) {
                return (
                    <div className="current-weather-details" >
                        <Temperature data={{ ...(context.data[0]), uom: context.getUnits(context.uom) }} />
                        <ul className="gauges">
                            <li className="humidity">
                                <h6>Humidity</h6>
                                <LevelMeter level={context.data[0].rh} width={80} />
                            </li>
                            <li className="variations">
                                <Variations data={{ ...(context.data[0]), uom: context.getUnits(context.uom) }} />
                            </li>
                        </ul>
                        <Wind data={{ ...(context.data[0]), uom: context.getUnits(context.uom) }} />
                    </div>
                )
            }
        }}</WeatherContext.Consumer>
    )
} 