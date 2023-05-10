import React, { useState, useEffect } from 'react';

// Icons 
import EyeIcon from './animatedIcons/EyeIcon';
import EmailIcon from './animatedIcons/EmailIcon';
import LoaderIcon from './animatedIcons/LoaderIcon';
import LoaderCircleIcon from './animatedIcons/LoaderCircleIcon'
import WarningIcon from './animatedIcons/WarningIcon';
import MessageIcon from './animatedIcons/MessageIcon';
import NotificationIcon from './animatedIcons/NotificationIcon';
import UnmuteIcon from './animatedIcons/UnmuteIcon';
import VolumeUpIcon from './animatedIcons/VolumeUpIcon';
import ArrowRightIcon from './animatedIcons/ArrowRightIcon';
import TriangleAlertIcon from './animatedIcons/TriangleAlertIcon';
import SmileyIcon from './animatedIcons/SmileyIcon';
import MicrophoneIcon from './animatedIcons/MicrophoneIcon';
import MutedIcon from './animatedIcons/MutedIcon';
import RocketIcon from './animatedIcons/RocketIcon';
import UnlinkIcon from './animatedIcons/UnlinkIcon';
import ErrorIcon from './animatedIcons/ErrorIcon';
import LayersIcon from './animatedIcons/LayersIcon';
import ClockIcon from './animatedIcons/ClockIcon';
import PostBoxIcon from './animatedIcons/PostBoxIcon';
import ConnectionIcon from './animatedIcons/ConnectionIcon';
import SettingIcon from './animatedIcons/SettingIcon';
import DisplayIcon from './animatedIcons/DisplayIcon';
import HeartIcon from './animatedIcons/HeartIcon';
import BingoIcon from './animatedIcons/BingoIcon';


import './BingoCard.css';
import io from "socket.io-client";

import playerNames from '../data/randomPlayerNames.json';


const socket = io("https://puzzled-sparkly-sycamore.glitch.me:4000", { transports: ["websocket"] });


const generateRandomName = () => {
  const randomIndex = Math.floor(Math.random() * playerNames.length);
  return playerNames[randomIndex];
};


