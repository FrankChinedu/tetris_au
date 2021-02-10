import React, {
    useState,
    memo, 
    useEffect, 
    useContext, 
    useCallback
} from 'react';
import { useHistory, useLocation } from 'react-router';

import 'prevent-pull-refresh';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faPlayCircle, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

//helpers
import {createStage, checkCollision} from '../../gameHelper';
import ROUTES from '../../utils/constants/routes';

//components
import Stage from '../../components/Stage';
import { StyledTetris, TetrisWrapper} from '../../components/TetrisWrapper';
// import QuitButton from '../../components/QuitButton';
import Level from '../../components/Levels';
import NextTetrimino from '../../components/NextTetrimino';
import Controls from '../../components/Controls';
import Snackbar from '../../components/Snackbar';
import LeaderBoard from '../../components/LeaderBoard';

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
import copyToClipboard from '../../utils/constants/copyToClipboard';


const newStage = createStage();

const MultiplayerGame: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { socket } = useContext(SocketContext);
  const { gameInfo, username, setGameInfo } = useContext(UserContext);
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [hasGameEnded, setGameHasNotEnded] = useState<boolean>(false);
  const [startedGame, setGameStatus] = useState<boolean>(false);
  const [dropTimeRef, setDropTimeRef] = useState<number>(0);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMsg, setSnackbarMsg] = useState<string>('');
  const [players, setPlayers] = useState<any>([]);
  const [countdown, setCountdown] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [openLeaderBoard, setOpenLeaderBoard] = useState<boolean>(false);
  const [admin] = useState(gameInfo.username);
  const [player , updatePlayerPos, resetPlayer,
    playerRotate, setTetrominoString, nextPlayer] = usePlayer();
 const [stage, setStage, rowsCleared] = useStage({ player, resetPlayer } as IUseStage); 
 const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);
 const [collapseRoom, setCollapseRoom] = useState<boolean>(false);
 const [copied, setCopied] = useState<boolean>(false);

  const curry = useCallback(() => {
    const gameId = gameInfo.gameId;
    return (args?: any) => {
      return {roomName: gameId, ...args}
    }
  }, [gameInfo.gameId]);

  const getSocketParams = curry();


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
      let val = location.search as string;
      val = val.trim();
    if (!val || val !== '?game=true') {
        history.push({
            pathname: ROUTES.multiGameSteps,
            search: '?redirect=true'
        });
      } else {
          history.replace(ROUTES.multiGame);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  useEffect(() => {
      socket?.emit(SOCKET_EVENTS.GET_MEMBER_STATE, gameInfo.gameId)
      setTetrominoString(gameInfo.tetriminoes)

      socket?.on(SOCKET_EVENTS.PLAYER_JOIN_GAME_ROOM, (data: any) => {
        setOpenSnackbar(true);
        setSnackbarMsg(data.message);
      });

      socket?.on(SOCKET_EVENTS.USER_HAS_CHECKED_OUT_GAME_SESSION, (message: string) => {
        setOpenSnackbar(true);
        setSnackbarMsg(message);
      });

      socket?.on(SOCKET_EVENTS.TETRIS_GAME_ROOM_SIZE, (data: any) => {
        setErrorMsg(data.message);
      });

      socket?.on(SOCKET_EVENTS.CANCEL_GAME_SESSION, (data: any) => {
        console.log('cancelled redirecting');
        history.push({
            pathname: ROUTES.multiGameSteps,
            search: '?cancel=true'
        });
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
        let players = Object.values(data);

        if (players.length) {
          players = players.sort((a: any,b: any) =>{
              if(b.score === a.score) {
                  return b.timestamp - a.timestamp
              }
               return b.score - a.score
            })
        }
        setPlayers(players);
      });

      socket?.on(SOCKET_EVENTS.GAME_SESSION_OVER, (data: any) => {
        console.log('Game over');
        setGameOver(true);
        setDropTime(null);
        setGameHasNotEnded(data.gameHasNotEnded);
        setOpenLeaderBoard(true);
      })

      return () => {
        socket?.off(SOCKET_EVENTS.PLAYER_JOIN_GAME_ROOM);
        socket?.off(SOCKET_EVENTS.TETRIS_GAME_ROOM_SIZE);
        socket?.off(SOCKET_EVENTS.START_TETRIS_GAME_SESSION);
        socket?.off(SOCKET_EVENTS.UPDATED_GAME_SESSION_DATA);
        socket?.off(SOCKET_EVENTS.UPDATED_ROOM_MEMBER_STATE)
        socket?.off(SOCKET_EVENTS.CANCEL_GAME_SESSION)
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyText = () => {
    const shareMessage = `Hey! I want to play a multiplayer Tetris game with you at game_url. Use this game id to join the game\nGame Id: *${gameInfo.gameId}*`;
    copyToClipboard(shareMessage);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }


  useEffect(() => {
    if(score) {
      socket?.emit(SOCKET_EVENTS.USER_SCORE_CHANGE, getSocketParams({userName: username, score}))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  useEffect(() => {
    if(gameOver) {
        socket?.emit(SOCKET_EVENTS.GAME_OVER, getSocketParams({userName: username}))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver])

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
        setGameOver(true);
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
          className={` ${username === admin && !startedGame ? 'grid-cols-3' : 'grid-cols-2'} sm:w-6/12 w-full mx-auto grid sm:gap-x-3 gap-x-1 items-center text-center border border-opacity-20 border-yellow-300 pt-2 montserrat`}>
          <div>
            <p>Your Score</p>
            <small className="text-xl">{score}</small>
          </div>
          <div>
            <p>Highest Score</p>
            <small className="text-xl">{players[0]?.score}</small>
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
            <div className="bg-red-300 p-3 flex justify-between my-7 transition duration-500 ease-in-out md:w-6/12 w-10/12 m-auto montserrat">
                <p>{errorMsg}</p>
                <button onClick={clearError}><FontAwesomeIcon className="md:text-2xl" icon={faTimesCircle} /></button>
            </div>
          )}
        {!startedGame && (
            <div className="bg-purple-400 p-3 flex justify-between my-7 transition duration-500 ease-in-out md:w-6/12 w-10/12 m-auto montserrat">
                <p onClick={copyText}>Your game ID is {gameInfo.gameId}. Click to copy share this ID with others to join this game. Click to copy this ID</p>
                <button onClick={clearError}><FontAwesomeIcon className="md:text-2xl" icon={faTimesCircle} /></button>
                {copied && (
                  <p className="inline absolute bg-gray-400 rounded-sm top-10 left-8 p-2">Copied</p>
                )}
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
     
      {players.length && (
        <div>
           <div className="md:w-80 w-40 bg-gray-800 absolute right-5 bottom-0 md:block py-3 md:px-2 montserrat md:text-sm text-xs">
            <div className={`${collapseRoom && 'mb-5'} flex justify-between px-4 items-center`}>
            <div>{`People in this room (${players.length})`}</div>
            <button className="focus:outline-none font-extralight text-xl px-2" onClick={() => setCollapseRoom(!collapseRoom)}>
              {collapseRoom ? (
                <FontAwesomeIcon icon={faAngleUp} />
              ): (
              <FontAwesomeIcon icon={faAngleDown} />
              )}
            </button>
            </div>
            {collapseRoom && (
              <div className="mx-auto max-h-100 overflow-y-auto">
                {players.map((player: any, i: number) => (
                  <div key={i} className="bg-gray-700 p-2 my-2 grid grid-cols-2">
                      <div>{player.name}</div>
                      <div className="text-right">{player.score}</div>
                  </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
        {openSnackbar && (
          <Snackbar open={openSnackbar} handleClose={handleCloseSnackbar} message={snackbarMsg} />
        )}
        {openLeaderBoard && (
          <LeaderBoard open={openLeaderBoard} players={players} hasNotEnded={hasGameEnded} />
        )}
      </TetrisWrapper>
    </>
  );
};

export default memo(MultiplayerGame);


