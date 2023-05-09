import React from 'react';
import BingoCard from './components/BingoCard';

const App = () => {
  const filledRows = [0, 2, 4]; // Example filled rows
  const filledColumns = [1, 3]; // Example filled columns

  return (
    <div>
      <h1>Bingo Game</h1>
      <BingoCard filledRows={filledRows} filledColumns={filledColumns} />
    </div>
  );
};

export default App;