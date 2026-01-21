import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleLatLongClick = async (e) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function success(position) {
        console.log(position)
        const { latitude, longitude } = position.coords
        setLatitude(latitude);
        setLongitude(longitude);
        /*
            const gotDataJson = await fetch('https://xxx.vercel.app/geolocation&#39;, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({latitude, longitude})
            }) */

      }, console.warn)
    }
  }

  return (
    <>
      <h1>Geolocation</h1>
      <div className="card">
        <button onClick={(e) => handleLatLongClick()}>
          Store geolocation
        </button>
        <ol>
          <li>Latitude: {latitude}</li>
          <li>Longitude: {longitude}</li>
        </ol>
      </div>
    </>
  )
}

export default App
