import React, { useEffect, useState } from 'react';
import BingoCard from "./BingoCard";
import Toolbar from "./shared/toolbar/Toolbar";
import { useParams } from "react-router-dom";

import io from "socket.io-client";

const url = process.env.REACT_APP_BINGO_SERVER_URL +":"+ process.env.REACT_APP_PORT;

const socket = io(url, { transports: ["websocket"] });
const BingoComponent = () => {
    const [data, setData] = useState({});
      

    let { roomId } = useParams();
    // Listen for 'roomInfo' event

    useEffect(() => {
      socket.emit("getRoomInfo", roomId);
    }, [roomId]);


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



     // Listen for 'dataBroadcast' event
     useEffect(() => {
      socket.on('scoreUpdate', (data) => {
        const { playerName, score, roomId } = data;
        console.log('Received updated score:', score);
        // Update the player's score in the React component state or perform any necessary operations
      });
      
      // Clean up the event listener when the component unmounts
      return () => {
        socket.off("scoreUpdate");
      };
    }, []);


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

