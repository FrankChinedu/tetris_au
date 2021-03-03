import React, { useState, createContext, useEffect } from 'react';

interface ISingleGameContext {
  highestScore: number,
  setHighestScore: (highestScore: number) => void,
  twitterName: string | null,
  setTwitterName: (twitterName: string) => void,
  score: number,
  setScore: (score: number) => void,
}

const SingleGameContext = createContext<ISingleGameContext>({
  highestScore: 0,
  setHighestScore: () => true,
  twitterName: '',
  setTwitterName: () => true,
  score: 0,
  setScore: () => true,
});

let _highestScore = 0;
let _twitterName: string | null = '';
let _score = 0;


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

const SingleGameProvider = (props: any) => {
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

    return (
        <SingleGameContext.Provider
            value={
              { highestScore, setHighestScore, twitterName, setTwitterName, score, setScore }
            }
        >
            {props.children}
        </SingleGameContext.Provider>
    );
}
export { SingleGameContext, SingleGameProvider };