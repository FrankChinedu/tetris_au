import React from 'react';
import { TETROMINOS } from '../utils/tetris/Tetriminoes';

// React.memo makes sure we only re-render the changed cells
const Cell: React.FC <any> = ({type}) => {
  
  return (
  <div className={`bg-${TETROMINOS[type].color} ${type === 0 ? 'border border-gray-500': 'border-2 border-gray-500'} w-8 h-8`} >
  </div>
)};

export default React.memo(Cell);
