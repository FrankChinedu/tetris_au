import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';

import useWindowSize from '../../hooks/useWindowSize';

import ROUTES from '../../utils/constants/routes';


const MultiPlayerSteps: React.FC = () => {

  const [checked, setChecked] = useState<boolean>(false);
  const [checked2, setChecked2] = useState<boolean>(false);

  const { width } = useWindowSize();


  return (
    <div className="text-white h-full overflow-hidden">
      <nav className="grid grid-cols-3 md:py-10 py-2 md:px-14 px-5">
        <Link to={ROUTES.home} className="mr-auto p-3">
          <FontAwesomeIcon className="md:text-6xl" icon={faArrowLeft} />
        </Link>
        <h3 className="md:text-5xl text-lg col-span-2 mr-auto p-3">How to play Tetris</h3>
      </nav>
      <main className="md:max-w-3xl w-11/12 mx-auto px-1">
          {width && width < 500 ? (
            <div>
              <details className="my-10">
                <summary>How to play single Player</summary>
                <p className="montserrat my-10">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore beatae reprehenderit cupiditate impedit, iure minus nulla nam excepturi, nihil quo cumque aspernatur, nemo ipsam neque? Laboriosam perferendis consectetur eligendi sequi.</p>
              </details>
              <details className="my-10">
                <summary>How to play single Player</summary>
                <p className="montserrat my-10">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore beatae reprehenderit cupiditate impedit, iure minus nulla nam excepturi, nihil quo cumque aspernatur, nemo ipsam neque? Laboriosam perferendis consectetur eligendi sequi.</p>
              </details>
            </div>
          ) : (
            <ul className="overflow-hidden h-100">
              <li>
                <p
                  className="block h-100 w-20 float-left overflow-hidden mb-10 bg-gray-900 text-center transition-all"
                  onClick={() => {
                    checked2 && setChecked2(false)
                    setChecked(!checked)
                  }}
                >
                  Single Player</p>
                <div className={`montserrat block w-0 px-3 float-left overflow-hidden opacity-0 transition-all ${checked && ('w-72 opacity-100')}`}>
                  <h2>Slide 1</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur beatae voluptate neque inventore in nesciunt molestias eos soluta nulla explicabo?</p>
                </div>
              </li>
              <li>
                <p
                  className="block h-100 w-20 float-left overflow-hidden mb-10 bg-gray-900 text-center transition-all"
                  onClick={() => {
                    checked && setChecked(false)
                    setChecked2(!checked2)
                  }}
                >
                  Multi Player</p>
                <div className={`montserrat block w-0 px-3 float-left overflow-hidden opacity-0 transition-all ${checked2 && (' w-72 opacity-100')}`}>
                  <h2>Slide 1</h2>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis vitae nisi provident nobis dignissimos perferendis voluptate sint, corporis aliquam tenetur quia, obcaecati pariatur. Corporis totam debitis maiores magni aperiam minus.</p>
                </div>
              </li>
            </ul>
          )}
      </main>
    </div>
  );
};




export default MultiPlayerSteps;
