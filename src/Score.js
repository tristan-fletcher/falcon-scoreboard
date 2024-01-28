import React, { useRef } from 'react';
import './Score.css';
import { AutoTextSize } from 'auto-text-size'

const Score = ({ score, scoreName, color, updateScore, controlDirection, invertColor }) => {
  const scoreRef = useRef();
  let scoreColor = 'white'
  let paddingSize = '3px'
  let borderColor = color
  let backgroundColor = color
  let opacity = "100%"
  let boxShadow = "3px 3px 5px rgba(0, 0, 0, 0.3)"
  const colorToRGB = {
    red: '255, 0, 0',
    green: '0, 128, 0',
    // ... add other colors as needed
  };
  
  const convertToRGBA = (colorName, alpha = 0.5) => {
    const rgb = colorToRGB[colorName.toLowerCase()];
    console.log(rgb)
    return rgb ? `rgba(${rgb}, ${alpha})` : null;
  }
  if (invertColor) {
    backgroundColor = convertToRGBA(color)
    opacity = '75%'
    scoreColor = 'white'
    borderColor = color
    boxShadow = ""
  }


  return (
    <div ref={scoreRef} className="score" style={{ backgroundColor: backgroundColor, color: scoreColor, borderWidth: "3px", opacity: opacity, borderStyle: "solid", borderColor: borderColor, padding: paddingSize, alignItems:"center", boxShadow: boxShadow}}>
      <div style={{width: "100%", height:"100%"}}>
        <AutoTextSize maxFontSizePx="500" mode="box" style={{margin: "auto"}}>
         {score}
        </AutoTextSize>
      </div>
      <div className="score-controls" style={{flexDirection: controlDirection}}>
        <button onClick={() => updateScore(scoreName, 2)}>
          <AutoTextSize maxFontSizePx="100" mode="oneline" style={{margin: "auto"}}>
            +2
          </AutoTextSize>
        </button>
        <button onClick={() => updateScore(scoreName, -1)}>
          <AutoTextSize maxFontSizePx="100" mode="oneline" style={{margin: "auto"}}>
            +1
          </AutoTextSize>
        </button>
        <button onClick={() => updateScore(scoreName, -1)}>
          <AutoTextSize maxFontSizePx="100" mode="oneline" style={{margin: "auto"}}>
            -1
          </AutoTextSize>
        </button>
        <button onClick={() => updateScore(scoreName, -2)}>
          <AutoTextSize maxFontSizePx="100" mode="oneline" style={{margin: "auto"}}>
            -2
          </AutoTextSize>
        </button>
      </div>
    </div>
  );
};

export default Score;