import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
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

    ReactGA.event({
      category: 'User',
      action: 'Started single player'
  });
  }
  const handlePlay = () => {
    setPlaying(true);
    play();
    
  }
  const handlePause = () => {
    setPlaying(false);
    pause();
  }

  useEffect(() => {
    window.addEventListener("blur", handlePause)

    return () => {
      window.removeEventListener("blur", handlePause)
    }
  })


  return (
    <>
      {!started ? (
        <button onClick={handleStart} className="focus:outline-none">
        <FontAwesomeIcon icon={faPlayCircle} size="2x" color="green" />
      </button>
      ) : (
          <>
          {!playing ? (
            <button onClick={handlePlay} className="focus:outline-none">
              <FontAwesomeIcon icon={faPlayCircle} size="2x" color="green" />
            </button>
          ) : (
            <button onClick={handlePause} className="focus:outline-none">
              <FontAwesomeIcon icon={faPauseCircle} size="2x" color="yellow" />
            </button>
          )}
          </>
      )}
    </>
  );
}

export default StartButton;
