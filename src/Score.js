import React, { useState, useEffect, useRef } from 'react';
import './Score.css';
import { AutoTextSize } from 'auto-text-size';

const Score = ({ score, scoreName, color, updateScore, controlDirection, invertColor }) => {
  const scoreRef = useRef();
  const [scoreDimensions, setScoreDimensions] = useState({ width: 0, height: 0 });

  // Updating the dimensions of the controls based on the `.score` div
  const updateDimensions = () => {
    if (scoreRef.current) {
      setScoreDimensions({
        width: scoreRef.current.offsetWidth,
        height: scoreRef.current.offsetHeight,
      });
    }
  };

  useEffect(() => {
    // Update dimensions initially and on every window resize
    window.addEventListener('resize', updateDimensions);
    updateDimensions(); // Set initial dimensions

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  let scoreColor = 'white';
  let paddingSize = '3px';
  let borderColor = color;
  let backgroundColor = color;
  let opacity = '100%';
  let boxShadow = '0px 0px 8px rgba(0, 0, 0, 0.3)';

  const colorToRGB = {
    red: '255, 0, 0',
    green: '0, 128, 0',
    // ... add other colors as needed
  };

  const convertToRGBA = (colorName, alpha = 0.5) => {
    const rgb = colorToRGB[colorName.toLowerCase()];
    console.log(rgb);
    return rgb ? `rgba(${rgb}, ${alpha})` : null;
  };

  if (invertColor) {
    backgroundColor = convertToRGBA(color);
    opacity = '100%';
    scoreColor = 'white';
    borderColor = color;
    boxShadow = '';
  }

  let controlFontSize = "18px"
  let limitingDimension = scoreDimensions.width
  if (controlDirection === "column") {
    limitingDimension = scoreDimensions.height
  }
  if (limitingDimension < 100) {
    controlFontSize = "12px"
  } else if (limitingDimension < 200) {
    controlFontSize = "14px"
  } else if (limitingDimension < 300) {
    controlFontSize = "32px"
  } else if (limitingDimension < 400) {
    controlFontSize = "60px"
  } else {
    controlFontSize = "90px"
  } 


  // Inline styles with dynamic dimensions for score-controls
  const scoreControlsStyles = {
    flexDirection: controlDirection,
    position: 'absolute',
    width: `${scoreDimensions.width}px`,
    height: `${scoreDimensions.height}px`,
    fontSize: controlFontSize,
  };

  
  return (
    <div 
      ref={scoreRef} 
      className="score" 
      style={{ 
        backgroundColor: backgroundColor, 
        color: scoreColor, 
        borderWidth: '3px', 
        opacity: opacity, 
        borderStyle: 'solid', 
        borderColor: borderColor, 
        padding: paddingSize, 
        alignItems: 'center', 
        boxShadow: boxShadow
      }}
    >
      <div style={{ width: '100%', height: '100%' }}>
        <AutoTextSize maxFontSizePx="500" mode="box" style={{ margin: 'auto' }}>
          {score}
        </AutoTextSize>
      </div>
      <div className="score-controls" style={scoreControlsStyles}>
        <button onClick={() => updateScore(scoreName, 3)}>
          <div style={{ margin: 'auto' }}>
            +3
          </div>
        </button>
        <button onClick={() => updateScore(scoreName, 2)}>
          <div style={{ margin: 'auto' }}>
            +2
          </div>
        </button>
        <button onClick={() => updateScore(scoreName, 1)}>
          <div style={{ margin: 'auto' }}>
            +1
          </div>
        </button>
        <button onClick={() => updateScore(scoreName, -1)}>
          <div style={{ margin: 'auto' }}>
            -1
          </div>
        </button>
      </div>
    </div>
  );
};

export default Score;