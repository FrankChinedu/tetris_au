import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTimesCircle } from '@fortawesome/free-solid-svg-icons';


import ROUTES from '../../utils/constants/routes';

const url = process.env.REACT_APP_API_URL;


const Leaderboard: React.FC = () => {

    const [players, setPlayers] = useState<any>([]);
    const [hasNext, setHasNext] = useState<boolean>(false);
    const [totalPlayers, setTotalPlayer] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [error, setError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const clearError = () => {
    setError(false);
    setErrorMsg('');
}

  const fetchPlayers = () => {
    axios.get(`${url}/leader-board?limit=10&page=${page}`)
    .then((res) => {
        const { docs, hasNextPage, totalDocs,  } = res.data.data;
        setPlayers((prev: any) => [...prev, ...docs]);
        setHasNext(hasNextPage);
        setTotalPlayer(totalDocs);
        setPage((prev) => prev + 1);
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


  useEffect(() => {
    fetchPlayers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchNext = () => {
    if(hasNext) {
      setPage((prev) => prev + 1);
    }
  }

  

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
            <>
            <div className="grid grid-cols-3 md:grid-cols-4 py-5 md:px-2">
                <div>Rank</div>
                <div>Player</div>
                <div>Total Points</div>
                <div className="hidden md:block">Total matches played</div>
            </div>
            <div className="bg-gray-800 md:px-5">
                <InfiniteScroll
                dataLength={totalPlayers as any} 
                next={fetchNext}
                hasMore={hasNext}
                loader={<h4> </h4>}
                >
                    {players.map((player: any, i:number) => (
                        <div className="grid grid-cols-3 md:grid-cols-4 px-2 py-5 border-b border-gray-300 border-opacity-10 my-py" key={i}>
                            <div>{++i}</div>
                            <div className="text-green-500 hover:text-yellow-300 transition-colors"><a href={player.twitterUrl} target="_blank" rel="noopener noreferrer">{player.username}</a></div>
                            <div>{player.score}</div>
                            <div className="hidden md:block">{player.totalGamesPlayed}</div>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        </>
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
