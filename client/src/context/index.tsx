import React, { useState, createContext } from 'react';

const UserContext = createContext<any>([]);

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
            value={[gameId, setGameId, username, setUsername]}
        >
            {props.children}
        </UserContext.Provider>
    );
}
export { UserContext, UserProvider };