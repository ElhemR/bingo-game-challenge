import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { motion } from "framer-motion";
import BingoCard from "./components/BingoCard";
import memeImage from "./assets/memes/a46.jpeg";
const socket = io("http://localhost:4000", { transports: ["websocket"] }); // Replace with your server URL

const App = () => {
  const filledRows = [0, 2, 4]; // Example filled rows
  const filledColumns = [1, 3]; // Example filled columns
  // State variables
  const [roomId, setRoomId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [started, setStarted] = useState(false);
  // Event handlers
  const handleStartRoom = (e) => {
    e.preventDefault();
    // Check if both fields are filled
    if (roomId.trim() === '' || playerName.trim() === '') {
      setErrorMessage('Please enter both the Room ID and Player Name.');
      return;
    }
    setStarted(true);
    socket.emit("startRoom", roomId);

  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    // Check if both fields are filled
    if (roomId.trim() === '' || playerName.trim() === '') {
      setErrorMessage('Please enter both the Room ID and Player Name.');
      return;
    }

    socket.emit("joinRoom", roomId, playerName);
    setStarted(true);
    setErrorMessage('');
  };

  // Socket.io event listeners
  useEffect(() => {
    console.log(roomId); 
    socket.on("roomCreated", (roomId) => {
      console.log(`Room created with ID: ${roomId}`);
      // Handle room creation success
    });

    socket.on("joinError", (error) => {
      console.log(`Error joining room: ${error}`);
      // Handle join error
    });

    socket.on("playerJoined", (playerName) => {
      console.log(`Player ${playerName} joined the room`);
      // Handle player joined event
    });

    socket.on("joinedRoom", (roomId, playerName) => {
      console.log(`Joined room ${roomId} as ${playerName}`);
      // Handle joined room success
    });
  }, []);

  return (
    <div>
      { roomId !=''? <BingoCard filledRows={filledRows} filledColumns={filledColumns} /> :
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="bingo-container-start"
      >
        <h1 className="game-title">BINGO!</h1>
        <div className="input-container">
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Room ID"
            className="input-field"
          />
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Player Name"
            className="input-field"
          />
        </div>
  
        <div className="button-container">
          <button className="start-button" onClick={handleStartRoom} >Start Room</button>
          <button className="join-button" onClick={handleJoinRoom}>Join Room</button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="meme-container"></div>
      </motion.div>}
    </div>
  );
};

export default App;

