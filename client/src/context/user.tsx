import React, { useState, createContext, useEffect } from 'react';
interface IUserContext {
  gameId: string,
  setGameId: (gameId: string) => void
  username: string,
  setUsername: (gameId: string) => void,
  gameInfo: any
  setGameInfo: (gameInfo: any) => void,
}

const UserContext = createContext<IUserContext>({
  gameId: '',
  setGameId: () => true,
  username: '',
  setUsername: () => true,
  gameInfo: {},
  setGameInfo: () => true,
});

let _username = ''
let _gameId = ''
let _gameInfo = {}
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
    const [gameInfo, setGameInfo] = useState(_gameInfo);

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