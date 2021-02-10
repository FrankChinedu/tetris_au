import React from 'react';
import { TETROMINOS } from '../utils/tetris/Tetriminoes';

// React.memo makes sure we only re-render the changed cells
const Cell: React.FC <any> = ({type}) => {
  
  return (
  <div className={`${TETROMINOS[type].color} ${type === 0 ? `border border-red-300 border-opacity-5`: `border-2 border-gray-700 border-opacity-50 rounded`} xl:w-8 xl:h-8 sm:w-6 sm:h-6 w-4 h-4`} >
  </div>
)};

export default React.memo(Cell);
