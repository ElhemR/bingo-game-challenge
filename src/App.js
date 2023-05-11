import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import StartPage from './components/StartPage';
import BingoComponent from './components/BingoComponent';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from './redux/store';


function App() {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}>
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/bingo/:roomId" element={<BingoComponent />} />
      </Routes>
    </Router>
    </PersistGate>
    </Provider>
  );
}



export default App;
