import React, { useState, useEffect, useLayoutEffect } from 'react'
import CurrentWeather from './CurrentWeather'
import CurrentWeatherDetails from './CurrentWeatherDetails'
import ForecastWeather from './ForecastWeather'
import Settings from './Settings'
import { WeatherContext } from '../contexts/weather-context'

export const Cards = () => {
    const [cardDecks] = useState([
        <CurrentWeather />,
        <CurrentWeatherDetails />,
        <ForecastWeather />,
        <Settings />
    ])
    const [initialize, setInitialize] = useState(false)

    const initSlideIndex = () => {
        if (!initialize) {
            cardDecks.map((elem, index) => {
                if (document.querySelector(`#slide-inner-${index}`).offsetHeight !== null)
                    if (document.querySelector(`#slide-inner-${index}`).offsetHeight - 1 > window.screen.height)
                        document.querySelector(`#slide-${index}`).style.overflow = 'auto'
                return elem
            })
            setInitialize(true)
        }
    }

    const setCardsStore = payload => {
        sessionStorage.setItem('cards', JSON.stringify({
            ...(getCardsStore()),
            ...payload
        }))
    }

    const getCardsStore = () => {
        const data = JSON.parse(sessionStorage.getItem('cards'))
        return (!data) ? {} : data
    }

    const handleTouchStart = e => {
        e.persist()
        const animate = document.querySelector('.animate')
        if (animate)
            animate.className.replace('/\banimate\b/g', '')
        setCardsStore({
            touchStartX: e.touches[0].pageX,
            slideWidth: document.querySelector('#slider').offsetWidth
        })
    }

    const handleTouchMove = e => {
        e.persist()
        let { touchStartX, touchMoveX, index, moveXCoordinate, slideWidth } = getCardsStore()
        touchMoveX = e.touches[0].pageX
        moveXCoordinate = index * slideWidth + (touchStartX - touchMoveX)
        if (index < cardDecks.length - 1)
            document.querySelector('.card-holder').style.transform = `translate3d(-${moveXCoordinate}px, 0, 0)`
        setCardsStore({
            touchMoveX,
            moveXCoordinate
        })
    }

    const handleTouchEnd = e => {
        e.persist()
        let { index, slideWidth, moveXCoordinate } = getCardsStore()
        if (Math.abs(index * slideWidth - moveXCoordinate) > slideWidth / 2) {
            if (moveXCoordinate > index * slideWidth && index < cardDecks.length - 1)
                ++index
            else if (moveXCoordinate < index * slideWidth && index > 0)
                --index
        }
        if (index > cardDecks.length) {
            index = cardDecks.length
        } else {
            const cardHolder = document.querySelector('.card-holder')
            cardHolder.classList.add("animate")
            cardHolder.style.transform = `translate3d(-${index * slideWidth}px, 0, 0)`
        }
        setCardsStore({ index })
    }

    useEffect(() => {
        setCardsStore({
            index: 0,
            moveXCoordinate: 0
        })
    })

    useLayoutEffect(() => {
        window.addEventListener('resize', () => {
            setCardsStore({ slideWidth: document.querySelector('#slider').offsetWidth })
            const { slideWidth } = getCardsStore()
            document.querySelector('.card-holder').style.transform = `translate3d(-${slideWidth}px, 0, 0)`
        })
        window.addEventListener('wheel', () => initSlideIndex())
        window.addEventListener('mousemove', () => initSlideIndex())
        window.addEventListener('touchstart', () => initSlideIndex())
    })

    return (
        <WeatherContext.Consumer>{context => {
            if (context.isReady) {
                const { mobile } = context.photos
                return (
                    <div className="wrapper">
                        <div className="hero" style={{ backgroundImage: `url(${mobile})` }}></div>
                        <div className="backdrop"></div>
                        <div className="slider" id="slider">
                            <div className="card-holder" style={{ width: `${cardDecks.length * 100}%` }}>
                                {cardDecks.map((deck, index) => {
                                    return (
                                        <div className="slide-wrapper"
                                            id={`slide-${index}`}
                                            style={{ width: `${100 / cardDecks.length}%` }}
                                            key={index}
                                            onTouchStart={handleTouchStart}
                                            onTouchMove={handleTouchMove}
                                            onTouchEnd={handleTouchEnd}
                                        >
                                            <div className="slide-inner" id={`slide-inner-${index}`}>{deck}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
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