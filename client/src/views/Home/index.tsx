import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../utils/constants/routes';

const Home: React.FC = () => (
    <div className="text-white h-full">
      <nav className="p-4">
        <h3 className="text-5xl text-center">Tetris</h3>
      </nav>
      <main className="w-11/12 md:w-7/12 my-16 grid grid-cols-1 md:grid-cols-2 justify-center content-center text-center h-80 gap-10 mx-auto montserrat">
        <Link to={ROUTES.singleGame} className="border-2 border-green-300 px-7 py-4 transform transition duration-500 hover:scale-75">Play Single Player</Link>
        <Link to={ROUTES.multiGameSteps} className="border-2 border-yellow-300 px-7 py-4 transform transition duration-500 hover:scale-75">Play Multiple Players</Link>
        <Link to={ROUTES.howToPlay} className="border-2 border-red-300 px-7 py-4 transform transition duration-500 hover:scale-75">How to Play tetris</Link>
        <Link to={ROUTES.leaderboard} className="border-2 border-yellow-600 px-7 py-4 transform transition duration-500 hover:scale-75">Leaderboard</Link>
        {/* <Link to={ROUTES.settings} className="border-2 border-blue-300 px-7 py-4 transform transition duration-500 hover:scale-75">Settings</Link> */}
      </main>
      <footer className="absolute bottom-0 montserrat w-full text-center py-4">
        Built with love by&nbsp;
        <a href="https://twitter.com/frankieetchy" target="_blank" rel="noopener noreferrer">@frankie</a>&nbsp;and 
        <a href="https://twitter.com/ilizette7" target="_blank" rel="noopener noreferrer">&nbsp;@ilizette</a>
      </footer>
    </div>
  );


export default Home;
