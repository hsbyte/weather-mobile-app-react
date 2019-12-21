import Axios from 'axios'

export default class Location {

    static async getCurrentLocationInfo() {
        return await Axios.get('https://ipapi.co/json/')
            .then(res => [res.data, res.status])
            .catch(error => [null, error.response.status])
    }

    static async getLocationImage(city) {
        return await Axios.get(`https://api.teleport.org/api/urban_areas/slug:${city.toLowerCase().replace(' ', '-')}/images/`)
            .then(({ data }) => ({ photos: (data['photos'][0]['image']) }))
            .catch(error => [null, error.response.status])
    }

    static isDay(time) {
        let hour = parseInt(time.substr(0, time.indexOf(':')))
        hour = hour + (time.toLowerCase().indexOf('p') > -1 ? 12 : 0)
        if (parseInt(time.substr(0, time.indexOf(':'))) === 12)
            hour = time.toLowerCase().indexOf('p') > -1 ? 12 : 0
        return (hour > 6 && hour < 18)
    }

    static getTimeByTimezone(timezone, lang, date) {
        return date.toLocaleTimeString(
            lang,
            {
                formatMatcher: 'best fit',
                timeZone: timezone,
                hour: 'numeric',
                minute: 'numeric'
            }
        )
    }

    static getDateByTimezone(timezone, lang, date, options = []) {
        const [weekday = 'long', month = 'long'] = options
        return date.toLocaleDateString(
            lang,
            {
                weekday,
                month,
                day: 'numeric',
                year: 'numeric',
                timeZone: timezone
            }
        )
    }

    static get12HourTimeStamp(utc = 0) {
        const date = new Date(utc * 1000);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours % 12 ? hours % 12 : 12}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'pm' : 'am'}`
    }
}