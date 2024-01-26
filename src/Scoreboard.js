import React, { useState, useEffect, useRef } from 'react';

import './Scoreboard.css';

const Scoreboard = () => {
  const greenScoreRef = useRef();
  const redScoreRef = useRef();
  const [scoreboard, setScoreboard] = useState({
    greenScore: 0,
    redScore: 0,
  });

  // Handle Screen resize
  useEffect(() => {
    // Resize event listener
    const handleResize = () => {
      setFontSize(greenScoreRef);
      setFontSize(redScoreRef);
    };

    // Attach event listener
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Execute only on component mount


  // Load scoreboard from local storage on component mount
  useEffect(() => {
    const savedScoreboard = JSON.parse(localStorage.getItem('scoreboard'));
    console.log(savedScoreboard)
    if (savedScoreboard) setScoreboard(savedScoreboard);
  }, []);

  const updateScore = (color, amount) => {
    setScoreboard(prevScoreboard => {
      const newScore = { 
        ...prevScoreboard,
        [color]: prevScoreboard[color] + amount 
      };
      localStorage.setItem('scoreboard', JSON.stringify(newScore));
      return newScore
    });
  };

  const setFontSize = (scoreRef) => {
    const scoreboardWidth = scoreRef.current.offsetWidth;
    const newFontSize = Math.max(0.9 * scoreboardWidth, 40); // Adjust the font size dynamically based on the width
    scoreRef.current.style.fontSize = `${newFontSize}px`;
    const controlButtons = scoreRef.current.querySelectorAll('.score-controls button'); // Select both control buttons
    controlButtons.forEach(button => {
        button.style.fontSize = `${newFontSize * 0.2}px`; // Adjust button font size based on the score font size
    });
  };

  useEffect(() => {
    setFontSize(greenScoreRef);
    setFontSize(redScoreRef);
  }, [scoreboard]);

  return (
    <div className="scoreboard-container">
      <div ref={greenScoreRef} className="score" style={{ backgroundColor: 'green' }}>
            <p>{scoreboard.greenScore}</p>
        <div className="score-controls">
          <button onClick={() => updateScore('greenScore', 1)}>+</button>
          <button onClick={() => updateScore('greenScore', -1)}>-</button>
        </div>
      </div>
      <div ref={redScoreRef} className="score" style={{ backgroundColor: 'red' }}>
            {scoreboard.redScore}
        <div className="score-controls">
          <button onClick={() => updateScore('redScore', 1)}>+</button>
          <button onClick={() => updateScore('redScore', -1)}>-</button>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;