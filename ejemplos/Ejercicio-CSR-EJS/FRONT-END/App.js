import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './components/Index';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </Router>
  );
};

export default App;

import React, { useEffect, useState } from 'react';

const Index = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/endpoint')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Datos del Backend</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
                             
