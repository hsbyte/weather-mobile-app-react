import React from 'react'
import { Cards } from './views/Cards'
import WeatherContextProvider from './contexts/weather-context'

function App() {
  const desktopStyle = {
    display: 'flex',
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
  return (
    <div className="App">
      <div className="desktop-only">
        <div style={desktopStyle}>
          <span>
            The App works on mobile device only<br />
            Visit <a href="https://github.com/hsbyte">github.com/hsbyte</a>
          </span>
        </div>
      </div>
      <div className="mobile-only">
        <WeatherContextProvider>
          <Cards />
        </WeatherContextProvider>
      </div>
    </div >
  )
}

export default App
