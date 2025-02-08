import React from 'react';
import './game_play.css';

export function GamePlay() {
  return (
    <main className="container-fluid bg-secondary text-center">      
    <nav className="game-box" align="center">
        <div className="cloud" style={{ animationDelay: '0s' }}></div>
        <div className="cloud" style={{ animationDelay: '3s', top: '15%' }}></div>
        <div className="cloud" style={{ animationDelay: '6s', top: '5%' }}></div>
        <div className="wagon">
                <div className="ox"></div>
                <div className="body">
            <div className="cover"></div>
            <div className="wheel left"></div>
            <div className="wheel right"></div>
        </div>
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