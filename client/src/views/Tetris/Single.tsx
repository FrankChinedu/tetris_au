import React from 'react';
import Tetris from './index';


import { randomStrings } from '../../utils/tetris/Tetriminoes';

const SingleGame: React.FC = () => {

  return <Tetris getTetriminoesString={randomStrings(1000)} />
};

export default SingleGame;
