import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
// Icons
import EyeIcon from "./animatedIcons/EyeIcon";
import EmailIcon from "./animatedIcons/EmailIcon";
import LoaderIcon from "./animatedIcons/LoaderIcon";
import LoaderCircleIcon from "./animatedIcons/LoaderCircleIcon";
import WarningIcon from "./animatedIcons/WarningIcon";
import MessageIcon from "./animatedIcons/MessageIcon";
import NotificationIcon from "./animatedIcons/NotificationIcon";
import UnmuteIcon from "./animatedIcons/UnmuteIcon";
import VolumeUpIcon from "./animatedIcons/VolumeUpIcon";
import ArrowRightIcon from "./animatedIcons/ArrowRightIcon";
import TriangleAlertIcon from "./animatedIcons/TriangleAlertIcon";
import SmileyIcon from "./animatedIcons/SmileyIcon";
import MicrophoneIcon from "./animatedIcons/MicrophoneIcon";
import MutedIcon from "./animatedIcons/MutedIcon";
import RocketIcon from "./animatedIcons/RocketIcon";
import UnlinkIcon from "./animatedIcons/UnlinkIcon";
import ErrorIcon from "./animatedIcons/ErrorIcon";
import LayersIcon from "./animatedIcons/LayersIcon";
import ClockIcon from "./animatedIcons/ClockIcon";
import PostBoxIcon from "./animatedIcons/PostBoxIcon";
import ConnectionIcon from "./animatedIcons/ConnectionIcon";
import SettingIcon from "./animatedIcons/SettingIcon";
import DisplayIcon from "./animatedIcons/DisplayIcon";
import HeartIcon from "./animatedIcons/HeartIcon";
import BingoIcon from "./animatedIcons/BingoIcon";

import "./BingoCard.css";

import playerNames from "../data/randomPlayerNames.json";


const generateRandomName = () => {
  const randomIndex = Math.floor(Math.random() * playerNames.length);
  return playerNames[randomIndex];
};

