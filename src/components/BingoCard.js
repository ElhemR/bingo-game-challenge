import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BingoCard = ({ filledRows, filledColumns }) => {
  const [selectedSquares, setSelectedSquares] = useState([]);
  const [isWinner, setIsWinner] = useState(false);

  useEffect(() => {
    checkWinner();
  }, [selectedSquares]);

  const handleSquareClick = (index) => {
    if (index !== 12) {
      if (!selectedSquares.includes(index)) {
        setSelectedSquares([...selectedSquares, index]);
      } else {
        setSelectedSquares(selectedSquares.filter((squareIndex) => squareIndex !== index));
      }
    }
  };

  const checkWinner = () => {
    const rowWin = [0, 5, 10, 15, 20];
    const columnWin = [0, 1, 2, 3, 4];

    // Check if all selected squares are in a row or a column
    const isRowWin = rowWin.every((rowIndex) => selectedSquares.includes(rowIndex));
    const isColumnWin = columnWin.every((columnIndex) => selectedSquares.includes(columnIndex));

    if (isRowWin || isColumnWin) {
      setIsWinner(true);
    } else {
      setIsWinner(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background: '#fff',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        width: '400px',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '8px',
          height: '100%',
        }}
      >
        {/* Render the Bingo card squares */}
        {Array.from({ length: 25 }, (_, index) => (
          <motion.div
            key={index}
            style={{
              background: '#eee',
              borderRadius: '4px',
              padding: '8px',
              textAlign: 'center',
              // Add additional styles for filled rows and columns
              background: filledRows.includes(Math.floor(index / 5)) || filledColumns.includes(index % 5) ? 'lightgreen' : '#eee',
              cursor: index === 12 ? 'default' : 'pointer',
              // Add styling for selected squares
              background: selectedSquares.includes(index) ? 'lightblue' : '#eee',
              color: selectedSquares.includes(index) ? 'white' : 'black',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSquareClick(index)}
          >
            {/* Render the content of each Bingo card square */}
            {/* Use your own sentences here */}
            Square {index + 1}
          </motion.div>
        ))}
      </div>
      {isWinner && <h2>Winner!</h2>}
    </motion.div>
  );
};

export default BingoCard