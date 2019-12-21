import React from 'react'
import Droplet from '../assets/droplet.svg'

export default function Variations(props) {
    const { vis, pres, precip, uom } = props.data
    return (
        <div>
            <h6>Visibility</h6>
            <p>{vis}</p>
            <h6>Pressure</h6>
            <p>{pres}</p>
            <h6>Precipitation</h6>
            <div className="precipitation">
                <img src={Droplet} alt="droplet" />
                <p>{precip}<br /><span>{uom.precip}</span></p>
            </div>
        </div >
    )
}