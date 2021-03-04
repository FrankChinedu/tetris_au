import React, { useEffect, useState, useContext } from 'react';
import ReactGA from 'react-ga';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';
import './settings.css';

//  context
import { SingleGameContext } from '../../context/singleGame';


import ROUTES from '../../utils/constants/routes';


const Settings: React.FC = () => {
  
  const { setSpeed, speed } = useContext(SingleGameContext);
  const [range, setRange] = useState<number>(speed);


  useEffect(() => {
    
    if(range < 100) {
      setRange(100)
    }

    if(range > 1000) {
      setRange(1000)
    }

    setSpeed(range)
  }, [range, setSpeed]);

// React google analytics
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div className="text-white h-full overflow-hidden">
      <nav className="grid grid-cols-3 md:py-10 py-2 md:px-14 px-5">
        <Link to={ROUTES.home} className="mr-auto p-3">
          <FontAwesomeIcon className="md:text-6xl" icon={faArrowLeft} />
        </Link>
        <h3 className="md:text-5xl text-lg col-span-2 mr-auto p-3">Settings</h3>
      </nav>
      <main className="md:max-w-3xl w-11/12 mx-auto px-1 montserrat mt-5">
        <section className="grid grid-cols-2 mb-5">
          <p className="sm:text-xl ">Game Sound</p>
          <p>
            <input type="checkbox" id="switch" className="invisible w-0 h-0" />
            <label htmlFor="switch" className="cursor-pointer w-16 h-8 sm:w-24 sm:h-12 bg-gray-500 block rounded-full relative -top-6" />
          </p>
        </section>
        <section className="grid grid-cols-2 mb-5 items-center">
          <p className="sm:text-xl ">Game Speed</p>
          <div>
            <input type="range" min="100" max="1000" value={speed} onChange={(e) => setRange(Number(e.target.value))} className="appearance-none w-full h-3 rounded-md outline-none bg-gray-500 opacity-70 transition-opacity duration-1000 hover:opacity-100" />
            <div className="flex justify-between text-sm mt-3">
              <p>Slow</p>
              <p>Fast</p>
            </div>
          </div>
          <small>(Only for Single player)</small>
        </section>
      </main>
    </div>
  );
};



export default Settings;
