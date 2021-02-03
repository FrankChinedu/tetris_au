import React from 'react';
import { Dialog, } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ROUTES from '../utils/constants/routes';
import { OShape } from './Tetriminoes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo, } from '@fortawesome/free-solid-svg-icons';

interface IGameOverPrompt {
    open: boolean,
    handleClose: () => void,
    score: number
}


const GameOverPrompt: React.FC<IGameOverPrompt> = ({open, handleClose, score}) => {

    const history = useHistory();

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="game-over-dialog"
        disableBackdropClick
        disableEscapeKeyDown
      >
        <div className="bg-gray-800 text-white montserrat p-5">
          <div className="flex items-center justify-center transform skew-y-12">
            <OShape />
          </div>
        <div id="game-over-dialog" className="p-5 text-center text-3xl">Game Over</div>
        <div className="text-center mb-5">
         <p>Your score is {score}</p>
         <p>Your highest score is {score}</p>
        </div>
        <div className="text-right">
          <button onClick={() => {
              history.push(ROUTES.home)
          }} className="p-2 text-white mr-3 text-xl">
            Quit Game
          </button>
          <button onClick={handleClose} className="p-2 text-white mr-3 text-3xl">
            <FontAwesomeIcon icon={faRedo} color="white" />
          </button>
        </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}


export default GameOverPrompt;
