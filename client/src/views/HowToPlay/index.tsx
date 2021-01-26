import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';

import ROUTES from '../../utils/constants/routes';


const MultiPlayerSteps: React.FC = () => {


  return (
    <div className="text-white h-full">
      <nav className="grid grid-cols-3 md:py-10 py-2 md:px-14 px-5">
        <Link to={ROUTES.home} className="mr-auto p-3">
          <FontAwesomeIcon className="md:text-6xl" icon={faArrowLeft} />
        </Link>
        <h3 className="md:text-5xl text-lg col-span-2 mr-auto p-3">How to play Tetris</h3>
      </nav>
      <main className="md:max-w-3xl max-w-lg mx-auto px-1 montserrat">
        
      </main>
    </div>
  );
};




export default MultiPlayerSteps;
