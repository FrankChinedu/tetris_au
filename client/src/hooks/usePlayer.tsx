import {useState, useCallback} from 'react'
import {TETROMINOS,  randomTetromino } from '../utils/tetris/Tetriminoes';
import { STAGE_WIDTH, checkCollision } from '../gameHelper';

import { IPlayer } from '../utils/tetris/interfaces'

const usePlayer = () => {
   const [tetrominoString, setTetrominoString] = useState<string>();
   const [nextTet, setNextTet] = useState(0);
   const [nextPlayer, setNextPlayer] = useState({
    tetromino: TETROMINOS[0].shape,
   });
  const [player, setPlayer] = useState<IPlayer>(() => ({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  }));

  const rotate = (tetriminoes: Array<[]>, dir: number) => {
    for (let y = 0; y < tetriminoes.length; ++y) {
      for (let x = 0; x < y; ++x) {
          [
            tetriminoes[x][y],
            tetriminoes[y][x],
          ] = [
            tetriminoes[y][x],
            tetriminoes[x][y],
          ];
      }
    }
    if (dir > 0) {
      tetriminoes.forEach(row => row.reverse());
    } else {
      tetriminoes.reverse();
    }
    return tetriminoes;
  }

  const playerRotate = (stage: Array<[]>, dir: number) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player)) as IPlayer;
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;

    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  }

  const updatePlayerPos =  ({ x, y, collided }: any) => {
    const newPlayerState: IPlayer = {
      pos: {
        x: player.pos.x + x,
        y: player.pos.y + y
      },
      tetromino: player.tetromino,
      collided: collided
    }
    setPlayer(newPlayerState);
  };

  const resetPlayer = useCallback(() => {
    let tet = tetrominoString && tetrominoString[nextTet];
    tet = nextTet === tetrominoString?.length ?
    tetrominoString && tetrominoString[0] : tet;
    setPlayer(
      {
        pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
        tetromino: randomTetromino(tet).shape,
        collided: false,
      })
      if (tetrominoString) {
        let nextTetrimino = tetrominoString && tetrominoString[nextTet + 1];
        nextTetrimino = nextTet === tetrominoString?.length ?
         tetrominoString && tetrominoString[0] : nextTetrimino
        setNextPlayer({
          tetromino: randomTetromino(nextTetrimino)
        })
        if (nextTet === tetrominoString?.length) setNextTet(0);
        else setNextTet(prev => prev + 1);
      }
  }, [nextTet, tetrominoString]) as any;


  return [player,  updatePlayerPos,
     resetPlayer, playerRotate, setTetrominoString, 
     nextPlayer];
};

export default usePlayer;
