import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');  // Replace with your server URL

const MyComponent = () => {
  const [roomInfo, setRoomInfo] = useState(null);

  useEffect(() => {
    socket.emit('getRoomInfo', 'Cj0Z0B');  // Replace "roomId" with the actual room ID you want to fetch

    socket.on('roomInfo', (data) => {
      setRoomInfo(data);
    });

    // Clean up the socket event listener when the component unmounts
    return () => {
      socket.off('roomInfo');
    };
    console.log('wr',roomInfo);
  }, []);

  // Render your component using the roomInfo
  return (
    <div>
      {roomInfo ? (
        <p>Room ID: {roomInfo.roomId}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyComponent;