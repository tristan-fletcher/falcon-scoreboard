import React, { useState, useEffect } from 'react';
import Score from './Score'; 
import Timer from './Timer'
import './Scoreboard.css';

const Scoreboard = () => {
  const [scoreboard, setScoreboard] = useState({
    greenScore: 0,
    redScore: 0,
    homeTeamScore: 0,
    awayTeamScore: 0,
  });


  // Load scoreboard from local storage on component mount
  useEffect(() => {
    const savedScoreboard = JSON.parse(localStorage.getItem('scoreboard')) || {
        greenScore: 0,
        redScore: 0,
        homeTeamScore: 0,
        awayTeamScore: 0,
      };
    console.log(savedScoreboard)
    if (savedScoreboard) setScoreboard(savedScoreboard);
  }, []);

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
              color="white"
              updateScore={updateScore}  
          />
        </div>
        <div className="timer-container">
          <Timer/>
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