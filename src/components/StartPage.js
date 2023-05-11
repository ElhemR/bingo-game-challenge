import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BingoAnimation from "./animatedIcons/BingoAnimation";

const StartPage = () => {
  const [roomId, setRoomId] = useState("");
  const [playerName, setPlayerName] = useState("Mr Scrum Master");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  // Function to generate a random room ID
  const generateRoomId = () => {
    const roomIdLength = 6;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let roomId = "";
    for (let i = 0; i < roomIdLength; i++) {
      roomId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return roomId;
  };

  const [roomInfo, setRoomInfo] = useState(null);

  const handleJoinRoom = () => {
    if (roomId) {
      localStorage.setItem("playerName", playerName);

      navigate(`/bingo/${roomId}`);
    } else {
      console.log("en");
      setErrorMessage("You should create a room first!");
    }
  };

  const handleCreateRoom = () => {
    const newRoomId = generateRoomId();
    localStorage.setItem("roomId", newRoomId);
    setRoomId(newRoomId);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="bingo-container-start"
      >
        <BingoAnimation></BingoAnimation>

        <h1 className="game-subtitle">
          1. Create your room and share the URL with your friends{" "}
        </h1>
        <button className="start-button" onClick={handleCreateRoom}>
          {" "}
          Create Room
        </button>
        {roomId && <p>Room ID: {roomId}</p>}
        <div className="input-container">
          <h1 className="game-subtitle">2. Start Playing! </h1>

          <div className="button-container">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Your Name"
              className="input-field"
            />

            <button
              className="join-button"
              onClick={handleJoinRoom}
              disabled={!roomId}
            >
              {" "}
              Join Room
            </button>
          </div>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </motion.div>
    </div>
  );
};

export default StartPage;
