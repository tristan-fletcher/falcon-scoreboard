import React, { useRef, useEffect } from 'react';
import './Score.css';

const Score = ({ score, scoreName, color, updateScore }) => {
  const scoreRef = useRef();
  let scoreColor = 'white'
  let paddingSize = "3px"
  let borderColor = "white"
  if (color === 'white') {
    scoreColor = 'black'
    borderColor = "gray"
    paddingSize = "0px"
  }

  // Handle Screen resize
  useEffect(() => {
    // Resize event listener
    const handleResize = () => {
      setFontSize(scoreRef);
    };

    // Attach event listener
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Execute only on component mount
  
  useEffect(() => {
    
    setFontSize();
  }, [score]);
  
  const setFontSize = () => {
    // Add the setFontSize logic according to your needs
    // Example: Dynamically adjust the font size based on the width
    const scoreboardWidth = scoreRef.current.offsetWidth;
    const newFontSize = Math.max(0.9 * scoreboardWidth, 40);
    scoreRef.current.style.fontSize = `${newFontSize}px`;
    // Adjust button font size based on the score font size
    const controlButtons = scoreRef.current.querySelectorAll('.score-controls button');
    controlButtons.forEach(button => {
      button.style.fontSize = `${newFontSize * 0.2}px`;
    });
  };

  return (
    <div ref={scoreRef} className="score" style={{ backgroundColor: color , color: scoreColor, borderWidth: "3px", borderStyle: "solid", borderColor: borderColor, padding: paddingSize}}>
    {/* <div ref={scoreRef} className="score" style={{ backgroundColor: color , color: scoreColor}}> */}
      <p>{score}</p>
      <div className="score-controls">
        <button onClick={() => updateScore(scoreName, 1)}>+</button>
        <button onClick={() => updateScore(scoreName, -1)}>-</button>
      </div>
    </div>
  );
};

export default Score;