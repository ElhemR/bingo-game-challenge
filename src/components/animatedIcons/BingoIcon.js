import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import animationData from './bingo_custom_icon.json';
import animationDataDefault from './Confetti_custom_icon.json';

function AnimatedIcon({ conditionMet }) {
  const animRef = useRef(null);
  const animInstance = useRef(null);

  useEffect(() => {
    animInstance.current = Lottie.loadAnimation({
      container: animRef.current,
      animationData: conditionMet?animationData:animationDataDefault,
      autoplay: false,
    });

    return () => {
      animInstance.current.destroy();
    };
  }, []);

  useEffect(() => {
    if (conditionMet) {
      animInstance.current.play();
      animInstance.current.setSpeed(1);
    } else {
      animInstance.current.stop();
    }
  }, [conditionMet]);

  return <div ref={animRef} />;
}

function BingoIcon({ conditionMet }) {
  return (
    <div>
      {/* Other components */}
      <AnimatedIcon conditionMet={conditionMet} />
      {/* Other components */}
    </div>
  );
}

export default BingoIcon;
