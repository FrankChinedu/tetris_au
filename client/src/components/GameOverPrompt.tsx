import React, {useContext, useEffect, useState} from 'react';
import { Dialog, } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ROUTES from '../utils/constants/routes';
import { OShape } from './Tetriminoes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo, } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';

//  context
import { SingleGameContext } from '../context/singleGame';

interface IGameOverPrompt {
    open: boolean,
    handleClose: () => void,
    score: number;
}


const GameOverPrompt: React.FC<IGameOverPrompt> = ({open, handleClose, score}) => {

    const history = useHistory();
    const [text, setText] = useState<string>('');
    const { highestScore, twitterName, setTwitterName } = useContext(SingleGameContext);
    const url = process.env.REACT_APP_API_URL;

    const handleClick = () => {
        if (text) {
            setTwitterName(text);
        }
    }

    const handleChange = (e: any) => {
        if (e.currentTarget.value.includes(" ")) {
            e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
        }
        const word = e.target.value;
        setText(word);
    }

    const  preventSpace = (e: any) => {
        if (e.key === " ") {
            e.preventDefault();
          }
    }

    useEffect(() => {
        if(open && twitterName && score > 0) {
            axios.post(`${url}/leader-board?username=${twitterName}`, {
                username: twitterName,
                score: score
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, twitterName])

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
         <p>Your highest score is {highestScore}</p>
         {twitterName && <p className="border-2 border-yellow-600 mt-4 px-4 py-4 transform transition duration-500 hover:scale-75">
             <Link to={ROUTES.leaderboard} className="">leader Board</Link>
         </p>}

         {!!!twitterName && <div className="w-full my-3 m-auto bg-gray-700">
            <form className="shadow-md rounded px-8 pt-4 pb-4 mb-4">
                <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Please enter your twitter username if you would like to add your score to the leaderboard
                </label>
                <input onKeyDown={(e) => preventSpace(e)} onChange={handleChange} placeholder="twitter username" required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text" />
                </div>
                <div className="flex items-center justify-center">
                <button disabled={text.trim() === ''} onClick={handleClick} className="border border-blue-500 text-white font-bold py-2 px-4 disabled:text-gray-500 disabled:border-gray-500 disabled:cursor-not-allowed rounded focus:outline-none" >
                    Add to leaderboard
                </button>
                </div>
            </form>
        </div>}

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
