import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';
import './settings.css';


import ROUTES from '../../utils/constants/routes';


const Settings: React.FC = () => {

  const [range, setRange] = useState<number | string>(1000);
  const [username, setUsername] = useState<string>("");

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
      <main className="md:max-w-3xl w-11/12 mx-auto px-1 montserrat">
        <div className="">
          <section className="grid grid-cols-2 mb-5">
            <p className="text-xl">Game Sound</p>
            <p>
              <input type="checkbox" id="switch" className="invisible w-0 h-0" />
              <label htmlFor="switch" className="cursor-pointer w-24 h-12 bg-gray-500 block rounded-full relative -top-6" />
            </p>
          </section>
          <section className="grid grid-cols-2 mb-5">
            <p className="text-xl">Game Speed</p>
            <div>
              <input type="range" min="1000" max="10000" value={range} onChange={(e) => setRange(e.target.value)} className="appearance-none w-full h-3 rounded-md outline-none bg-gray-500 opacity-70 transition-opacity duration-1000 hover:opacity-100" />
              <p>Value: {range}</p>
            </div>
            <small>(Only for Single player)</small>
          </section>
          <section className="grid grid-cols-2 mb-5">
            <p className="text-xl">Change Twitter Username</p>
            <div>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="focus:outline-none bg-black border border-red-300 p-2 block w-full mb-1" />
              <small>don't add @ just add your username, example ilizette7</small>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};




export default Settings;
