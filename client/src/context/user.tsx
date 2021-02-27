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
  setUsername: (username: string) => void,
  gameInfo: IGameInfo,
  initGameInfo: IGameInfo,
  setGameInfo: (gameInfo: any) => void,
  highestScore: number,
  setHighestScore: (highestScore: number) => void,
  twitterName: string | null,
  setTwitterName: (twitterName: string) => void,
  score: number,
  setScore: (score: number) => void,
}

const initialGameInfoState =  {
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
};

const UserContext = createContext<IUserContext>({
  gameId: '',
  setGameId: () => true,
  username: '',
  setUsername: () => true,
  gameInfo: initialGameInfoState,
  setGameInfo: () => true,
  initGameInfo: initialGameInfoState,
  highestScore: 0,
  setHighestScore: () => true,
  twitterName: '',
  setTwitterName: () => true,
  score: 0,
  setScore: () => true,
});

let _username = ''
let _gameId = ''
let _gameInfo = initialGameInfoState;
let _highestScore = 0;
let _twitterName: string | null = '';
let _score = 0;

if(localStorage.getItem('username')) {
  _username = JSON.parse(localStorage.getItem('username') || '');
}

if(localStorage.getItem('gameId')) {
  _gameId = JSON.parse(localStorage.getItem('gameId') || '');
}

if(localStorage.getItem('gameInfo')) {
  _gameInfo = JSON.parse(localStorage.getItem('gameInfo') || '');
}

if(localStorage.getItem('higs')) {
  _highestScore = Number(localStorage.getItem('higs'));
}

if(localStorage.getItem('twitterName')) {
  _twitterName = localStorage.getItem('twitterName');
  _twitterName = _twitterName && JSON.parse(_twitterName);
}

if(localStorage.getItem('score')) {
  _score = Number(localStorage.getItem('score'));
}

const UserProvider = (props: any) => {
    const [gameId, setGameId] = useState(_gameId);
    const [username, setUsername] = useState(_username);
    const [gameInfo, setGameInfo] = useState<IGameInfo>(_gameInfo);
    const [initGameInfo] = useState<IGameInfo>(() => _gameInfo);
    const [highestScore, setHighestScore] = useState<number>(_highestScore);
    const [twitterName, setTwitterName] = useState<string | null> (_twitterName);
    const [score, setScore] = useState<number>(_score);

    useEffect(() => {
        if (+score > 0) {
            localStorage.setItem('score', JSON.stringify(score))
        }
        if (highestScore) {
            localStorage.setItem('higs', JSON.stringify(highestScore));
        }
        if (twitterName) {
            localStorage.setItem('twitterName', JSON.stringify(twitterName))
        }
    }, [score, highestScore, twitterName]);

    useEffect(() => {
      localStorage.setItem('gameId', JSON.stringify(gameId));
      localStorage.setItem('username', JSON.stringify(username));
      Object.entries(gameInfo).length && localStorage.setItem('gameInfo', JSON.stringify(gameInfo));
    }, [gameId, username, gameInfo])

    return (
        <UserContext.Provider
            value={
              {gameId, setGameId, username, setUsername, gameInfo, setGameInfo,
                 initGameInfo, highestScore, setHighestScore, twitterName, setTwitterName, score, setScore}
            }
        >
            {props.children}
        </UserContext.Provider>
    );
}
export { UserContext, UserProvider };