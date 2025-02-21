import React, { useState, useEffect } from 'react';
import './start_game.css';
import { OregonTrailGame } from './oregon_trail_game.jsx';

export function StartGame({userName}) {
  const [startGame, setStartGame] = useState(false);
  const [gameInstance, setGameInstance] = useState(null);

  const handleStartClick = () => {
    const game = new OregonTrailGame(userName);
    setGameInstance(game);
    setStartGame(true);
  };

  if (startGame && gameInstance) {
    return <GamePlay game={gameInstance} />;
  }

  return (
    <main className="container-fluid bg-secondary text-center">
      <nav className="game-box-start" align="center">
        <div className="text-box-player-conditions-left-start" align="center">
          <p>Life: 10</p>
        </div>
        <div className="text-box-player-conditions-left-start" align="center">
          <p>Miles: 2170</p>
        </div>
        <div className="text-box-player-conditions-left-start" align="center">
          <p>Percent: 0%</p>
        </div>
        <div className="text-box-player-conditions-right-start" align="center">
          <p>Water: 10</p>
        </div>
        <div className="text-box-player-conditions-right-start" align="center">
          <p>Food: 50</p>
        </div>
        <div className="text-box-player-conditions-right-start" align="center">
          <p>First Aid: 1</p>
        </div>
        <div className="text-box-game-output-start" align="center">
          <p>You have died of dysentery</p>
        </div>
      </nav>
      <button className="start-button" onClick={handleStartClick}>
        Start Game
      </button>
    </main>
  );
}

export function GamePlay({ game }) {
  const [gameState, setGameState] = useState('welcome');

  useEffect(() => {
    if (gameState === 'animation') {
      const timer = setTimeout(() => setGameState('event'), 3000);
      return () => clearTimeout(timer);
    } else if (gameState === 'event' && (game.getGameOver() || game.getGameWon())) {
      setGameState(game.getGameOver() ? 'gameOver' : 'gameWon');
    }
  }, [gameState, game]);

  const handleNext = () => {
    if (gameState === 'welcome') setGameState('animation');
    else if (gameState === 'event') setGameState('animation');
    {game.updateGameState()}
    if (game.getGameOver()) setGameState('gameOver');
    else if (game.getGameWon()) setGameState('gameWon');
  };

  if (gameState === 'welcome') return <Welcome game={game} onNext={handleNext} />;
  if (gameState === 'animation') return <Animation game={game} />;
  if (gameState === 'event') return <Event game={game} onNext={handleNext} />;
  if (gameState === 'gameOver') return <GameOver game={game} />;
  if (gameState === 'gameWon') return <GameWon game={game} />;
  return null;
}

function Welcome({ game, onNext }) {
  return (
    <main className="container-fluid bg-secondary text-center">
      <nav className="game-box" align="center">
        <div><img src="/cloud.jpg" className="still-cloud-one" alt="cloud" /></div>
        <div><img src="/cloud.jpg" className="still-cloud-three" alt="cloud" /></div>
        <div className="wagon-image-position" align="center">
          <img src="/wagon.jpg" className="still" alt="wagon" />
        </div>
        <div className="text-box-player-conditions-left" align="center">Life: {game.getLife()}</div>
        <div className="text-box-player-conditions-left" align="center">Miles: {game.getMilesLeft()}</div>
        <div className="text-box-player-conditions-left" align="center">{game.getPercent()}%</div>
        <div className="text-box-player-conditions-right" align="center">Water: {game.getWater()}</div>
        <div className="text-box-player-conditions-right" align="center">Food: {game.getFood()}</div>
        <div className="text-box-player-conditions-right" align="center">Fist Aid: {game.getFirstAid()}</div>
        <div className="text-box-game-output" align="center">
          <p>Welcome to the trail traveler! Good luck out there!</p>
          <button onClick={onNext}>Next</button>
        </div>
      </nav>
    </main>
  );
}

