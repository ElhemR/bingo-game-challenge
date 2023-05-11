import React, { useContext, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

import './Toolbar.css';
import UserIcon from '../../../assets/icons/User.svg'
import { BingoContext,BingoProvider } from '../../../contexts/BingoContext'

const Toolbar = () => {
    const { score, updateScore } = useContext(BingoContext);
    const playerName = localStorage.getItem('playerName');
    const roomId = localStorage.getItem('roomId');
    const controls = useAnimation();
    useEffect(() => {
      if (score !== 0) {
        controls.start({
          scale: [1, 1.5, 1],
          color: ['#000000', '#ff8000', '#ffff00', '#00ff00', '#0000ff', '#8a2be2', '#ff00ff', '#000000'],
          transition: { duration: 0.5, repeat: 2 },
          textShadow: ['0px 0px 0px', '0px 0px 10px yellow', '0px 0px 0px'],
          rotate: [0, 360, 0],
        });
      }
    }, [score, controls]);
  
  return (
    <BingoProvider>
    <div className="grid-container">
      <div className="column">
        <div className="tooltip-container">
        <span className="user-span">
        <img src={UserIcon} alt="User Icon" className="user-icon" />
      <span className="user-name"> {playerName}</span>
    </span>
          <div className="tooltip">
        
          </div>
        </div>
      </div>
      <div className="column">
        <div  className="tooltip-container">
          <span>Room:</span> 
          <span className="user-name"> {roomId}</span>
          <div className="tooltip">
          </div>
        </div>
      </div>
      <div className="column">
        <div  className="tooltip-container">
          <span>BINGO!    <motion.span
        className="score"
        animate={controls}
      >
   {score}
      </motion.span> </span>
          <div className="tooltip">
          </div>
        </div>
      </div>
    </div>
    </BingoProvider>
  );
};

export default Toolbar;