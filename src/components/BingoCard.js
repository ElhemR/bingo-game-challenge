import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import "./BingoCard.css";

import playerNames from "../data/randomPlayerNames.json";

import { cards, fixedCard } from "../data/cards";
import BingoIcon from "./animatedIcons/BingoIcon";

const generateRandomName = () => {
  const randomIndex = Math.floor(Math.random() * playerNames.length);
  return playerNames[randomIndex];
};

const BingoCard = ({ roomId }) => {
  const [selectedSquares, setSelectedSquares] = useState(
    JSON.parse(localStorage.getItem("squaresContent")) || []
  );
  const [foundSquares, setFoundSquares] = useState([]);
  const [isWinner, setIsWinner] = useState(false);
  const [squaresContent, setSquaresContent] = useState([]);
  const dispatch = useDispatch();

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    localStorage.setItem("roomId", roomId);
    dispatch({ type: "SET_ROOM_ID", payload: roomId });
    const name = generateRandomName();

    if (!localStorage.getItem("playerName")) {
      dispatch({ type: "SET_PLAYER_NAME", payload: name });
      localStorage.setItem("playerName", name);
    }

    if (!localStorage.getItem("squaresContent")) {
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
      localStorage.setItem("squaresContent", JSON.stringify(arrayObjects));
    } else {
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
    const iconKey = card.key;

    const foundCard = cards.find((card) => card.key === iconKey);

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
          localStorage.setItem(
            "score",
            Number(localStorage.getItem("score")) + 1
          );
          dispatch({ type: "INCREMENT_SCORE", payload: 1 });
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
              ...(index !== 12 && {
                ":hover": {
                  transform: "scale(1.5)",
                },
              }),
            }}
            onClick={() => handleSquareClick(index)}
          >
            <Square
              key={index}
              component={card.component}
              index={index}
              keyIcon={card.key}
              card={card}
            />
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