function Animation({ game }) {
  return (
    <main className="container-fluid bg-secondary text-center">
      <nav className="game-box" align="center">
        <div><img src="/cloud.jpg" className="moving-cloud-one" alt="cloud" /></div>
        <div><img src="/cloud.jpg" className="moving-cloud-two" alt="cloud" /></div>
        <div><img src="/cloud.jpg" className="moving-cloud-three" alt="cloud" /></div>
        <div className="wagon-image-position" align="center">
          <img src="/wagon.jpg" className="vibrating" alt="wagon" />
        </div>
        <div className="text-box-player-conditions-left" align="center">Life: {game.getLife()}</div>
        <div className="text-box-player-conditions-left" align="center">Miles: {game.getMilesLeft()}</div>
        <div className="text-box-player-conditions-left" align="center">{game.getPercent()}%</div>
        <div className="text-box-player-conditions-right" align="center">Water: {game.getWater()}</div>
        <div className="text-box-player-conditions-right" align="center">Food: {game.getFood()}</div>
        <div className="text-box-player-conditions-right" align="center">Fist Aid: {game.getFirstAid()}</div>
      </nav>
    </main>
  );
}

function Event({ game, onNext }) {
  return (
    <main className="container-fluid bg-secondary text-center">
      <nav className="game-box" align="center">
        <div><img src="/cloud.jpg" className="still-cloud-one" alt="cloud" /></div>
        <div><img src="/cloud.jpg" className="still-cloud-three" alt="cloud" /></div>
        <div className="wagon-image-position" align="center">
          <img src="/wagon.jpg" className="still" alt="wagon" />
        </div>
        <div className="text-box-player-conditions-left" align="center">Life: {game.getLife()}</div>
        <div className="text-box-player-conditions-left" align="center">Miles: {game.getMilesLeft()}</div>
        <div className="text-box-player-conditions-left" align="center">{game.getPercent()}%</div>
        <div className="text-box-player-conditions-right" align="center">Water: {game.getWater()}</div>
        <div className="text-box-player-conditions-right" align="center">Food: {game.getFood()}</div>
        <div className="text-box-player-conditions-right" align="center">Fist Aid: {game.getFirstAid()}</div>
        <div className="text-box-game-output" align="center">
          {game.events()}
          {game.dailyUpdates()}
          <p>Day {game.getDay()}:</p>
          <p>{game.getMessage()}</p>
          <button onClick={onNext}>Next</button>
        </div>
      </nav>
    </main>
  );
}

function GameOver({ game }) {
  useEffect(() => {
    saveScore(game.getPercent(), game.getUserName());
  }, [game]);
  return (
    <main className="container-fluid bg-secondary text-center">
      <nav className="game-box" align="center">
        <nav className="game-over" align="center">
          <p>GAME OVER!!</p>
          <p>You didn't make it to Oregon! Better luck next time!!</p>
          <button onClick={() => window.location.reload()}>Restart</button>
        </nav>
      </nav>
    </main>
  );
}

function GameWon({ game }) {
  useEffect(() => {
    saveScore(game.getPercent(), game.getUserName());
  }, [game]);
  return (
    <main className="container-fluid bg-secondary text-center">
      <nav className="game-box" align="center">
        <nav className="game-over" align="center">
          <p>YOU MADE IT!!</p>
          <p>Welcome to Oregon traveler!!</p>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </nav>
      </nav>
    </main>
  );
}

function updateScoresLocal(newScore) {
  try {
    const existingScores = JSON.parse(localStorage.getItem('scores') || '[]');
    existingScores.push(newScore);
    const sortedScores = existingScores
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    localStorage.setItem('scores', JSON.stringify(sortedScores));
  } catch (error) {
    console.error('Failed to save score locally:', error);
  }
}

async function saveScore(score, userName) {
  const date = new Date().toLocaleDateString();
  const newScore = { 
    name: userName, 
    score: score, 
    date: date
  };

  try {
    updateScoresLocal(newScore);
    return true;

  } catch (error) {
    console.error('Error saving score:', error);
    return false;
  }
}