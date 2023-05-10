import React, { useEffect, useState } from 'react';
import BingoCard from "./BingoCard";
import Toolbar from "./shared/toolbar/Toolbar";
import { useParams } from "react-router-dom";
import axios from 'axios';


const BingoComponent = () => {
    const [data, setData] = useState([]);
      

    let { roomId } = useParams();
    console.log("or",roomId);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:4000/api/data?roomId='+roomId);
            setData(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
    
    
  // State variables

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




  return (
    <div>

       <Toolbar></Toolbar>
        <BingoCard bingoData = {data}/>

        <div>

    </div>

    </div>
  );
};

export default BingoComponent;

