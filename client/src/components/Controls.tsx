import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faArrowDown, faSync } from '@fortawesome/free-solid-svg-icons';

import useLongPress from '../hooks/useLongPress';

interface IControls {
  control: any,
  dropDown: any,
}
const ms = 50;
const Controls: React.FC <IControls> = ({ control, dropDown }) => {
    const leftLongPress = useLongPress(() => {
        const e = {key: 'ArrowLeft'}
        control(e);
    }, ms);

    const rightLongPress = useLongPress(() => {
        const e = {key: 'ArrowRight'}
        control(e);
    }, ms);

    const upLongPress = useLongPress(() => {
        const e = {key: 'ArrowUp'}
        control(e);
    }, ms);

  const leftClick = (event: any) => {
    event.preventDefault();
    const e = {key: 'ArrowLeft'}
    control(e);
  }
  const rightClick = () => {
    const e = {key: 'ArrowRight'}
    control(e);
  }
  const downClick = () => {
    const e = {key: 'ArrowDown'}
    control(e);
  }
  const downMouseUp = () => {
    const e = {key: 'ArrowDown'}
    dropDown(e);
  }
  const upClick = () => {
    const e = {key: 'ArrowUp'}
    control(e);
  }
    return (
        <div className="flex w-11/12 sm:w-full justify-evenly items-center">
         <div className="flex flex-col items-center">
          <div className="grid grid-cols-2 gap-5 my-5">
              <button {...leftLongPress}
                className="w-20 h-20 shadow-inner border border-indigo-600 focus:outline-none flex justify-center items-center"
                onClick={leftClick}
              >
                <FontAwesomeIcon className="md:text-2xl" icon={faArrowLeft} />
              </button>
              <button {...rightLongPress}
                className="w-20 h-20 shadow-inner border border-red-300 focus:outline-none flex justify-center items-center"
                onClick={rightClick}
              >
                <FontAwesomeIcon className="md:text-2xl" icon={faArrowRight} />
              </button>
          </div>
          <button
            className="w-20 h-20 shadow-inner border border-yellow-300 focus:outline-none flex justify-center items-center"
            onMouseDown={downClick}
            onMouseUp={downMouseUp}
          >
            <FontAwesomeIcon className="md:text-2xl" icon={faArrowDown} />
          </button>
         </div>
         <div className="md:px-2">
          <button {...upLongPress}
            className="w-20 h-20 shadow-inner border border-blue-500 focus:outline-none flex justify-center items-center"
            onClick={upClick}
          >
              <FontAwesomeIcon className="md:text-2xl" icon={faSync} />
            </button>
         </div>
        </div>
      );
}

export default Controls;
