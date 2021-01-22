import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


const QuitButton: React.FC = () => {

    const history = useHistory();

    const handleQuit = () => {
        history.push(`/`);
    }

    return (
        <button onClick={handleQuit} className="focus:outline-none md:ml-0">
          <FontAwesomeIcon icon={faSignOutAlt} size="2x" flip="both" />
        </button>
      );
}

export default QuitButton;
