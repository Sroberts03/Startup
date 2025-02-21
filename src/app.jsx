import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { StartGame } from './play/start_game';
import { Scores } from './scores/scores';
import { About } from './about/about';
import { AuthState } from './login/authState';

function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    return (
    <BrowserRouter>
      <div className='body bg-dark text-light'>
        <header className="container-fluid">
            <nav className="navbar fixed-top navbar-dark">
                <div className='navbar-brand'>
                    Oregon Trail Online<sup>&reg;</sup>
                </div>
                <menu className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to=''>
                            Login
                        </NavLink>
                    </li>
                    {authState === AuthState.Authenticated && (
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='start_game'>
                                Play
                            </NavLink>
                        </li>
                    )}
                    {authState === AuthState.Authenticated && (
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='scores'>
                                Leader Board
                            </NavLink>
                        </li>
                    )}
                    <li className="nav-item">
                        <NavLink className="nav-link" to='about'>
                            About
                        </NavLink>
                    </li>
                </menu>
            </nav>
        </header>
  
        <Routes>
            <Route
                path='/'
                element={
                    <Login
                        userName={userName}
                        authState={authState}
                        onAuthChange={(userName, authState) => {
                            setAuthState(authState);
                            setUserName(userName);
                        }}
                    />
                }
                exact
            />
            <Route path='/start_game' element={<StartGame userName={userName} />} />
            <Route path='/scores' element={<Scores />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
  
        <footer className="bg-dark text-white-50">
            <div className="container-fluid">
                <span className="text-reset">Sam Roberts</span>
                <a href="https://github.com/Sroberts03/Startup">GitHub</a>
            </div>
        </footer>
      </div>
    </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;