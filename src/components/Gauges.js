import React from 'react'

export const Azimuth = props => {
    const { width = 100, perc = 0, value, rotation = 0, strokeWidth = 2, strokeBg = '#777', stroke = 'red' } = props.data
    return (
        <div className="azimuth" style={{ width: `${width}px` }}>
            <svg viewBox="0 0 36 36">
                <path
                    stroke={strokeBg}
                    strokeWidth={strokeWidth}
                    fill="none"
                    d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path className="circle"
                    style={{transformOrigin: '50% 50%', transform: 'rotate(' + rotation.toString().trim() + 'deg)'}}
                    strokeDasharray={`${perc}, 100`}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    fill="none"
                    d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="10.35" fill="#fff" textAnchor="middle">
                    {value.map((elem, i) => (<tspan key={i} x="18" dy="1.2em" fontSize={i === 0 ? '.5em' : '.2em'}>{elem}</tspan>))}
                </text>
            </svg>
        </div>

    )
}
export const LevelMeter = ({ width = 40, level = 100, uom = '%' }) => {
    const
        mask = {
            stroke: 'none',
            fill: 'url(#grad)',
            mask: 'url(#mask)'
        },
        fill = {
            stroke: 'none',
            fill: '#fff',
            width: '100%',
            height: `${.08 * 1.95 * width}px`
        },
        redStopColor = {
            'stopColor': 'rgb(255, 0, 0)',
        },
        yellowStopColor = {
            'stopColor': 'rgb(255, 255, 0)',
        },
        oliveStopColor = {
            'stopColor': 'rgb(173, 255, 47)',
        },
        greenStopColor = {
            'stopColor': 'rgb(42, 201, 64)',
        }
    return (
        <svg viewBox={`0 0 ${width} ${1.95 * width}`}>
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={redStopColor} />
                    <stop offset="20%" style={yellowStopColor} />
                    <stop offset="40%" style={oliveStopColor} />
                    <stop offset="100%" style={greenStopColor} />
                </linearGradient>
                <mask id="mask">
                    <rect y="0" style={fill} />
                    <rect y="10%" style={fill} />
                    <rect y="20%" style={fill} />
                    <rect y="30%" style={fill} />
                    <rect y="40%" style={fill} />
                    <rect y="50%" style={fill} />
                    <rect y="60%" style={fill} />
                    <rect y="70%" style={fill} />
                    <rect y="80%" style={fill} />
                    <rect y="90%" style={fill} />
                </mask>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" style={mask} />
            <rect x="0" y={`-${level}%`} width="100%" height="100%" fill="rgb(109,109,109)" style={{ mask: 'url(#mask)' }} />
            <circle cx="50%" cy="50%" r="25%" stroke="rgba(128,128,128,.9)" strokeWidth={.03 * 1.95 * width} fill="rgb(51,51,51)" />
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white">{level}{uom}</text>
        </svg>
    )
}