import React, { createContext, Component } from 'react'
import Location from '../controllers/location'
import Weather from '../controllers/weather'

const IMAGE_PATH = process.env.REACT_APP_IMAGE_PATH

export const WeatherContext = createContext()

class WeatherContextProvider extends Component {

    constructor(props) {
        super(props)
        this.state = {
            frequency: [
                { hours: 21600000, caption: '6 hours' },
                { hours: 43200000, caption: '12 hours' },
                { hours: 86400000, caption: 'One day' },
                { hours: -1, caption: 'Manual' }
            ],
            selectedFreq: 0
        }
    }

    getLocaleDate = (date = new Date(), options) => {
        return Location.getDateByTimezone(this.state.timezone, "en-" + this.state.country, date, options)
    }
    getLocaleTime = (date = new Date()) => {
        return Location.getTimeByTimezone(this.state.timezone, "en-" + this.state.country, date)
    }

    getWeatherIcon = code => {
        return Weather.getIcon(code, IMAGE_PATH, Location.isDay(this.getLocaleTime()))
    }

    getUnits = uom => Weather.getUnits(uom)

    updateUom = e => {
        e.preventDefault()
        const uom = this.state.uom === 'M' ? 'I' : 'M'
        localStorage.setItem('uom', uom)
        Weather.getCurrentWeather({ ...this.state, uom })
            .then(weather => this.setState({
                ...this.state,
                data: weather,
                uom
            }))
    }

    get12HourTime = utc => Location.get12HourTimeStamp(utc)

    componentDidMount() {
        if (localStorage.getItem('uom') === null)
            localStorage.setItem('uom', 'M')
        if (localStorage.getItem('selectedFreq') === null)
            localStorage.setItem('selectedFreq', -1)
        const uom = localStorage.getItem('uom')
        const selectedFreq = localStorage.getItem('selectedFreq')
        this.setState({
            ...this.state,
            isReady: false,
        })
        return Location.getCurrentLocationInfo()
            .then(res => {
                const [data, status] = res
                delete data['ip']
                delete data['org']
                data['uom'] = uom
                Location.getLocationImage(data.city)
                    .then(photos => {
                        Weather.getCurrentWeather(data)
                            .then(weather => this.setState({
                                ...this.state,
                                ...data,
                                ...photos,
                                data: weather,
                                status,
                                uom,
                                selectedFreq,
                                isReady: true
                            }))
                    })
            })
    }

    render() {
        return (
            <WeatherContext.Provider
                value={{
                    ...this.state,
                    getLocaleDate: this.getLocaleDate,
                    getLocaleTime: this.getLocaleTime,
                    getWeatherIcon: this.getWeatherIcon,
                    getUnits: this.getUnits,
                    updateUom: this.updateUom,
                    get12HourTime: this.get12HourTime
                }}
            >
                {this.props.children}
            </WeatherContext.Provider>
        )
    }
}
export default WeatherContextProvider