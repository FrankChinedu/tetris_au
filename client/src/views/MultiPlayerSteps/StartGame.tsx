import React, { useEffect, useContext, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../../context/user';
import { SocketContext } from '../../context/socket';

import SOCKET_EVENTS from '../../utils/constants/socketEvent';

import ROUTES from '../../utils/constants/routes';


const SGame: React.FC  = () => {

    const { gameId, username, setGameInfo } = useContext(UserContext);
    const { socket } = useContext(SocketContext);
    const history = useHistory();
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(false);

    const createGameSession = () => {
        if(gameId && username) {
            socket?.emit(SOCKET_EVENTS.NEW_TETRIS_GAME_SESSION, gameId, username)
        }
    }

    const clearError = () => {
        setErrorMsg('');
    }

    useEffect(() => {
        socket?.on(SOCKET_EVENTS.TETRIS_GAME_SESSION_DATA, (res: any) => {
            setGameInfo(res);
            setDisabled(true);
            setTimeout(() => {
                if(res.gameId === gameId) {
                    history.push(ROUTES.multiGame);
                }else {
                    setErrorMsg('An unknown error occured');
                    localStorage.clear();
                }
            }, 500)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(errorMsg) {
            setTimeout(() => {
                history.push(ROUTES.multiGameSteps);
            }, 2000) 
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorMsg]);

    return (
        <div className="text-white montserrat w-11/12 mx-auto text-center mt-14">
            {errorMsg && (
                <div className="bg-red-300 p-3 flex justify-between my-7 transition duration-500 ease-in-out">
                    <p>{errorMsg}</p>
                    <button onClick={clearError}><FontAwesomeIcon className="md:text-2xl" icon={faTimesCircle} /></button>
                </div>
            )}
            <button
            className="bg-transparent border border-indigo-600 p-5 focus:outline-none rounded disabled:text-gray-500 disabled:cursor-not-allowed"
            disabled={ !!!gameId || disabled }
            onClick={createGameSession}
        >
           <FontAwesomeIcon icon={faPlay} /> <span className="pl-3">Start Game</span>
        </button>
        </div>
      );
}

export default SGame;
