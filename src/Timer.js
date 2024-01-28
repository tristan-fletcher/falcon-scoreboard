import { AutoTextSize } from "auto-text-size";
import React, { useState, useEffect, useRef } from "react";
import CircleIndicator from "./CircleIndicator";
import './Timer.css';

const Timer = ({initialTime}) => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(initialTime); // 2 minutes in seconds
  const flashingRef = useRef();
  const timerRef = useRef();
  const timerDisplayRef = useRef();
  const circleRef = useRef(null);

  const advancePeriod = () => {
    if (circleRef.current) {
      circleRef.current.advanceIndex();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const secondsWithDecimal = seconds.toFixed(1);
    return `${minutes.toString().padStart(2, "0")}:${secondsWithDecimal.padStart(4, "0")}`;
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
      updateTimeRemaining(newTime)
    } else {
      alert("Please enter a valid positive number for the time.");
    }
  };

  const updateTimeRemaining = (timeRemaining) => {
    localStorage.setItem('timeRemaining', timeRemaining);
  }

  useEffect(() => {
    let interval;
    let timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 0.1;
          updateTimeRemaining(newTime)
          if (newTime <= 0) {
            setIsActive(false); // Pause the timer when it reaches 0
            flashingRef.current.style.display = "block";
            if (timeout) {
              clearTimeout(timeout)
            }
            timeout = setTimeout(() => {
              setTime(120); // Reset the timer to 2 minutes
              updateTimeRemaining(120)
              console.log("advancing period")
              advancePeriod()
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
    <div ref={timerRef} className="timer">
     <div ref={flashingRef} className="flashing-mask"></div>
      <div ref={timerDisplayRef} onClick={handleTimeClick}  className="timer-display">
        <AutoTextSize  maxFontSizePx="300" mode="oneline" style={{margin: "auto"}}>
          {formatTime(time)}
        </AutoTextSize>
      </div>
      <div className="period-container">
        <CircleIndicator ref={circleRef}></CircleIndicator>
      </div>
      <p className="timer-help">Press spacebar to start/stop. Click time to set time. Click period to change it.</p>
    </div>
  );
};

export default Timer;