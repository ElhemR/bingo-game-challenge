import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import StartPage from './components/StartPage';
import BingoComponent from './components/BingoComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/bingo/:roomId" element={<BingoComponent />} />
      </Routes>
    </Router>
  );
}



export default App;
