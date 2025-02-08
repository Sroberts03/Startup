import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return (
      <div className='body bg-dark text-light'>
        <header class="container-fluid">
            <nav class="navbar fixed-top navbar-dark">
                <a class="navbar-brand" href="index.html">Oregon Trail Online<sup>&reg;</sup></a>
                <menu class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="start_game.html">Play</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="leader_board.html">Leader Board</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="about.html">About</a>
                    </li>
                </menu>
            </nav>
        </header>
  
        <main>App components go here</main>
  
        <footer class="bg-dark text-white-50">
            <div class="container-fluid">
                <span class="text-reset">Sam Roberts</span>
                <a href="https://github.com/Sroberts03/Startup">GitHub</a>\
            </div>
        </footer>
      </div>
    );
}