import Axios from "axios"

const API_KEY = process.env.REACT_APP_API_KEY

export default class Weather {

    static async getCurrentWeather({ latitude, longitude, uom = 'M' }) {
        return Axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${API_KEY}&units=${uom}`)
            .then(res => res.data['data'])
    }

    static getUnits(units = 'M') {
        let temp, vis, precip, wind
        switch (units) {
            case 'S':
                temp = '°K'
                vis = ''
                precip = 'in/hr'
                wind = 'm/s'
                break;
            case 'I':
                temp = '°F'
                vis = 'mi'
                precip = 'mm/hr'
                wind = 'mph'
                break;
            default:
                temp = '°C'
                vis = 'km'
                precip = 'mm/hr'
                wind = 'm/s'
        }
        return {
            units,
            temp,
            vis,
            precip,
            wind
        }
    }

    static getIcon(code, path, isDay = false) {
        return `${path.replace(/\/\//g, "/")}${isDay ? 'day' : 'night'}/${code}.svg`
    }

}