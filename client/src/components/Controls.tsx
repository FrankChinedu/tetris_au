import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faArrowDown, faSync } from '@fortawesome/free-solid-svg-icons';

interface IControls {
  control: any,
  dropDown: any,
}

const Controls: React.FC <IControls> = ({ control, dropDown }) => {

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
        <div className="grid grid-cols-2 items-center justify-items-center">
         <div className="flex flex-col items-center">
          <div className="grid grid-cols-2 gap-5 my-5">
              <div
                className="w-20 h-20 shadow-inner border border-white focus:outline-none flex justify-center items-center"
                onClick={leftClick}
              >
                <FontAwesomeIcon className="md:text-2xl" icon={faArrowLeft} />
              </div>
              <button
                className="w-20 h-20 shadow-inner border border-white focus:outline-none flex justify-center items-center"
                onClick={rightClick}
              >
                <FontAwesomeIcon className="md:text-2xl" icon={faArrowRight} />
              </button>
          </div>
          <button
            className="w-20 h-20 shadow-inner border border-white focus:outline-none flex justify-center items-center"
            onMouseDown={downClick}
            onMouseUp={downMouseUp}
          >
            <FontAwesomeIcon className="md:text-2xl" icon={faArrowDown} />
          </button>
         </div>
         <div>
          <button
            className="w-20 h-20 shadow-inner border border-white focus:outline-none flex justify-center items-center"
            onClick={upClick}
          >
              <FontAwesomeIcon className="md:text-2xl" icon={faSync} />
            </button>
         </div>
        </div>
      );
}

export default Controls;
