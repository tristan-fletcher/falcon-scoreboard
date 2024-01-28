import React, { useRef } from 'react';
import './Score.css';
import { AutoTextSize } from 'auto-text-size'

const Score = ({ score, scoreName, color, updateScore }) => {
  const scoreRef = useRef();
  let scoreColor = 'white'
  let paddingSize = "3px"
  let borderColor = "white"
  if (color === 'gainsboro') {
    scoreColor = 'black'
    // borderColor = "gray"
    // paddingSize = "0px"
  }

  return (
    <div ref={scoreRef} className="score" style={{ backgroundColor: color , color: scoreColor, borderWidth: "3px", borderStyle: "solid", borderColor: borderColor, padding: paddingSize, alignItems:"center"}}>
      <div>
        <AutoTextSize maxFontSizePx="300" mode="box" style={{margin: "auto"}}>
         {score}
        </AutoTextSize>
      </div>
      <div className="score-controls">
        <button onClick={() => updateScore(scoreName, 1)}>
          <AutoTextSize maxFontSizePx="200" mode="box" style={{margin: "auto"}}>
            +
          </AutoTextSize>
        </button>
        <button onClick={() => updateScore(scoreName, -1)}>
          <AutoTextSize maxFontSizePx="200" mode="box" style={{margin: "auto"}}>
            -
          </AutoTextSize>
        </button>
      </div>
    </div>
  );
};

export default Score;