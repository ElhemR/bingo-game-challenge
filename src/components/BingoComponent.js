import BingoCard from "./BingoCard";

import Toolbar from "./shared/toolbar/Toolbar";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

const BingoComponent = () => {
  let { roomId } = useParams();
  // Listen for 'roomInfo' event

  return (
    <div>
      <Toolbar></Toolbar>

      <BingoCard roomId={roomId} />

      <div></div>
    </div>
  );
};

export default BingoComponent;
