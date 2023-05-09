import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import animationData from './notification_custom_icon.json';

function AnimatedIcon() {
    const animRef = useRef(null);
    const animInstance = useRef(null);
  
    useEffect(() => {
      animInstance.current = Lottie.loadAnimation({
        container: animRef.current,
        animationData: animationData,
        autoplay: false,
      });
  
      return () => {
        animInstance.current.destroy();
      };
    }, []);
  
    const handleMouseEnter = () => {
      animInstance.current.play();
    };
  
    const handleMouseLeave = () => {
      animInstance.current.stop();
    };
  
    return (
      <div
        ref={animRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    );
}

function NotificationIcon() {
    return (
      <div>
        {/* Other components */}
        <AnimatedIcon />
        {/* Other components */}
      </div>
    );
  }
  
  export default NotificationIcon;