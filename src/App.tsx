import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Unsubscribe from './components/Unsubscribe';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/unsubscribe" element={<Unsubscribe />} />
      </Routes>
    </Router>
  );
}

export default App;