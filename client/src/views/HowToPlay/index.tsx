import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';


import ROUTES from '../../utils/constants/routes';


const HowToPlay: React.FC = () => {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div className="text-white h-full overflow-hidden">
      <nav className="grid grid-cols-3 md:py-10 py-2 md:px-14 px-5">
        <Link to={ROUTES.home} className="mr-auto p-3">
          <FontAwesomeIcon className="md:text-6xl" icon={faArrowLeft} />
        </Link>
        <h3 className="md:text-5xl text-lg col-span-2 mr-auto p-3">How to play Tetris</h3>
      </nav>
      <main className="md:max-w-3xl w-11/12 mx-auto px-1">
        <div className="flex justify-center items-center">
          {/* <details className="my-10">
            <summary className="text-3xl p-2">How to play single Player</summary>
            <p className="montserrat my-10">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore beatae reprehenderit cupiditate impedit, iure minus nulla nam excepturi, nihil quo cumque aspernatur, nemo ipsam neque? Laboriosam perferendis consectetur eligendi sequi.</p>
          </details>
          <details className="my-10">
            <summary className="text-3xl p-2">How to play multi Player</summary>
            <p className="montserrat my-10">it amet consectetur adipisicing elit. Tempore beatae reprehenderit cupiditate impedit, iure minus nulla nam excepturi, nihil quo cumque aspernatur, nemo ipsam neque? Laboriosam perferendis consectetur eligendi sequi.</p>
          </details> */}

          <div className="montserrat text-center text-4xl font-semibold">WIP: We're working on this!</div>
        </div>
      </main>
    </div>
  );
};




export default HowToPlay;
