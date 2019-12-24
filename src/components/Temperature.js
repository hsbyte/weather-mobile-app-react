import React from 'react'

export default function Temperature(props) {
    const { temp, max_temp, min_temp, high_temp, low_temp, dewpt, uom } = props.data
    return (
        <div className="temperature">
            <h2 className="title">Temperature °C</h2>
            <div className="column-grid container">
                <div className="row-wrap">
                    <div className="col-12 xl6">
                        <p>{parseInt(max_temp)}° | {parseInt(min_temp)}°</p>
                        <h1>{parseInt(temp)}°</h1>
                    </div>
                    <div className="col-12 xl3">
                        <h6>Max Temp</h6>
                        <p>{high_temp}{uom['temp']}</p>
                        <h6>Min Temp</h6>
                        <p>{low_temp}{uom['temp']}</p>
                    </div>
                    <div className="col-12 xl3">
                        <h6>Dew Point</h6>
                        <p>{dewpt}{uom['temp']}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}