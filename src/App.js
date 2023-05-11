import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import StartPage from './components/StartPage';
import BingoComponent from './components/BingoComponent';
import { BingoProvider } from './contexts/BingoContext';
function App() {
  return (
    <BingoProvider> 
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/bingo/:roomId" element={<BingoComponent />} />
      </Routes>
    </Router>
    </BingoProvider>
  );
}



export default App;
