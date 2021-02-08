import React from 'react';
import { Dialog, } from '@material-ui/core';
// import { useHistory } from 'react-router-dom';
// import ROUTES from '../utils/constants/routes';
// import { OShape } from './Tetriminoes';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faRedo, } from '@fortawesome/free-solid-svg-icons';

interface IPlayers {
  name: string;
  score: number;
}

interface IGameOverPrompt {
    open: boolean;
    players?: Array<IPlayers>
}


const LeaderBoard: React.FC<IGameOverPrompt> = ({open, players}) => {

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
            <p>LeaderBoard</p>
            {players?.map((player: any, i: number) => (
            <div key={i} className="p-2 my-2 grid grid-cols-2">
                <div>{player.name}</div>
                <div className="text-right">{player.score}</div>
            </div>
            ))}  
        </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}


export default LeaderBoard;
