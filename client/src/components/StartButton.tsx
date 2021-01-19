import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
interface IBtn {
  callback: () => void,
  pause: () => void,
  play: () => void,
}
const StartButton: React.FC<IBtn> = ({ callback, pause, play }) => {
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const handleStart = () => {
    setStarted(true);
    setPlaying(true);
    callback();
  }
  const handlePlay = () => {
    setPlaying(true);
    play();
    
  }
  const handlePause = () => {
    setPlaying(false);
    pause();
  }
  return (
    <>
      {!started ? (
        <button onClick={handleStart} className="focus:outline-none">
        <FontAwesomeIcon icon={faPlayCircle} size="2x" />
      </button>
      ) : (
          <>
          {!playing ? (
            <button onClick={handlePlay} className="focus:outline-none">
              <FontAwesomeIcon icon={faPlayCircle} size="2x" />
            </button>
          ) : (
            <button onClick={handlePause} className="focus:outline-none">
              <FontAwesomeIcon icon={faPauseCircle} size="2x" />
            </button>
          )}
          </>
      )}
    </>
  );
}

export default StartButton;
