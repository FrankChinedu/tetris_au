import React, { useState, createContext, useEffect } from 'react';

interface ISingleGameContext {
  highestScore: number,
  setHighestScore: (highestScore: number) => void,
  twitterName: string | null,
  setTwitterName: (twitterName: string) => void,
  score: number,
  setScore: (score: number) => void,
  speed: number,
  setSpeed: (speed: number) => void,
}

const SingleGameContext = createContext<ISingleGameContext>({
  highestScore: 0,
  setHighestScore: () => true,
  twitterName: '',
  setTwitterName: () => true,
  score: 0,
  setScore: () => true,
  speed: 0,
  setSpeed: () => true,
});

let _highestScore = 0;
let _twitterName: string | null = '';
let _score = 0;
let _speed = 1000;

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

if(localStorage.getItem('spd')) {
  _speed = Number(localStorage.getItem('spd')) || 1000;
}


const SingleGameProvider = (props: any) => {
    const [highestScore, setHighestScore] = useState<number>(_highestScore);
    const [twitterName, setTwitterName] = useState<string | null> (_twitterName);
    const [score, setScore] = useState<number>(_score);
    const [speed, setSpeed] = useState<number>(_speed);

    useEffect(() => {
      if(isNaN(speed)) {
        setSpeed(1000)
      }

      if(speed < 100) {
        setSpeed(100)
      }

      if(speed > 1000) {
        setSpeed(1000)
      }
    }, [speed]);

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
      if (speed && !isNaN(speed)) {
        localStorage.setItem('spd', JSON.stringify(speed))
      }
    }, [score, highestScore, twitterName, speed]);

    return (
        <SingleGameContext.Provider
            value={
              { highestScore, setHighestScore, twitterName, setTwitterName, score, setScore, speed, setSpeed }
            }
        >
            {props.children}
        </SingleGameContext.Provider>
    );
}
export { SingleGameContext, SingleGameProvider };