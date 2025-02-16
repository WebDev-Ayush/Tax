import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import TaxPage from './Pages/TaxPage';
import HistoryPage from './Pages/HistoryPage';
import Result from './Pages/Result';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('https://tax-busj.onrender.com/')
      .then(response => setMessage(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<TaxPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}

export default App;

