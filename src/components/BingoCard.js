import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

const BingoCard = ({ filledRows, filledColumns, bingo }) => {
  const [selectedSquares, setSelectedSquares] = useState([]);
  const [foundSquares, setFoundSquares] = useState([]);
  const [isWinner, setIsWinner] = useState(false);
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
    console.log(index)
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
        <div className="square">
        { index !=13 &&<div className="index">{index - 1 }</div>}
        <div className="square-component">
          {showBingo ? <BingoIcon conditionMet={isWinner} /> : <Component conditionMet={isWinner} />}
        </div>
  <div style={{width: "8vw"}}> <p className="square-text">{text} </p></div>
      </div>
    );
  }
  

  useEffect(() => {
    checkWinner();
  }, [selectedSquares]);

  useEffect(() => {
    console.log(foundSquares);
  }, [foundSquares]);


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

  const checkWinner = () => {
    const winningCombos = [
        [0, 5, 10, 15, 20],
        [0, 1, 2, 3, 4],
        [0,6,18,24],
      ];
    for(const combo of winningCombos) {
        if(combo.every((columnIndex) => selectedSquares.includes(columnIndex))){
            setIsWinner(true);
            setSelectedSquares([]);
            setFoundSquares([...foundSquares, ...combo]);
            console.log(combo);
                   // reset 
        }
    }
  };

  return (
      <div
        style={{
          display: 'grid',
          background: '#fff',
          padding: '10px',
          border:'1px solid',
          gridTemplateColumns: 'repeat(5, 2fr)',
          gap: '8px',
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
              background: selectedSquares.includes(index) ? 'lightblue' : '#eee' ,
              color: selectedSquares.includes(index) ? 'white' : 'black',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSquareClick(index)}
          >
      <div className="grid">

        {/* <Square key={id} text={text} component={component} /> */}
        <Square key={squaresData[index].id} text={squaresData[index].text} component={squaresData[index].component} index={squaresData[index].id} /> 
  
    </div>
            {/* Render the content of each Bingo card square */}
            {/* Use your own sentences here */}
            {/* {data[index]} {index }  */}
            {/* <div style={{width: "50px",height: "50px"}}>
            {squaresData[index].component}
      </div> */}


          </motion.div>
        ))}
          {isWinner && <h2>Winner!</h2>}
      </div>
    

  );
};

export default BingoCard