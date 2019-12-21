import React from 'react'
import { Azimuth } from './../components/Gauges'

export default function Wind(props) {
    const { wind_dir, wind_cdir, wind_cdir_full, wind_gust_spd, wind_spd, uom } = props.data
    return (
        <div className="wind">
            <h2 className="title">Wind|Gust</h2>
            <div className="column-grid">
                <div className="row-wrap container">
                    <div className="col-12 xl2">
                        <p>Speed</p>
                        <h1>{Math.round(wind_spd * 100) / 100}</h1>
                        <p>{uom.wind}</p>
                        <p>{wind_cdir.toUpperCase()}</p>
                    </div>
                    <div className="col-12 xl8">
                        <Azimuth data={{
                            width: 150,
                            perc: 3,
                            rotation: wind_dir,
                            value: [wind_dir + '° ', wind_cdir_full],
                            stroke: 'red'
                        }} />
                    </div>
                    <div className="col-12 xl2">
                        <p>Gust</p>
                        <h1>{wind_gust_spd}</h1>
                        <p>{uom.wind}</p>
                        {/* <h6>Clouds</h6>
                        <p>{clouds}%</p> */}
                    </div>
                </div>
            </div>
        </div >
    )
}