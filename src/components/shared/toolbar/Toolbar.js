import React from 'react';
import { motion } from 'framer-motion';
import './Toolbar.css';
// import UserIcon from '../../../assets/icons/user.svg'

const Toolbar = () => {
    const playerName = localStorage.getItem('playerName');
    const roomId = localStorage.getItem('roomId');
  return (
    <div className="grid-container">
      <div className="column">
        <div className="tooltip-container">
        <span className="user-span">
        {/* <img src={UserIcon} alt="User Icon" className="user-icon" /> */}
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
          <span>Column 2</span>
          <div className="tooltip">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;