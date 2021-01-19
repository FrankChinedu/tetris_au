import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopCircle } from '@fortawesome/free-solid-svg-icons';


const QuitButton: React.FC = () => {

    const history = useHistory();

    const handleQuit = () => {
        history.push(`/`);
    }

    return (
        <button onClick={handleQuit} className="focus:outline-none">
          <FontAwesomeIcon icon={faStopCircle} size="2x" />
        </button>
      );
}

export default QuitButton;
