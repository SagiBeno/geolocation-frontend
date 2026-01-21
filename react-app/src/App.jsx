import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [testMessage, setTestMessage] = useState( {message: ''} );

  useEffect(() => {
    (async () => {
      try {
        const gotTestMessageJson = await fetch('https://geolocation-backend-five.vercel.app/hello');
        console.log('gotTestMessageJson:', gotTestMessageJson);
        const gotTestMessage = await gotTestMessageJson.json();
        console.log('gotTestMessage:', gotTestMessage);
        setTestMessage(gotTestMessage);
      } catch (error) {
        console.warn(error);
      }
      
    }) ();
  }, []);

  const handleLatLongClick = async (e) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function success(position) {
        const { latitude, longitude } = position.coords
        setLatitude(latitude);
        setLongitude(longitude);

        const gotDataJson = await fetch('https://geolocation-backend-five.vercel.app/geolocation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({latitude, longitude})
        });

        console.log(gotDataJson)

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

      {
        testMessage.message.trim().length > 0 &&
          <div className='card'>
            <p>Test message: {testMessage.message}</p>
          </div>
      }
      
    </>
  )
}

export default App
