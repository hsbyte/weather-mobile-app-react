import React, { useState } from 'react'
import Switch from '../components/Switch'
import { WeatherContext } from '../contexts/weather-context'

const APP_VERSION = process.env.REACT_APP_VERSION

export default function Settings() {
    const freq = localStorage.getItem('selectedFreq')
    const [selectedFreq, setSelectedFreq] = useState(freq ? parseInt(freq) : 0)
    const onClick = e => {
        if (e.target.classList.value)
            e.target.querySelector('.contents').classList.toggle('expanded')
    }
    const onChange = e => {
        const value = e.target.value
        setSelectedFreq(value)
        localStorage.setItem('selectedFreq', value)
    }
    return (
        <WeatherContext.Consumer>{context => {
            if (context.isReady) {
                const { uom, frequency } = context
                return (
                    <div className="settings">
                        <div className="title">
                            <h1>Settings</h1>
                        </div>
                        <ul>
                            <li>
                                Unit of Measure: <span>{uom === 'M' ? 'Metric' : 'Imperial'}</span>
                                <Switch toggle={{ uom: uom === 'M', updateUom: context.updateUom }} />
                            </li>
                            <li className="update-frequency" onClick={onClick}>
                                Select update frequency
                                <ul className="contents">
                                    {frequency.map(elem => (
                                        <li key={elem.hours}>
                                            {elem.caption}
                                            <input type="radio" name="frequency"
                                                value={elem.hours}
                                                onChange={onChange} checked={elem.hours === parseInt(selectedFreq)} />
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                        <div className="sub-title">
                            <h2>Weather Mobile App</h2>
                        </div>
                        <ul>
                            <li className="about" onClick={onClick}>
                                About the App
                                <div className="contents">
                                    <p>Displays weather condition updates for user's current location. Easy navigation to current weather observation details and forecast information using swipe gesture controls.</p>
                                    <span><br />Released under the <a href="http://opensource.org/licenses/MIT">MIT licence.</a></span>
                                </div>
                            </li>
                            <li className="contact" onClick={onClick}>
                                Contact Information
                                <div className="contents">
                                    <p>Author: Arnold Haban</p>
                                    <span><a href="https://github.com/hsbyte">https://github.com/hsbyte</a></span>
                                </div>
                            </li>
                        </ul>
                        <div className="sub-title">
                            <p>QR Code link to the weather application</p>
                        </div>
                        <div className="qr-code">
                            <img src="/assets/images/qr-code.png" alt="qr-code" />
                            <h3>The Weather Mobile App</h3>
                            <p>Vers. {APP_VERSION}</p>
                        </div>
                        <div className="sub-title">
                            <p>Reset and initialize application settings and storage</p>
                        </div>
                        <ul className="reset">
                            <li onClick={() => localStorage.clear()}>Reset Now</li>
                        </ul>
                    </div>
                )
            } else {
                return (
                    <div>Loading</div>
                )
            }
        }}</WeatherContext.Consumer >
    )
}