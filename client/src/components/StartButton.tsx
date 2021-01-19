import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
interface IBtn {
  callback: () => void,
}
const StartButton: React.FC<IBtn> = ({ callback }) => {
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
    callback();
  }
  const handlePause = () => {
    setPlaying(false);
    // callback();
  }
  return (
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
  );
}

export default StartButton;
