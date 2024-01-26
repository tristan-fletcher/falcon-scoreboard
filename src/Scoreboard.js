import React, { useState } from 'react';
import Score from './Score'; 
import Timer from './Timer'
import './Scoreboard.css';

const Scoreboard = ({savedScoreboard, initialTimeRemaining}) => {
  const [scoreboard, setScoreboard] = useState(savedScoreboard);

  const updateScore = (scoreName, amount) => {
    setScoreboard(prevScoreboard => {
      const newScore = { 
        ...prevScoreboard,
        [scoreName]: prevScoreboard[scoreName] + amount 
      };
      console.log(newScore)
      localStorage.setItem('scoreboard', JSON.stringify(newScore));
      return newScore
    });
  };

  return (
    <div className="scoreboard-container">
      <Score
        score={scoreboard.greenScore}
        scoreName="greenScore"
        color="green"
        updateScore={updateScore}
      />
      <div className="center-container">
        <div className="team-scores-container">
          <Score
              score={scoreboard.homeTeamScore}
              scoreName="homeTeamScore"
              color="purple"
              updateScore={updateScore}  
          />
          <Score
              score={scoreboard.awayTeamScore}
              scoreName="awayTeamScore"
              color="gainsboro"
              updateScore={updateScore}  
          />
        </div>
        <div className="timer-container">
          <Timer 
            initialTime={initialTimeRemaining}
          />
        </div>
      </div>
      <Score
        score={scoreboard.redScore}
        scoreName="redScore"
        color="red"
        updateScore={updateScore}
      />
    </div>
  );
};

export default Scoreboard;