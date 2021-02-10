import React, { useState } from 'react';
import { Dialog, } from '@material-ui/core';
import COLORS from '../utils/constants/colors';
import useWindowSize from '../hooks/useWindowSize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, } from '@fortawesome/free-solid-svg-icons';

interface IPlayers {
  name: string;
  score: number;
}

interface IGameOverPrompt {
    open: boolean;
    players?: Array<IPlayers>;
    hasNotEnded?: boolean;
}


const LeaderBoard: React.FC<IGameOverPrompt> = ({open, players, hasNotEnded}) => {

  const [windowWidth, setWidth] = useState<any>('sm');

  const { width } = useWindowSize();

  if(width && width < 400) {
    setWidth('xs');
  }

  const randomColors: any = () => {
    return Math.floor(Math.random() * (COLORS.length - 1))
  }

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth={windowWidth}
        open={open}
        aria-labelledby="game-over-dialog"
        disableBackdropClick
        disableEscapeKeyDown
      >
        <div className="bg-gray-900 montserrat p-2 text-white">
        <div id="game-over-dialog" className="py-4 text-center text-3xl">Leaderboard</div>
        <div>
          {hasNotEnded && (
            <p>Hey the game has not ended. Hang on there till the game is over to see the final winner</p>
          )}
          <div className="sm:w-4/12 w-10/12 bg-gray-800 text-center rounded shadow-2xl h-44 p-4 flex flex-col mx-auto">
              <div className="text-right my-3 text-2xl"><FontAwesomeIcon icon={faTrophy} color="yellow" /></div>
              <div>{players && players[0]?.name}</div>
              <div className="font-semibold">{players && players[0]?.score}</div>
              <div className="text-green-300 sm:text-xl my-3">Rank - 1st</div>
          </div>
        </div>
        <div className="text-center mb-5 w-10/12 mx-auto max-h-100 overflow-y-auto">
          <div className="p-2 my-2 grid grid-cols-2 font-bold">
            <div>Username</div>
            <div>Score</div>
          </div>
            {players?.map((player: any, i: number) => (
            <div key={i} className={`p-2 my-2 grid grid-cols-2 bg-blue-200 rounded-lg font-medium text-black ${COLORS[randomColors()]}`}>
                <div>{player.name}</div>
                <div className="">{player.score}</div>
            </div>
            ))}  
        </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}


export default LeaderBoard;