const BingoCard = ({ roomId }) => {
  const [selectedSquares, setSelectedSquares] = useState(   JSON.parse(localStorage.getItem("squaresContent")) || []);
  const [foundSquares, setFoundSquares] = useState([]);
  const [isWinner, setIsWinner] = useState(false);
  const [squaresContent, setSquaresContent] = useState([]);
  const dispatch = useDispatch();
  const fixedCard = { text: "BINGO", component: BingoIcon };
  const cards = [
    { key: "EyeIcon", text: "Hi, who just joined?", component: EyeIcon },
    { key: "EmailIcon", text: "Can you email that to everyone?", component: EmailIcon },
    { key: "LoaderIcon", text: "____, are you there?", component: LoaderIcon },
    { key: "WarningIcon", text: "Uh, _______ you’re still sharing.", component: WarningIcon },
    { key: "NotificationIcon", text: "Hey guys, I have to jump to another call.", component: NotificationIcon },
    { key: "MessageIcon", text: "(sound of someone typing)", component: MessageIcon },
    { key: "VolumeUpIcon", text: "Hi, can you hear me?", component: VolumeUpIcon },
    { key: "UnmuteIcon", text: "(Loud, painful echo/feedback)", component: UnmuteIcon },
    { key: "ArrowRightIcon", text: "Next slide, please.", component: ArrowRightIcon },
    { key: "TriangleAlertIcon", text: "Child or animal noise in the background.", component: TriangleAlertIcon },
    { key: "SmileyIcon", text: "Hello…, Hello?", component: SmileyIcon },
    { key: "MicrophoneIcon", text: "Can everyone go on mute?", component: MicrophoneIcon },
    { key: "MutedIcon", text: "I’m sorry, I was on mute.", component: MutedIcon },
    { key: "RocketIcon", text: "Sorry, go ahead (for over-talkers).", component: RocketIcon },
    { key: "LoaderCircleIcon", text: "I’m sorry, you cut out there.", component: LoaderCircleIcon },
    { key: "UnlinkIcon", text: "Sorry, I did not find the conference Id.", component: UnlinkIcon },
    { key: "ErrorIcon", text: "I have a hard stop at ______.", component: ErrorIcon },
    { key: "LayersIcon", text: "Can we take this offline?", component: LayersIcon },
    { key: "ClockIcon", text: "Sorry, I’m late for (insert excuse).", component: ClockIcon },
    { key: "PostBoxIcon", text: "I’ll have to get back to you.", component: PostBoxIcon },
    { key: "ConnectionIcon", text: "Sorry, connection issues.", component: ConnectionIcon },
    { key: "SettingIcon", text: "I think there is a lag.", component: SettingIcon },
    { key: "DisplayIcon", text: "Can everyone see my screen?", component: DisplayIcon },
    { key: "HeartIcon", text: "Sorry, I didn’t catch that. Can you repeat?", component: HeartIcon },
    { key: "EyeIcon", text: "Hi, who just joined?", component: EyeIcon },
  ];
  

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }



  

  useEffect(() => {
  
    localStorage.setItem("roomId", roomId);
    dispatch({ type: 'SET_ROOM_ID', payload: roomId });
    const name = generateRandomName();
 

    if (!localStorage.getItem("playerName")) {
      dispatch({ type: 'SET_PLAYER_NAME', payload: name });
      localStorage.setItem("playerName", name);
    }
  
    if(!localStorage.getItem("squaresContent")) {
    // Shuffle the filtered cards array
    const shuffledCards = shuffleArray(cards.slice());
  
    // Create the array of objects
    const arrayObjects = shuffledCards.map((card, index) => {
      return {
        index: index,
        card: index === 12 ? fixedCard : card,
      };
    });
  
    setSquaresContent(arrayObjects);
    localStorage.setItem("squaresContent",JSON.stringify(arrayObjects))
    }
    else {

      setSquaresContent(JSON.parse(localStorage.getItem("squaresContent")));
    }
 

  
    return () => {};
  }, []);

  useEffect(() => {
    const playerName = localStorage.getItem("playerName");
    const roomId = localStorage.getItem("roomId");
    const score = foundSquares.length;
    const data = { playerName, score, roomId };

  }, [foundSquares]);

  // squaresData = shuffledSquaresData;
  function Square({ index, keyComponent, card, component: Component }) {

    const iconKey= card.key;

    const foundCard = cards.find(card => card.key === iconKey);
  
    // If the component is found, render it
    const FoundComponent = foundCard ? foundCard.component : null; 


    const [showBingo, setShowBingo] = useState(false);
    useEffect(() => {
      let timeout;

      if (isWinner) {
        setShowBingo(true);
        // Replace all icons with bingo confetti for two
        timeout = setTimeout(() => {
          setShowBingo(false);
          setIsWinner(false);
        }, 1600);
      }

      return () => {
        clearTimeout(timeout);
      };
    }, []);

    return (
      <div className="grid-container-square">
        <div className="grid-item top-left">
        {showBingo ? (
  <BingoIcon conditionMet={isWinner} />
) : (
  FoundComponent && <FoundComponent conditionMet={isWinner} />
)}
        </div>
        <div className="grid-item top-right"> {index}</div>
      </div>
    );
  }

  useEffect(() => {
    checkWinner();
  }, [selectedSquares]);

  const handleSquareClick = (index) => {
    debugger;
    if (index !== 12) {
      if (isWinner) setIsWinner(false);
      if (!selectedSquares.includes(index)) {
        setSelectedSquares([...selectedSquares, index]);
      } else {
        setSelectedSquares(
          selectedSquares.filter((squareIndex) => squareIndex !== index)
        );
      }
    }
  };

  const checkWinner = () => {
    const winningCombinations = [
      // Rows
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      // Columns
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      // Diagonals
      [0, 6, 18, 24],
      [4, 8, 16, 20],
    ];

    for (const combo of winningCombinations) {
      if (combo.every((columnIndex) => selectedSquares.includes(columnIndex))) {
        // Check if the new array already exists in arrayOfArrays
        const isComboDuplicate = foundSquares.some(
          (existingArray) =>
            JSON.stringify(existingArray) === JSON.stringify(combo)
        );

        if (!isComboDuplicate) {
          setIsWinner(true);
          localStorage.setItem("score", Number(localStorage.getItem("score"))+1);
          dispatch({ type: 'INCREMENT_SCORE', payload: 1 });
          setSelectedSquares([]);
          setFoundSquares((prevArrayOfArrays) => [...prevArrayOfArrays, combo]);
      
        } else {
          setSelectedSquares([]);
        }


      }
    }
  };

  return (
    <>
      <div className="squaregrid">
        {squaresContent.map(({ index, card }) => (
          <div
            className={`cell ${index !== 12 ? "scale-on-hover" : ""}`}
            style={{
              background: "#eee",
              borderRadius: "8px",
              textAlign: "center",
              background: foundSquares.includes(index) ? "#90EE90" : "#eee",
              cursor: index === 12 ? "default" : "pointer",
              background: selectedSquares.includes(index)
                ? "lightblue"
                : "#eee",
              color: selectedSquares.includes(index) ? "white" : "black",

              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              wordYrap: "break-word",
              whiteSpace: "normal",
              ...( index !== 12 && {
                ":hover": {
                  transform: "scale(1.5)",
                }})
            }}
            onClick={() => handleSquareClick(index)}
          >
            <Square key={index} component={card.component} index={index} keyIcon={card.key} card={card}/>
            <p
              className="content-text"
              style={{
                textDecoration: foundSquares.some((array) =>
                  array.includes(index)
                )
                  ? "line-through"
                  : "none",
              }}
            >
              {card.text}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default BingoCard;
