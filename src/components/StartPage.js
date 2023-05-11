import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BingoAnimation from "./animatedIcons/BingoAnimation";

const url = process.env.REACT_APP_BINGO_SERVER_URL +":"+ process.env.REACT_APP_PORT;
console.log('urlÄ',url)
console.log(process.env)
const socket = io(url, { transports: ["websocket"] });


const StartPage = () => {
  // State variables
  const [roomId, setRoomId] = useState("");
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState("Mr Scrum Master");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // animations
  const [isHighlighted, setIsHighlighted] = useState(false);

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

    if(roomId) {
      socket.emit("getRoomInfo", roomId);
      socket.emit("joinRoom", roomId, playerName);
      localStorage.setItem("playerName", playerName);
    
  
      navigate(`/bingo/${roomId}`);
    }
  
    else {
      console.log('en')
      setErrorMessage("You should create a room first!")
    }
  };

  // Event handler for creating a room
  const handleCreateRoom = () => {
    const newRoomId = generateRoomId();
    socket.emit("createRoom", newRoomId);
    localStorage.setItem("roomId", newRoomId);
    setRoomId(newRoomId);
  };

  // Event handler for getting room information
  const handleGetRoomInfo = () => {
    socket.emit("getRoomInfo", roomId);
  };

  // Listen for 'roomCreated' event
  socket.on("roomCreated", (createdRoomId) => {
    setRoomId(createdRoomId);
  });

  // Listen for 'roomInfo' event
  socket.on("roomInfo", (info) => {
    setRoomInfo(info);
  });

  // Socket.io event listeners

  useEffect(() => {
    socket.on("response-data", (responseData) => {
      // Handle the received data
    });

    socket.emit("request-room-data", roomId);
    socket.on("roomCreated", (roomId) => {
      // Handle room creation success
    });

    socket.on("joinError", (error) => {
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
    socket.on("getRoom", (roomId) => {
      console.log(`Joined room ${roomId} as ${playerName}`);
      // Handle joined room success
    });
    socket.emit("request-room-data", localStorage.getItem("roomId"));
  }, []);

  useEffect(() => {
    socket.emit("getRoomInfo", roomId);
  }, [roomInfo]);
  useEffect(() => {
  }, [roomInfo]);
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

        <h1  

            className="game-subtitle">
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

            <button className="join-button" onClick={handleJoinRoom} disabled={!roomId} >
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
