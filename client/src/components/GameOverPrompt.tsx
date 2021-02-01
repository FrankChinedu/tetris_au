import React from 'react';
import { Dialog, } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ROUTES from '../utils/constants/routes';


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
        <div id="game-over-dialog" className="p-5 text-center text-3xl">Game Over</div>
        <div className="text-center mb-5">
         Your score is {score}.
        </div>
        <div className="text-right">
          <button onClick={handleClose} className="p-2 border-green-300 mr-3 border">
            Restart Game
          </button>
          <button onClick={() => {
              history.push(ROUTES.home)
          }} className="p-2 border-red-300 mr-3 border">
            Quit
          </button>
        </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}


export default GameOverPrompt;
