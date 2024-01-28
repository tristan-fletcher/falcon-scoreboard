import React, { useRef } from 'react';
import './Score.css';
import { AutoTextSize } from 'auto-text-size'

const Score = ({ score, scoreName, color, updateScore, controlDirection }) => {
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