const BingoCard = ({ roomId, bingo }) => {
  const [selectedSquares, setSelectedSquares] = useState([]);
  const [foundSquares, setFoundSquares] = useState([]);
  const [isWinner, setIsWinner] = useState(false);
  const [score, setScore] = useState(0);

  const [winningCombinations, setWinningCombinations] = useState([]);

  useEffect(() => {
    debugger;
   
    localStorage.setItem("roomId",roomId);
   const name = generateRandomName();

    if(!localStorage.getItem("playerName")) {
      socket.emit("joinRoom", roomId, name);
      localStorage.setItem("playerName",name);
    }
    return () => {
    };
  }, []);

  useEffect(() => {
    // Listen for 'winningCombinations' event from the server
    socket.on('getRoomInfo', (combinations) => {
      // setWinningCombinations(combinations);
    });

    // Clean up event listeners
    return () => {
      socket.off('winningCombinations');
      // socket.disconnect();
    };
  }, [roomId]);



    // Connect to the server
 

  const squaresData = [
    { id: 1, text: 'Hi, who just joined?', component: EyeIcon},
    { id: 2, text: 'Can you email that to everyone?', component: EmailIcon },
    { id: 3, text: '____, are you there?', component: LoaderIcon } ,
    { id: 4, text: 'Uh, _______ you’re still sharing.', component: WarningIcon } ,
    { id: 5, text: 'Hey guys, I have to jump to another call.' , component: NotificationIcon },
    { id: 6, text: '(sound of someone typing, possibly with a hammer)' , component: MessageIcon },
    { id: 7, text: 'Hi, can you hear me?' , component: VolumeUpIcon },
    { id: 8, text: '(Loud, painful echo/feedback)' , component: UnmuteIcon },
    { id: 9, text: 'Next slide, please.' , component: ArrowRightIcon },
    { id: 10, text: 'Child or animal noise in the background.' , component: TriangleAlertIcon },
    { id: 11, text: 'Hello…, Hello?' , component: SmileyIcon },
    { id: 12, text: 'Can everyone go on mute?' , component: MicrophoneIcon },
    { id: 13, text: 'BINGO' , component: BingoIcon },
    { id: 14, text: 'I’m sorry, I was on mute.' , component: MutedIcon },
    { id: 15, text: 'Sorry, go ahead (for over-talkers).' , component: RocketIcon },
    { id: 16, text: 'I’m sorry, you cut out there.' , component: LoaderCircleIcon },
    { id: 17, text: 'Sorry, I did not find the conference Id.' , component: UnlinkIcon },
    { id: 18, text: 'I have a hard stop at ______.' , component: ErrorIcon },
    { id: 19, text: 'Can we take this offline?' , component: LayersIcon },
    { id: 20, text: 'Sorry, I’m late for (insert excuse).' , component: ClockIcon },
    { id: 21, text: 'I’ll have to get back to you.' , component: PostBoxIcon },
    { id: 22, text: 'Sorry, I was having connection issues.' , component: ConnectionIcon },
    { id: 23, text: 'I think there is a lag.' , component: SettingIcon },
    { id: 24, text: 'Can everyone see my screen?' , component: DisplayIcon },
    { id: 25, text: 'Sorry, I didn’t catch that. Can you repeat?' , component: HeartIcon },
  ];



  function Square({ index, text, component: Component }) {

    const [showBingo, setShowBingo] = useState(false);
    useEffect(() => {
 
        let timeout;
    
        if (isWinner) {
            setShowBingo(true);
        // Replace all icons with bingo confetti for two
          timeout = setTimeout(() => {
            setShowBingo(false);
            setIsWinner(false);
          
          }, 2000);
        }
    
        return () => {
          clearTimeout(timeout);
        };
      }, []);




    return (
<div className="grid-container-square">
  <div className="grid-item top-left">{showBingo ? <BingoIcon conditionMet={isWinner} /> : <Component conditionMet={isWinner} />}</div>
  <div className="grid-item top-right"> { index -1}</div>
</div>
    );
  }
  

  useEffect(() => {
    checkWinner();


  }, [selectedSquares]);

  const handleSquareClick = (index) => {
    if (index !== 12) {
      if (isWinner) setIsWinner(false);
      if (!selectedSquares.includes(index)) {
        setSelectedSquares([...selectedSquares, index]);
      } else {
        setSelectedSquares(selectedSquares.filter((squareIndex) => squareIndex !== index));
      }
    }
  };


socket.on('connect', () => {
  console.log('Connected to the server');
});

  const checkWinner = () => {
      if(bingo.bingo) {
        for(const combo of bingo.bingo) {
          if(combo.every((columnIndex) => selectedSquares.includes(columnIndex))){
              setIsWinner(true);
              setSelectedSquares([]);
              setFoundSquares([...foundSquares, ...combo]);
                     // reset 
          }
       }
      }
 
  };

  return (
    <>
    <div class="squaregrid" >
    {Array.from({ length: 25 }, (_, index) => (
          <div class="cell scale-on-hover" 
          style={{
            background: '#eee',
            borderRadius: '8px',
            padding: '8px',
            textAlign: 'center',
            background: foundSquares.includes(index) ? '#90EE90' : '#eee',
            cursor: index === 12 ? 'default' : 'pointer',
            background: selectedSquares.includes(index) ? 'lightblue' : '#eee',
            color: selectedSquares.includes(index) ? 'white' : 'black',

            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            wordYrap: 'break-word',
            whiteSpace: 'normal'
          }}
          onClick={() => handleSquareClick(index)}
          >
            <Square key={squaresData[index].id} text={squaresData[index].text} component={squaresData[index].component} index={squaresData[index].id} /> 
          <p className="content-text" style={{ textDecoration: foundSquares.includes(index)  ? 'line-through' : 'none' }} > {squaresData[index].text}</p>
          </div>
        ))}
  
</div>
      
    
      </>
  );
};

export default BingoCard