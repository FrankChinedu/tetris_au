import React, { useState, createContext } from 'react';
interface IUserContext {
  gameId: string,
  setGameId: (gameId: string) => void
  username: string,
  setUsername: (gameId: string) => void
}

const UserContext = createContext<IUserContext|null>(null);

let _username = ''
let _gameId = ''
if(localStorage.getItem('username')) {
  _username = JSON.parse(localStorage.getItem('username') || '');
}

if(localStorage.getItem('gameId')) {
  _gameId = JSON.parse(localStorage.getItem('gameId') || '');
}

const UserProvider = (props: any) => {
    const [gameId, setGameId] = useState(_gameId);
    const [username, setUsername] = useState(_username);

    return (
        <UserContext.Provider
            value={{gameId, setGameId, username, setUsername}}
        >
            {props.children}
        </UserContext.Provider>
    );
}
export { UserContext, UserProvider };