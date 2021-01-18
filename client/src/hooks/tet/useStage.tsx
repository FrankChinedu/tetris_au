import React, { useState, useEffect } from 'react';

import { createStage } from '../../gameHelper';

import { IPlayer, } from './interfaces'
import { IUseStage } from './interfaces';

const useStage = (param : IUseStage) => {
  const { player, resetPlayer } = param;
  const[stage, setStage] = useState(() => createStage()) as any;
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = (newStage: any[][]) =>
      newStage.reduce((ack, row) => {
        if (row.findIndex(cell => cell[0] === 0) === -1) {
          setRowsCleared(prev => prev + 1);
          ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
          return ack;
        }
        ack.push(row);
        return ack;
      }, []);

    const updateStage = (prevStage: Array<[]>) => {
      // First flush the stage
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell))
      );
  
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? 'merged': 'clear'}`
            ]
          }
        })
      })
      if(player.collided) {
        resetPlayer();
        return sweepRows(newStage as Array<[any]>);
      }
  
      return newStage;
    }
    setStage((prev: any) => updateStage(prev));
  }, [player, resetPlayer])

  return [stage, setStage, rowsCleared];
};

export default useStage;
