import React from 'react'

export default function Switch(props) {
    const { uom, updateUom } = props.toggle
    return (
        <label className="switch">
            <input type="checkbox" onChange={updateUom} checked={uom} />
            <div className="toggle"></div>
        </label>
    )
}