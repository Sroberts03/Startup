import React, { useState, useEffect } from 'react';
import './start_game.css';
import { OregonTrailGame } from './oregon_trail_game.jsx';
import { GameEvent, GameSimulator } from './gameNotifier';

export function StartGame({ userName }) {
  const [startGame, setStartGame] = useState(false);
  const [gameInstance, setGameInstance] = useState(null);
  const [recentEvents, setRecentEvents] = useState([]);

  useEffect(() => {
    const handleGameEvent = (event) => {
      let message;
      if (event.type === GameEvent.Start) {
        message = `${event.from} started their journey!`;
      } else if (event.type === GameEvent.End) {
        message = `${event.from} ended their journey at ${event.value.score}%${event.value.won ? ' - Made it to Oregon!' : ''}`;
      }
      setRecentEvents((prev) => [message, ...prev.slice(0, 4)]); // Keep last 5 events
    };

    GameSimulator.addHandler(handleGameEvent);

    // Cleanup on component unmount
    return () => GameSimulator.removeHandler(handleGameEvent);
  }, []);

  const handleStartClick = () => {
    const game = new OregonTrailGame(userName);
    setGameInstance(game);
    setStartGame(true);
    GameSimulator.broadcastEvent(userName, GameEvent.Start, {});
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
          <p>Welcome to the Oregon Trail!</p>
        </div>
      </nav>
      <div className= 'web-socket-box'>
            <h3>Recent Events:</h3>
            {recentEvents.length > 0 ? (
              <ul>
                {recentEvents.map((event, index) => (
                  <li key={index}>{event}</li>
                ))}
              </ul>
            ) : (
              <p>No recent events yet.</p>
            )}
        </div>
      <button className="start-button" onClick={handleStartClick}>
        Start Game
      </button>
    </main>
  );
}

export function GamePlay({ game }) {
  const [gameState, setGameState] = useState('welcome');
  const [foodGot, setFoodGot] = useState(0);

  useEffect(() => {
    if (gameState === 'animation') {
      const timer = setTimeout(() => setGameState('event'), 2000);
      return () => clearTimeout(timer);
    } else if (gameState === 'event' && (game.getGameOver() || game.getGameWon())) {
      setGameState(game.getGameOver() ? 'gameOver' : 'gameWon');
    }
  }, [gameState, game]);

  const handleNext = () => {
    {game.dailyUpdates()}
    {game.events()}
    if (gameState === 'welcome') setGameState('animation');
    else if (gameState === 'hunting') setGameState('animation');
    else if (gameState === 'fishing') setGameState('animation');
    else if (gameState === 'event') setGameState('animation');
    game.updateGameState();
    if (game.getGameOver()) setGameState('gameOver');
    else if (game.getGameWon()) setGameState('gameWon');
  };

  const handleHuntingYes = () => {
    var food = Math.floor(Math.random() * 10) + 1;
    setFoodGot(food);
    game.addAndSubtractFood(food, 'add');
    if (game.getHunting()) {
      game.setHunting(false);
      setGameState('hunting');
    } else if (game.getFishing()) {
      game.setFishing(false);
      setGameState('fishing');
    }
  };

  const handleHuntingNo = () => {
    game.subtrackMiles(100, 'subtract');
    if (game.getHunting()) {
      game.setHunting(false);
    } else if (game.getFishing()) {
      game.setFishing(false);
    }
    handleNext();
  };

  const handleWaterYes = () => {
    game.addAndSubWater(5, 'add');
    game.setCollectWater(false);
    handleNext();
  };

  const handleWaterNo = () => {
    game.subtrackMiles(100, 'subtract');
    game.setCollectWater(false);
    handleNext();
  };

  if (gameState === 'welcome') return <Welcome game={game} onNext={handleNext} />;
  if (gameState === 'animation') return <Animation game={game} />;
  if (gameState === 'event')
    return (
      <Event
        game={game}
        onNext={handleNext}
        handleHuntingYes={handleHuntingYes}
        handleHuntingNo={handleHuntingNo}
        handleWaterYes={handleWaterYes}
        handleWaterNo={handleWaterNo}
      />
    );
  if (gameState === 'gameOver') return <GameOver game={game} />;
  if (gameState === 'gameWon') return <GameWon game={game} />;
  if (gameState === 'hunting') return <AfterHunting game={game} onNext={handleNext} foodGot={foodGot} />;
  if (gameState === 'fishing') return <AfterFishing game={game} onNext={handleNext} foodGot={foodGot} />;
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

function Event({ game, onNext, handleHuntingYes, handleHuntingNo, handleWaterYes, handleWaterNo }) {
  if (game.getCollectWater()) {
    return (<main className="container-fluid bg-secondary text-center">
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
          <p>Day {game.getDay()}:</p>
          <p>{game.getMessage()}</p>
          <button onClick={handleWaterYes}>Yes</button>
          <button onClick={handleWaterNo}>No</button>
        </div>
      </nav>
    </main>
    );
  }
  if (game.getHunting() || game.getFishing()) {
    return (<main className="container-fluid bg-secondary text-center">
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
          <p>Day {game.getDay()}:</p>
          <p>{game.getMessage()}</p>
          <button onClick={handleHuntingYes}>Yes</button>
          <button onClick={handleHuntingNo}>No</button>
        </div>
      </nav>
    </main>
    );
  }
  else {
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
            <p>Day {game.getDay()}:</p>
            <p>{game.getMessage()}</p>
            <button onClick={onNext}>Next</button>
          </div>
        </nav>
      </main>
    );
  }
}

function GameOver({ game }) {
  saveScore(game.getPercent(), game.getUserName());
  useEffect(() => {
    GameSimulator.broadcastEvent(game.getUserName(), GameEvent.End, {
      name: game.getUserName(),
      score: game.getPercent(),
      date: new Date().toLocaleDateString(),
      won: false,
    });
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
  saveScore(game.getPercent(), game.getUserName());
  useEffect(() => {
    GameSimulator.broadcastEvent(game.getUserName(), GameEvent.End, {
      name: game.getUserName(),
      score: game.getPercent(),
      date: new Date().toLocaleDateString(),
      won: true,
    });
  }, [game]);
  return (
    <main className="container-fluid bg-secondary text-center">
      <nav className="game-box" align="center">
        <nav className="game-over" align="center">
          <p>YOU MADE IT!!</p>
          <p>Welcome to Oregon, traveler!!</p>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </nav>
      </nav>
    </main>
  );
}

function AfterHunting({game, onNext, foodGot}) {
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
          <p>Day {game.getDay()}:</p>
          <p>After a long day of hunting you got {foodGot} food. Good work!</p>
          <button onClick={onNext}>Next</button>
        </div>
      </nav>
    </main>
  );
}

function AfterFishing({game, onNext, foodGot}) {
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
          <p>Day {game.getDay()}:</p>
          <p>After a long day of fishing you got {foodGot} fish. Good work!</p>
          <button onClick={onNext}>Next</button>
        </div>
      </nav>
    </main>
  );
}

async function saveScore(score, userName) {
  const date = new Date().toLocaleDateString();
  const newScore = { name: userName, score: score, date: date };

  await fetch('/api/score', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(newScore),
  });
}