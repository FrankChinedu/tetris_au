import React, { useState, createContext, useEffect } from 'react';

interface IGameInfo {
  allowedPlayers: number;
  baseScore: number;
  criteria: string;
  ended: boolean;
  gameId: string;
  id: string;
  mode: string;
  tetriminoes: string;
  type: string;
  username: string;
  winScore: number;
  winTime: number;
}
interface IUserContext {
  gameId: string,
  setGameId: (gameId: string) => void
  username: string,
  setUsername: (gameId: string) => void,
  gameInfo: IGameInfo,
  setGameInfo: (gameInfo: any) => void,
}



const UserContext = createContext<IUserContext>({
  gameId: '',
  setGameId: () => true,
  username: '',
  setUsername: () => true,
  gameInfo: {
    allowedPlayers: 0,
    baseScore: 0,
    criteria: '',
    ended: false,
    gameId: '',
    id: '',
    mode: '',
    tetriminoes: '',
    type: '',
    username: '',
    winScore: 0,
    winTime: 0
  },
  setGameInfo: () => true,
});

let _username = ''
let _gameId = ''
let _gameInfo = {
  allowedPlayers: 0,
  baseScore: 0,
  criteria: '',
  ended: false,
  gameId: '',
  id: '',
  mode: '',
  tetriminoes: '',
  type: '',
  username: '',
  winScore: 0,
  winTime: 0
}
if(localStorage.getItem('username')) {
  _username = JSON.parse(localStorage.getItem('username') || '');
}

if(localStorage.getItem('gameId')) {
  _gameId = JSON.parse(localStorage.getItem('gameId') || '');
}

if(localStorage.getItem('gameInfo')) {
  _gameInfo = JSON.parse(localStorage.getItem('gameInfo') || '');
}

const UserProvider = (props: any) => {
    const [gameId, setGameId] = useState(_gameId);
    const [username, setUsername] = useState(_username);
    const [gameInfo, setGameInfo] = useState<IGameInfo>(_gameInfo);

    useEffect(() => {
      gameId && localStorage.setItem('gameId', JSON.stringify(gameId));
      username && localStorage.setItem('username', JSON.stringify(username));
      Object.entries(gameInfo).length && localStorage.setItem('gameInfo', JSON.stringify(gameInfo));
    }, [gameId, username, gameInfo])

    return (
        <UserContext.Provider
            value={{gameId, setGameId, username, setUsername, gameInfo, setGameInfo}}
        >
            {props.children}
        </UserContext.Provider>
    );
}
export { UserContext, UserProvider };