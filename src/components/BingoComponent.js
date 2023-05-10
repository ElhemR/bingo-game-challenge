import React, { useEffect, useState } from 'react';
import BingoCard from "./BingoCard";
import Toolbar from "./shared/toolbar/Toolbar";
import { useParams } from "react-router-dom";

import io from "socket.io-client";
const socket = io("https://puzzled-sparkly-sycamore.glitch.me:4000", { transports: ["websocket"] });
const BingoComponent = () => {
    const [data, setData] = useState({});
      
    const [roomInfo, setRoomInfo] = useState(null);

    let { roomId } = useParams();
    // Listen for 'roomInfo' event

    useEffect(() => {
      socket.emit("getRoomInfo", roomId);
    }, [roomId]);

  // State variables
  socket.on("roomInfo", (info) => {
    setRoomInfo(info);
  });
  const [playerName, setPlayerName] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  // Event handlers
  const handleStartRoom = (e) => {
    e.preventDefault();
    // Check if both fields are filled
    if (roomId.trim() === '' || playerName.trim() === '') {
      setErrorMessage('Please enter both the Room ID and Player Name.');
      return;
    }

  };




  useEffect(() => {
    // Connect to the server
    socket.connect();

    const requestId = roomId; // Replace with the desired ID

    // Request data from the server with the ID attribute
    socket.emit('requestData', requestId);

    // Handle the data response from the server
    socket.on('dataResponse', (responseData) => {
      setData(responseData);
      // Perform any necessary operations with the received data
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      // socket.disconnect();
    };
  }, []);

  return (
    <div>
   
       <Toolbar></Toolbar>
        <BingoCard roomId = {roomId} bingo = {data}/>

        <div>

    </div>

    </div>
  );
};

export default BingoComponent;

