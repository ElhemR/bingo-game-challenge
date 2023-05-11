import React, { createContext, useState, useEffect } from 'react';

// Create the BingoContext
export const BingoContext = createContext();

// Create the BingoProvider
export const BingoProvider = ({ children }) => {
    const [bingoArray, setBingoArray] = useState([]);
    const [score, setScore] = useState(0);
  
    // Function to update the bingoArray
    const updateBingoArray = (newArray) => {
      setBingoArray(newArray);
    };
  
    // Function to update the score
    const updateScore = (newScore) => {
      setScore(newScore);
    };
  
    // Load state from local storage on component mount
    useEffect(() => {
      const storedBingoArray = localStorage.getItem('bingoArray');
      const storedScore = localStorage.getItem('score');
  
      if (storedBingoArray) {
        setBingoArray(JSON.parse(storedBingoArray));
      }
  
      if (storedScore) {
        setScore(parseInt(storedScore));
      }
    }, []);
  
    // Save state to local storage whenever it changes
    useEffect(() => {
      localStorage.setItem('bingoArray', JSON.stringify(bingoArray));
    }, [bingoArray]);
  
    useEffect(() => {
      localStorage.setItem('score', score);
    }, [score]);
  
    return (
      <BingoContext.Provider value={{ bingoArray, score, updateBingoArray, updateScore }}>
        {children}
      </BingoContext.Provider>
    );
};
