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
  const [pausedGame, setPausedGame] = useState(false);

  const [player , updatePlayerPos, resetPlayer,
     playerRotate, setTetrominoString, nextPlayer] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage({ player, resetPlayer } as IUseStage); 
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  const movePlayer = (dir: number) => {
    const canNotMove = checkCollision( player, stage, { x: dir, y: 0} );
    if (!canNotMove) {
      updatePlayerPos ( { x: dir, y: 0} as any)
    }
  }

  useEffect(() => {
    setTimeout(()=> {
      setTetrominoString(`OILIIZZLZZOSJSZJISOSJJSSTZTOJ
      ITSIOLTLSOILSISJZIJSITITZOSTSTSZLIIOZITZTTZJTLZLOOOTJIJSOLZZSZJSJSZILLSJOIJIIJZZSOOOLLIJS`)
    },1000)
  }, []);

  useEffect(() => {
    console.log('score',score);
  }, [score, nextPlayer])


  const startGame = () => {
    setDropTime(1000);
    setStage(newStage);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setLevel(0);
    setRows(0);
  }

  const pauseGame = () => {
    setDropTime(null);
    setPausedGame(true);
  }

  const continueGame = () => {
    setDropTime(1000); // we need to keep refrence to old dropTime incase its more 
    // 1000 we would not send it back to 1000
    setPausedGame(false);
    if(gameOver) {
      startGame()
    }
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
    if (!gameOver && !pausedGame) {
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
    if(!gameOver && !pausedGame) {
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
    <>
    <TetrisWrapper role="button" tabIndex="0"
      onKeyDown={ (e: React.KeyboardEvent<HTMLInputElement> ) => move(e)}
      onKeyUp={keyUp} >
        <div className="border border-white sm:w-6/12 w-full mx-auto grid grid-cols-4 sm:gap-x-3 gap-x-1 items-center text-center py-1">
          <div>
            <p>Score</p>
            <small className="text-xl">{score}</small>
          </div>
          <div>
            <p>Highest Score</p>
            <small className="text-xl">{score}</small>
          </div>
          <div className="py-2 px-3 mr-auto">
            <QuitButton />
          </div>
          <div className="py-2 px-3 mr-auto">
            <StartBtn callback={startGame} pause={pauseGame} play={continueGame} />
          </div>
        </div>
        
          <StyledTetris>
            <Stage stage={stage} />
            <div className="py-5 px-2 flex flex-col justify-between">
                <div>
                  Next Tetrimonios here
                </div>
                <div>
                  game controls here
                </div>
            </div>
          </StyledTetris>
      {/* <div className="border border-white">hey</div> */}
      </TetrisWrapper>
    </>
  );
};

export default memo(Tetris);
