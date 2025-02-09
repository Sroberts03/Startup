import React, { useState } from 'react';
import './start_game.css';


export function StartGame() {
  const [startGame, setStartGame] = useState(false);

  const handleStartClick = () => {
    setStartGame(true);
  };

  if (startGame) {
    return <GamePlay />;
  }

  return (
    <main className="container-fluid bg-secondary text-center">
      <nav className="game-box-start" align="center">
        <div className="text-box-player-conditions-left-start" align="center" color="black">
          <p>Life: 10</p>
        </div>
        <div className="text-box-player-conditions-left-start" align="center">
          <p>Miles: 1900</p>
        </div>
        <div className="text-box-player-conditions-left-start" align="center">
          <p>percent: 30%</p>
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
          <p>you have died of dysentery</p>
        </div>
      </nav>
      <button className="start-button" onClick={handleStartClick}>
        Start Game
      </button>
    </main>
  );
}

export function GamePlay() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <nav className="game-box" align="center">
        <div>
          <img src="/cloud.jpg" class="moving-cloud-one"/>
        </div>
        <div>
          <img src="/cloud.jpg" class="moving-cloud-two"/>
        </div>
        <div>
          <img src="/cloud.jpg" class="moving-cloud-three"/>
        </div>
        <div className="wagon-image-position" align="center">
          <img src="/wagon.jpg" className="vibrating"/>
        </div>
        <div className="text-box-player-conditions-left" align="center" color="black">
          <p>Life: 10</p>
        </div>
        <div className="text-box-player-conditions-left" align="center">
          <p>Miles: 1900</p>
        </div>
        <div className="text-box-player-conditions-left" align="center">
          <p>percent: 30%</p>
        </div>
        <div className="text-box-player-conditions-right" align="center">
          <p>Water: 10</p>
        </div>
        <div className="text-box-player-conditions-right" align="center">
          <p>Food: 50</p>
        </div>
        <div className="text-box-player-conditions-right" align="center">
          <p>First Aid: 1</p>
        </div>
        <div className="text-box-game-output" align="center">
          <p>you have died of dysentery</p>
        </div>
      </nav>
    </main>
  );
}