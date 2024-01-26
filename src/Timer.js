import React, { useState, useEffect, useRef } from "react";
import './Timer.css';

const Timer = () => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(120); // 2 minutes in seconds
  const flashingRef = useRef();
  const timerRef = useRef();
  const timerDisplayRef = useRef();

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const secondsWithDecimal = seconds.toFixed(1);
    return `${minutes.toString().padStart(2, "0")}:${secondsWithDecimal.padStart(4, "0")}`;
  };

  // Handle Screen resize
  useEffect(() => {
    // Resize event listener
    const handleResize = () => {
      setFontSize(timerRef);
    };

    // Attach event listener
    window.addEventListener('resize', handleResize);
    
    // Set initial font size
    setFontSize();

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    
  }, []); // Execute only on component mount

  // This is a horrific violation of encapsulation but I am tired of fiddling with the styling
  const setFontSize = () => {
    const timerRefWidth = timerRef.current.offsetWidth;
    const newFontSize = Math.max(0.8 * timerRefWidth/3, 30);

    timerDisplayRef.current.style.fontSize = `${newFontSize}px`;
  };

  // Start/Stop Timer Logic
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Space") {
        setIsActive(!isActive);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isActive]);

  const handleTimeClick = () => {
    const newTimeInput = prompt("Enter new time in seconds");
    const newTime = parseInt(newTimeInput, 10);
    if (!isNaN(newTime) && newTime > 0) {
      setTime(newTime);
    } else {
      alert("Please enter a valid positive number for the time.");
    }
  };

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 0.1;
          if (newTime <= 0) {
            setIsActive(false); // Pause the timer when it reaches 0
            flashingRef.current.style.display = "block";
            setTimeout(() => {
              setTime(120); // Reset the timer to 2 minutes
              flashingRef.current.style.display = "none"; // hide the mask
            }, 1000); 
            return 0;
          }
          return newTime;
        });
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);
  

  return (
    <div ref={timerRef} onClick={handleTimeClick} className="timer">
     <div ref={flashingRef} className="flashing-mask"></div>
      <p ref={timerDisplayRef} className="timer-display">{formatTime(time)}</p>
      <p>Press spacebar to start/stop</p>
    </div>
  );
};

export default Timer;