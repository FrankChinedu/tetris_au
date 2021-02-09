import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


import { UserContext } from '../../context/user';
import { SocketContext } from '../../context/socket';


import ROUTES from '../../utils/constants/routes';
import SOCKET_EVENTS from '../../utils/constants/socketEvent';
  
const JoinGame: React.FC  = () => {

    const {gameId, setGameId, setUsername, username, setGameInfo } = useContext(UserContext);
    const history = useHistory();
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [_userName, _setUserName] = useState(username);
    const [_gameID, _setGameID] = useState(gameId);

    const { socket } = useContext(SocketContext);

    const clearError = () => {
      setErrorMsg('');
  }

    const playGame = () => {
      if(_gameID && _userName) {
        socket?.emit(SOCKET_EVENTS.JOIN_TETRIS_GAME_SESSION, _gameID, _userName)
        setGameId(_gameID);
      }
    }

    useEffect(() => {
      socket?.on(SOCKET_EVENTS.TETRIS_GAME_SESSION_DATA, (res: any) => {
          setGameInfo(res);
          setTimeout(() => {
              if(res.gameId === _gameID) {
                setGameId(_gameID);
                setUsername(_userName);
                  history.push({
                    pathname: ROUTES.multiGame,
                    search: '?game=true',
                  });
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

      socket?.on(SOCKET_EVENTS.GAME_SESSION_STARTED, (res: any) => {
        setErrorMsg(res.message);
      });

      return () => {
        socket?.off(SOCKET_EVENTS.TETRIS_GAME_SESSION_DATA);
        socket?.off(SOCKET_EVENTS.USERNAME_TAKEN_ERROR);
        socket?.off(SOCKET_EVENTS.INVALID_TETRIS_GAME_ROOM);
        socket?.off(SOCKET_EVENTS.GAME_SESSION_STARTED);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_gameID, _userName]);

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
                    disabled={username !== ''}
                    value={_userName}
                    onChange={(e) => {
                      if (e.currentTarget.value.includes(" ")) {
                        e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
                      }
                      _setUserName(e.target.value)
                    }}
                    onKeyDown={(e) => preventSpace(e)}
                />
              </div>
              <div className="bg-indigo-600 py-2 px-5">
                <input
                    type="text"
                    className="focus:outline-none bg-transparent placeholder-white w-full"
                    placeholder="enter the ID shared with you"
                    value={_gameID}
                    onChange={(e) => {
                      if (e.currentTarget.value.includes(" ")) {
                        e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
                      }
                      _setGameID(e.target.value)
                    }}
                    onKeyDown={(e) => preventSpace(e)}
                />
              </div>
            <button
                className="bg-transparent border border-indigo-600 mt-2 py-2 focus:outline-none rounded disabled:text-gray-500 disabled:cursor-not-allowed"
                disabled={_userName.trim() === '' || _gameID.trim() === ''}
                onClick={playGame}
            >
                Join Game
            </button>
          </form>
        </div>
      );
}


export default JoinGame;
