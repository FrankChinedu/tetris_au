import { useState, useEffect, useCallback, useMemo } from 'react';

import { createStage } from '../gameHelper';

import { IUseStage } from '../utils/tetris/interfaces';

const useStage = (param : IUseStage) => {
  const { player, resetPlayer } = param;
  const[stage, setStage] = useState(() => createStage()) as any;
  const [rowsCleared, setRowsCleared] = useState(() => 0);
  const [cleared, setCleared] = useState(false);
  const playerMemo = useMemo(() => {
      return player;
  },[player])

  useEffect(() => {
      if(cleared) {
        setRowsCleared(0);
        setCleared(false);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cleared])

  const sweepRows = useCallback((newStage: any[][]) => {
      let count = 0;
    return newStage.reduce((ack, row, index, array) => {
        if (row.findIndex(cell => cell[0] === 0) === -1) {
            count = count + 1
            if((array.length - 1) === index) {
                setRowsCleared(count);
                setCleared(true);
                count = 0
            }
        ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
        return ack;
        }
        ack.push(row);
        return ack;
        }, [])
    }, [])

  useEffect(() => {

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerMemo, resetPlayer])

  return [stage, setStage, rowsCleared];
};

export default useStage;
