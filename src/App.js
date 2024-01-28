import './App.css';
import Mascot from './Mascot';
import Scoreboard from './Scoreboard'; // Import the Scoreboard component

function App() {
  const savedScoreboard = JSON.parse(localStorage.getItem('scoreboard')) || {
    greenScore: 0,
    redScore: 0,
    homeTeamScore: 0,
    awayTeamScore: 0,
  };
  const initialTimeRemaining = localStorage.getItem('timeRemaining') || 120
  console.log("restored scoreboard", savedScoreboard)
  console.log("initial time remaining %d", initialTimeRemaining)

  return (
    <div className="App">
      <Scoreboard savedScoreboard={savedScoreboard} initialTimeRemaining={initialTimeRemaining}/> {/* Include the Scoreboard component here */}
      <Mascot position="topleft" />
      <Mascot position="bottomleft" />
      <Mascot position="topright"/>
      <Mascot position="bottomright"/>
    </div>
  );
}

export default App;