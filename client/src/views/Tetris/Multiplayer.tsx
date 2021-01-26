import React, {useState, memo, useEffect, useContext} from 'react';

import 'prevent-pull-refresh';

//helpers
import {createStage, checkCollision} from '../../gameHelper';

//components
import Stage from '../../components/Stage';
import { StyledTetris, TetrisWrapper} from '../../components/TetrisWrapper';
import StartBtn from '../../components/StartButton';
// import QuitButton from '../../components/QuitButton';
import Level from '../../components/Levels';
import NextTetrimino from '../../components/NextTetrimino';
import Controls from '../../components/Controls';
import Snackbar from '../../components/Snackbar';

//hooks
import usePlayer from '../../hooks/usePlayer';
import useStage from '../../hooks/useStage';
import useGameStatus from '../../hooks/useGameStatus';
import useInterval from '../../hooks/useInterval';
import { IUseStage } from '../../utils/tetris/interfaces';

// Contexts
import { UserContext } from '../../context/user';
import { SocketContext } from '../../context/socket';
import SOCKET_EVENTS from '../../utils/constants/socketEvent';


const newStage = createStage();

const MultiplayerGame: React.FC = () => {
  
  const { socket } = useContext(SocketContext);
  const { gameInfo, username } = useContext(UserContext);
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [pausedGame, setPausedGame] = useState(false);
  const [dropTimeRef, setDropTimeRef] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [admin] = useState(gameInfo.username);
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


  const handleCloseSnackbar = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {

    window.addEventListener("beforeunload", event => {
      prompt('hsekdef')
    })

      setTetrominoString(gameInfo.tetriminoes)
      socket?.on(SOCKET_EVENTS.PLAYER_JOIN_GAME_ROOM, (data: any) => {
        setOpenSnackbar(true);
        setSnackbarMsg(data.message);
      });

      socket?.on(SOCKET_EVENTS.TETRIS_GAME_ROOM_SIZE, (data: any) => {
        console.log('data', data);
      });

      socket?.on(SOCKET_EVENTS.START_TETRIS_GAME_SESSION, (data: any) => {
        console.log('game started');
        let i = 6;
          const cle = setInterval(() => {
            i--
            setCountdown(i);
            console.log(i)
            if (i === 0 ) {
              clearInterval(cle)
              startGame()
            }
          }, 1500)
            });

      return () => {
        socket?.off(SOCKET_EVENTS.PLAYER_JOIN_GAME_ROOM);
        socket?.off(SOCKET_EVENTS.TETRIS_GAME_ROOM_SIZE);
        socket?.off(SOCKET_EVENTS.START_TETRIS_GAME_SESSION);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if(score) {
      // socket?.emit()
    }
  }, [score])

  const startGame = () => {
    setDropTime(1000);
    setDropTimeRef(1000);
    setStage(newStage);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setLevel(0);
    setRows(0);
  }

  const emitStartGame = () => {
    socket?.emit(SOCKET_EVENTS.START_TETRIS_GAME, gameInfo.gameId);
  }

  const pauseGame = () => {
    setDropTime(null);
    setPausedGame(true);
  }

  const continueGame = () => {
    setDropTime(dropTimeRef); // we need to keep refrence to old dropTime incase its more 
    // 1000 we would not send it back to 1000
    setPausedGame(false);
    if(gameOver) {
      // startGame()
    }
  }

  const drop = () => {
    if (rows > (level + 1) * 10) {
      setLevel((prev: number) => prev + 1);
      // Also increase speed
      const newDropTime = (1000 / (level + 1)) + 200;
      setDropTimeRef(newDropTime);
      setDropTime(newDropTime);
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

  const move = (e: any ) => {
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

  const keyUp = (e: any) => {
    if(!gameOver && !pausedGame) {
      if (e.key === 'ArrowDown') {
        setDropTime(dropTimeRef);
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

      {countdown !== 0 && (
        <div className="absolute bg-black inset-0 flex justify-center items-center montserrat text-5xl md:text-9xl bg-opacity-90 animate-pulse">
           <p className="animate-ping-slow">{countdown}</p>
        </div>
      )}

        <div
          className=" sm:w-6/12 w-full mx-auto grid grid-cols-3 sm:gap-x-3 gap-x-1 items-center text-center border border-opacity-20 border-yellow-300 pt-2 montserrat">
        {/* <div className="py-2 px-3 mr-auto">
            <QuitButton />
          </div> */}
          <div>
            <p>Score</p>
            <small className="text-xl">{score}</small>
          </div>
          <div className="hidden sm:block">
            <p>Highest Score</p>
            <small className="text-xl">{score}</small>
          </div>
          
          <div className="py-2 px-3">
            {username === admin && (
              <StartBtn callback={emitStartGame} pause={pauseGame} play={continueGame} />
            )}
          </div>
        </div>
          <StyledTetris>
            <Stage stage={stage} />
            <div className="py-5 px-2 md:pl-4 flex flex-col justify-between">
                <div>
                  <NextTetrimino nextShape={nextPlayer} />
                </div>
                <div>
                  <Level level={level} />
                </div>
                <div className="hidden sm:block">
                  <Controls control={move} dropDown={keyUp} />
                </div>
            </div>
          </StyledTetris>
      <div className="sm:hidden flex items-start justify-center">
        <Controls control={move} dropDown={keyUp} />
      </div>
      <Snackbar open={openSnackbar} handleClose={handleCloseSnackbar} message={snackbarMsg} />
      </TetrisWrapper>
    </>
  );
};

export default memo(MultiplayerGame);
