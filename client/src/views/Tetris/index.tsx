import React, {useState, memo, useEffect} from 'react';


//helpers
import {createStage, checkCollision} from '../../gameHelper';

//components
import Stage from '../../components/Stage';
import { StyledTetris, TetrisWrapper} from '../../components/TetrisWrapper';
import StartBtn from '../../components/StartButton';
import QuitButton from '../../components/QuitButton';

//hooks
import usePlayer from '../../hooks/usePlayer';
import useStage from '../../hooks/useStage';
import useGameStatus from '../../hooks/useGameStatus';
import useInterval from '../../hooks/useInterval';

import { IUseStage } from '../../utils/tetris/interfaces';

const newStage = createStage();

const Tetris: React.FC = () => {
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const [player , updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage({ player, resetPlayer } as IUseStage); 
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  const movePlayer = (dir: number) => {
    const canNotMove = checkCollision( player, stage, { x: dir, y: 0} );
    if (!canNotMove) {
      updatePlayerPos ( { x: dir, y: 0} as any)
    }
  }

  useEffect(() => {
    console.log('score',score);
  }, [score])


  const startGame = () => {
    setDropTime(1000);
    setStage(newStage);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setLevel(0);
    setRows(0);
  }

  const drop = () => {
    if (rows > (level + 1) * 10) {
      setLevel((prev: number) => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    const canNotMove = checkCollision( player, stage, { x: 0, y: 1} );
    if (!canNotMove) {
      updatePlayerPos({x: 0, y: 1, collided: false});
    }else {
      // Game over!
      if (player.pos.y <= 1) {
        console.log('GAME OVER!!!');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  }

  const move = (e: React.KeyboardEvent<HTMLInputElement> ) => {
    const { key } = e;
    if (!gameOver ) {
      if (key === 'ArrowUp') {
        playerRotate(stage, 1);
      } else if (key === 'ArrowDown') {
        dropPlayer();
      } else if (key === 'ArrowRight') {
        movePlayer(1);
      } else if (key === 'ArrowLeft') {
        movePlayer(-1);
      }
    }
  }

  const keyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(!gameOver) {
      if (e.key === 'ArrowDown') {
        setDropTime(1000 / (level + 1));
      }
    }
  }

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  }

  useInterval(() => {
    if (!gameOver) {
      drop()
    }
  }, dropTime);

  return (
    <div className="flex flex-col p-1 text-white">
      <div className="border border-white w-6/12 mx-auto grid grid-cols-4 gap-x-3 items-center text-center py-1">
        <div>
          <p>Score</p>
          <small className="text-xl">{score}</small>
        </div>
        <div>
          <p>Highest Score</p>
          <small className="text-xl">{score}</small>
        </div>
        <div>
          <QuitButton />
        </div>
        <div className="py-2 px-3 mr-auto">
          <StartBtn callback={startGame} />
        </div>
      </div>
      <TetrisWrapper role="button" tabIndex="0"
        onKeyDown={ (e: React.KeyboardEvent<HTMLInputElement> ) => move(e)}
        onKeyUp={keyUp} >
        <StyledTetris>
          <Stage stage={stage} />
          <div className="h-36 border border-white"></div>
        </StyledTetris>
      </TetrisWrapper>
      {/* <div className="border border-white">hey</div> */}
    </div>
  );
};

export default memo(Tetris);
