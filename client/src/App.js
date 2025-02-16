import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('https://tax-busj.onrender.com/')
      .then(response => setMessage(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Full Stack App</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;

