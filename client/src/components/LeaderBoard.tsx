import React from 'react';
import { Dialog, } from '@material-ui/core';
// import { useHistory } from 'react-router-dom';
// import ROUTES from '../utils/constants/routes';
// import { OShape } from './Tetriminoes';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faRedo, } from '@fortawesome/free-solid-svg-icons';

interface IGameOverPrompt {
    open: boolean,
}


const LeaderBoard: React.FC<IGameOverPrompt> = ({open, }) => {

    // const history = useHistory();

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        aria-labelledby="game-over-dialog"
        disableBackdropClick
        disableEscapeKeyDown
      >
        <div className="bg-gray-800 text-white montserrat p-5">
        <div id="game-over-dialog" className="p-5 text-center text-3xl">Game Over</div>
        <div className="text-center mb-5">
            LeaderBoard

            list of all users in a game here
        </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}


export default LeaderBoard;
