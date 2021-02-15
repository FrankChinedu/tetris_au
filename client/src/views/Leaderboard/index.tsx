import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';


import ROUTES from '../../utils/constants/routes';

const url = process.env.REACT_APP_API_URL;


const Leaderboard: React.FC = () => {

    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);


  useEffect(() => {
    // axios.get(`${url}/`)
  }, []);

  return (
    <div className="text-white h-full overflow-hidden">
      <nav className="grid grid-cols-3 md:py-10 py-2 md:px-14 px-5">
        <Link to={ROUTES.home} className="mr-auto p-3">
          <FontAwesomeIcon className="md:text-6xl" icon={faArrowLeft} />
        </Link>
        <h3 className="md:text-5xl text-lg col-span-2 mr-auto p-3">Tetris Leaderboard</h3>
      </nav>
      <main className="w-11/12 mx-auto px-1 montserrat md:max-w-5xl">
        <div className="grid grid-cols-3 md:grid-cols-5 py-5 px-2">
            <div>Rank</div>
            <div>Player</div>
            <div>Total Points</div>
            <div className="hidden md:block">Twitter Link</div>
            <div className="hidden md:block">Total matches played</div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 bg-gray-700 px-2 py-5 border border-gray-300 border-opacity-25 my-1">
            <div>Name</div>
            <div>Name</div>
            <div>Name</div>
            <div>Name</div>
            <div>Name</div>
        </div>
      </main>
    </div>
  );
};




export default Leaderboard;
