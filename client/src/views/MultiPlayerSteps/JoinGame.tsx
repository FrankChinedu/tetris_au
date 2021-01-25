import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


import { UserContext } from '../../context/user';
import { SocketContext } from '../../context/socket';


import ROUTES from '../../utils/constants/routes';
import SOCKET_EVENTS from '../../utils/constants/socketEvent';

// interface IFirstStep {
//     setAction: (value: string) => void
//   }
  

const JoinGame: React.FC  = () => {
  

    const {gameId, setGameId, setUsername, username, setGameInfo } = useContext(UserContext);
    const history = useHistory();
    const [errorMsg, setErrorMsg] = useState<string>('');

    const { socket } = useContext(SocketContext);

    const clearError = () => {
      setErrorMsg('');
  }

    const playGame = () => {
      if(gameId && username) {
        socket?.emit(SOCKET_EVENTS.JOIN_TETRIS_GAME_SESSION, gameId, username)
      }
    }

    useEffect(() => {
      socket?.on(SOCKET_EVENTS.TETRIS_GAME_SESSION_DATA, (res: any) => {
          setGameInfo(res);
          setTimeout(() => {
              if(res.gameId === gameId) {
                  history.push(ROUTES.multiGame);
              }else {
                  setErrorMsg('An unknown error occured');
                  localStorage.clear();
              }
          }, 1000)
      });

      socket?.on(SOCKET_EVENTS.INVALID_TETRIS_GAME_ROOM, (res: any) => {
        setErrorMsg('Game ID is invalid')
      });

      socket?.on(SOCKET_EVENTS.USERNAME_TAKEN_ERROR, (res: any) => {
        setErrorMsg('Username has been taken, please try another name')
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



    const  preventSpace = (e: any) => {
      if (e.key === " ") {
          e.preventDefault();
        }
  }
    
    return (
        <div className="text-white montserrat w-11/12 mx-auto mt-10">
          {errorMsg && (
            <div className="bg-red-300 p-3 flex justify-between my-7 transition duration-500 ease-in-out">
                <p>{errorMsg}</p>
                <button onClick={clearError}><FontAwesomeIcon className="md:text-2xl" icon={faTimesCircle} /></button>
            </div>
          )}
          <form className="grid md:grid-cols-2 grid-cols-1 gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="bg-indigo-600 py-2 px-5">
                <input
                    type="text"
                    className="focus:outline-none bg-transparent placeholder-white w-full"
                    placeholder="Please enter your username"
                    value={username}
                    onChange={(e) => {
                      if (e.currentTarget.value.includes(" ")) {
                        e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
                      }
                      setUsername(e.target.value)
                    }}
                    onKeyDown={(e) => preventSpace(e)}
                />
              </div>
              <div className="bg-indigo-600 py-2 px-5">
                <input
                    type="text"
                    className="focus:outline-none bg-transparent placeholder-white w-full"
                    placeholder="enter the ID shared with you"
                    value={gameId}
                    onChange={(e) => {
                      if (e.currentTarget.value.includes(" ")) {
                        e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
                      }
                      setGameId(e.target.value)
                    }}
                    onKeyDown={(e) => preventSpace(e)}
                />
              </div>
            <button
                className="bg-transparent border border-indigo-600 mt-2 py-2 focus:outline-none rounded disabled:text-gray-500 disabled:cursor-not-allowed"
                disabled={username.trim() === '' || gameId.trim() === ''}
                onClick={playGame}
            >
                Join Game
            </button>
          </form>
        </div>
      );
}


export default JoinGame;
