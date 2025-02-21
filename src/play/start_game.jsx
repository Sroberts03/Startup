import React, { useState, useEffect } from 'react';
import './start_game.css';
import { OregonTrailGame } from './oregon_trail_game.jsx';

export function StartGame() {
  const [startGame, setStartGame] = useState(false);
  const [gameInstance, setGameInstance] = useState(null);

  const handleStartClick = () => {
    const game = new OregonTrailGame(); // Create game instance
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
          <p>Percent: 30%</p>
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
      const timer = setTimeout(() => setGameState('event'), 5000);
      return () => clearTimeout(timer);
    } else if (gameState === 'event' && (game.getGameOver() || game.getGameWon())) {
      setGameState(game.getGameOver() ? 'gameOver' : 'gameWon');
    }
  }, [gameState, game]);

  const handleNext = () => {
    if (gameState === 'welcome') setGameState('animation');
    else if (gameState === 'event') setGameState('animation');
    {game.updateGameState()}
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
        <div className="text-box-player-conditions-left" align="center">{game.getLife()}</div>
        <div className="text-box-player-conditions-left" align="center">{game.getMilesLeft()}</div>
        <div className="text-box-player-conditions-left" align="center">{game.getPercent()}</div>
        <div className="text-box-player-conditions-right" align="center">{game.getWater()}</div>
        <div className="text-box-player-conditions-right" align="center">{game.getFood()}</div>
        <div className="text-box-player-conditions-right" align="center">{game.getFirstAid()}</div>
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
        <div className="text-box-player-conditions-left" align="center">{game.getLife()}</div>
        <div className="text-box-player-conditions-left" align="center">{game.getMilesLeft()}</div>
        <div className="text-box-player-conditions-left" align="center">{game.getPercent()}</div>
        <div className="text-box-player-conditions-right" align="center">{game.getWater()}</div>
        <div className="text-box-player-conditions-right" align="center">{game.getFood()}</div>
        <div className="text-box-player-conditions-right" align="center">{game.getFirstAid()}</div>
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
        <div className="text-box-player-conditions-left" align="center">{game.getLife()}</div>
        <div className="text-box-player-conditions-left" align="center">{game.getMilesLeft()}</div>
        <div className="text-box-player-conditions-left" align="center">{game.getPercent()}</div>
        <div className="text-box-player-conditions-right" align="center">{game.getWater()}</div>
        <div className="text-box-player-conditions-right" align="center">{game.getFood()}</div>
        <div className="text-box-player-conditions-right" align="center">{game.getFirstAid()}</div>
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
  return (
    <main className="container-fluid bg-secondary text-center">
      <nav className="game-box" align="center">
      <div><img src="/cloud.jpg" className="still-cloud-one" alt="cloud" /></div>
      <div><img src="/cloud.jpg" className="still-cloud-three" alt="cloud" /></div>
        <div className="wagon-image-position" align="center">
          <img src="/wagon.jpg" className="still" alt="wagon" />
        </div>
        <div className="text-box-player-conditions-left" align="center">{game.getLife()}</div>
        <div className="text-box-player-conditions-left" align="center">{game.getMilesLeft()}</div>
        <div className="text-box-player-conditions-left" align="center">{game.getPercent()}</div>
        <div className="text-box-player-conditions-right" align="center">{game.getWater()}</div>
        <div className="text-box-player-conditions-right" align="center">{game.getFood()}</div>
        <div className="text-box-player-conditions-right" align="center">{game.getFirstAid()}</div>
        <div className="text-box-game-output" align="center">
          <p>You didn't make it to Oregon! Better luck next time</p>
        </div>
      </nav>
    </main>
  );
}

function GameWon({ game }) {
  return (
    <main className="container-fluid bg-secondary text-center">
      <nav className="game-box" align="center">
      <div><img src="/cloud.jpg" className="still-cloud-one" alt="cloud" /></div>
      <div><img src="/cloud.jpg" className="still-cloud-three" alt="cloud" /></div>
        <div className="wagon-image-position" align="center">
          <img src="/wagon.jpg" className="still" alt="wagon" />
        </div>
        <div className="text-box-player-conditions-left" align="center">{game.getLife()}</div>
        <div className="text-box-player-conditions-left" align="center">{game.getMilesLeft()}</div>
        <div className="text-box-player-conditions-left" align="center">{game.getPercent()}</div>
        <div className="text-box-player-conditions-right" align="center">{game.getWater()}</div>
        <div className="text-box-player-conditions-right" align="center">{game.getFood()}</div>
        <div className="text-box-player-conditions-right" align="center">{game.getFirstAid()}</div>
        <div className="text-box-game-output" align="center">
          <p>Welcome to Oregon traveler!! It was a long journey but you made it!!</p>
        </div>
      </nav>
    </main>
  );
}