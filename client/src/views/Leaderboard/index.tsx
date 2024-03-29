import React, { useEffect, useState, useContext } from 'react';
import ReactGA from 'react-ga';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

// Context
import { SingleGameContext } from '../../context/singleGame';



import ROUTES from '../../utils/constants/routes';

const url = process.env.REACT_APP_API_URL;


const Leaderboard: React.FC = () => {

    const [players, setPlayers] = useState<any>([]);
    const [hasNext, setHasNext] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [error, setError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [playerRank, setPlayerRank] = useState<any>();
    const { twitterName, } = useContext(SingleGameContext);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const clearError = () => {
    setError(false);
    setErrorMsg('');
}

  const fetchPlayers = (page: number) => {

    axios.get(`${url}/leader-board?limit=10&page=${page}${twitterName !== '' ? (`&username=${twitterName}`):``}`)
    .then((res) => {
        const { docs, hasNextPage, rank } = res.data.data;
        setPlayers((prev: any) => [...prev, ...docs]);
        setHasNext(hasNextPage);
        setPlayerRank(rank);
        // setPage((prev) => prev + 1);
    }).catch((err) => {
      setError(true);
      if (err.toString() === 'Error: Network Error') {
        return setErrorMsg('Please check your network connection and try again');
      }
      const { error } = err.response.data;
      const er = (error && error.split(':')) || ['','an Error Occured'];
      setErrorMsg(er[1]);
    })
  }

  const calcRank = (num: number) => {
      const string = String(num);
      let arr = string.split('');
      const length = arr.length;
      let lastItem= arr[length - 1];
      let res = 'th';
      
      switch (+lastItem) {
          case 1:
              res = 'st'
              break;
          case 2:
              res = 'nd'
              break;
          case 3:
              res = 'rd'
              break;
          default:
              break;
      }
      return `${num} ${res}`;
  }

  useEffect(() => {
    fetchPlayers(page);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  

  return (
    <div className="text-white h-full overflow-hidden">
      <nav className="grid grid-cols-3 md:py-10 py-2 md:px-14 px-5">
        <Link to={ROUTES.home} className="mr-auto p-3">
          <FontAwesomeIcon className="md:text-6xl" icon={faArrowLeft} />
        </Link>
        <h3 className="md:text-5xl text-lg col-span-2 mr-auto p-3">Tetris Leaderboard</h3>
      </nav>
      <main className="w-11/12 mx-auto px-1 montserrat md:max-w-4xl text-center text-xs md:text-base">
        {error && (
          <div className="bg-red-300 p-3 flex justify-between my-7 transition duration-500 ease-in-out">
              <p>{errorMsg}</p>
              <button onClick={clearError}><FontAwesomeIcon className="md:text-2xl" icon={faTimesCircle} /></button>
          </div>
        )}
        {players.length ? (
          <div className="">
            <div className="grid grid-cols-3 md:grid-cols-4 py-5 md:px-2">
                <div>Rank</div>
                <div>Player</div>
                <div>Total Points</div>
                <div className="hidden md:block">Total matches played</div>
            </div>
            <div className="bg-gray-800 md:px-5 overflow-y-auto h-100">
              {players.map((player: any, i:number) => (
                  <div className="grid grid-cols-3 md:grid-cols-4 px-2 py-5 border-b border-gray-300 border-opacity-10 my-py" key={i}>
                      <div>{++i}</div>
                      <div className="text-green-500 hover:text-yellow-300 transition-colors"><a href={player.twitterUrl} target="_blank" rel="noopener noreferrer">{player.username}</a></div>
                      <div>{player.score}</div>
                      <div className="hidden md:block">{player.totalGamesPlayed}</div>
                  </div>
              ))}
            </div>
            {playerRank && (
              <div className="bg-gray-900 py-3 grid grid-cols-3 md:grid-cols-4 text-xs items-center">
                <div className="text-center pl-10">
                  YOUR RANK:
                  <div>{calcRank(playerRank.rank)}</div>
                </div>
                <div>{playerRank.username}</div>
                <div>{playerRank.score}</div>
                <div className="hidden md:block">{playerRank.totalGamesPlayed}</div>
              </div>
            )}
              <div className="my-5">
                <button 
                onClick={() => {
                  setPage((prev) => prev + 1)
                }}
                disabled={!hasNext}
                className="focus:outline-none disabled:cursor-not-allowed disabled:border-gray-500 disabled:text-gray-500 border p-5"
                >Load More</button>
              </div>
          </div>
        ) : (
            <>
            <div>There's no Leaderboard currently</div>
            </>
        )}
      </main>
    </div>
  );
};




export default Leaderboard;
