import React, {useState, memo, useEffect, useContext} from 'react';

import 'prevent-pull-refresh';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

//helpers
import {createStage, checkCollision} from '../../gameHelper';

//components
import Stage from '../../components/Stage';
import { StyledTetris, TetrisWrapper} from '../../components/TetrisWrapper';
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
  const { gameInfo, username, setGameInfo } = useContext(UserContext);
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [startedGame, setGameStatus] = useState<boolean>(false);
  const [dropTimeRef, setDropTimeRef] = useState<number>(0);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMsg, setSnackbarMsg] = useState<string>('');
  const [players, setPlayers] = useState<any>([]);
  const [countdown, setCountdown] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [admin] = useState(gameInfo.username);
  const [emitNew, setEmitNew] = useState(false);
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

  const clearError = () => {
    setErrorMsg('');
  }

  useEffect(() => {
    setTimeout(() => {
      // setEmitNew(true)
      socket?.emit(SOCKET_EVENTS.GET_MEMBER_STATE, gameInfo.gameId)
    }, 0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {

      setTetrominoString(gameInfo.tetriminoes)
      socket?.on(SOCKET_EVENTS.PLAYER_JOIN_GAME_ROOM, (data: any) => {
        setOpenSnackbar(true);
        setSnackbarMsg(data.message);
      });

      socket?.on(SOCKET_EVENTS.TETRIS_GAME_ROOM_SIZE, (data: any) => {
        setErrorMsg(data.message);
      });

      socket?.on(SOCKET_EVENTS.START_TETRIS_GAME_SESSION, (data: any) => {
        let i = 6;
          const cle = setInterval(() => {
            i--
            setCountdown(i);
            console.log(i)
            if (i === 0 ) {
              clearInterval(cle)
              startGame()
              setGameStatus(true)
            }
          }, 1500)
            });

      socket?.on(SOCKET_EVENTS.UPDATED_GAME_SESSION_DATA, (data: any) => {
        setGameInfo(data);
      });

      socket?.on(SOCKET_EVENTS.UPDATED_ROOM_MEMBER_STATE, (data: any) => {
        console.log('here');
        setPlayers(data);
      })

      return () => {
        socket?.off(SOCKET_EVENTS.PLAYER_JOIN_GAME_ROOM);
        socket?.off(SOCKET_EVENTS.TETRIS_GAME_ROOM_SIZE);
        socket?.off(SOCKET_EVENTS.START_TETRIS_GAME_SESSION);
        socket?.off(SOCKET_EVENTS.UPDATED_GAME_SESSION_DATA);
        socket?.off(SOCKET_EVENTS.UPDATED_ROOM_MEMBER_STATE)
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
    socket?.emit(SOCKET_EVENTS.START_TETRIS_GAME, gameInfo.gameId)
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
    
    if (!gameOver) {
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
    if(!gameOver) {
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
          <div>
            <p>Score</p>
            <small className="text-xl">{score}</small>
          </div>
          <div className="hidden sm:block">
            <p>Highest Score</p>
            <small className="text-xl">{score}</small>
          </div>
          
          <div className="py-2 px-3">
            {username === admin && !startedGame && (
              <button className="focus:outline-none" onClick={emitStartGame}>
                <FontAwesomeIcon icon={faPlayCircle} size="2x" color="green" />
              </button>
            )}
          </div>
        </div>
        {errorMsg && (
            <div className="bg-red-300 p-3 flex justify-between my-7 transition duration-500 ease-in-out md:w-6/12 w-10/12 m-auto">
                <p>{errorMsg}</p>
                <button onClick={clearError}><FontAwesomeIcon className="md:text-2xl" icon={faTimesCircle} /></button>
            </div>
          )}
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
     
      {Object.keys(players).length && (
         <div className="w-80 bg-gray-800 absolute right-5 bottom-16 hidden md:block py-3 px-2 montserrat text-sm">
          <div className="mb-5">{'People in this room'}</div>
          {Object.keys(players).map(player => (
            <div key={player} className="bg-gray-700 p-2 my-2 grid grid-cols-2">
              <div>{players[player].name}</div>
              <div className="text-right">{players[player].score}</div>
          </div>
          ))}
         </div>
      )}
      <Snackbar open={openSnackbar} handleClose={handleCloseSnackbar} message={snackbarMsg} />
      </TetrisWrapper>
    </>
  );
};

export default memo(MultiplayerGame);


// leaderboard
