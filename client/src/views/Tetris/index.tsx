import React, {
  useRef,
  useEffect,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleDown, faAngleRight, faAngleUp, faUndo } from '@fortawesome/free-solid-svg-icons'
import useCanvas from '../../hooks/tetris/useCanvas';
import useBoard from '../../hooks/tetris/useBoard';
import useDraw from '../../hooks/tetris/useDraw';
import useSocket from '../../hooks/useSocket';

import { ROW, COLUMN } from '../../utils/tetris/constants';

import {init} from '../../utils/tetris';

const Tetris: React.FC = () => {
  const btnRef = useRef(null) as any;
  const [canvasRef, ctx] = useCanvas();
  const [Draw, square] = useDraw(ctx);
  const [board] = useBoard();
  const [isGameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [drop, setDrop] = useState() as any;
  const [mountControl, setMountControl] = useState() as any;
  const [socket] = useSocket();
  
  const getHeight =  ROW * square;
  const [canvasWidth, setWidth] = useState(COLUMN * square);
  const [canvasHeight, setHeight] = useState(getHeight);

  useEffect(() => {
    setWidth(COLUMN * square);
    setHeight(ROW * square);
    console.log('canvasWidth', canvasWidth);
    console.log('canvasHeight', canvasHeight);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [square])


  useEffect(()=>{
    if(Draw) {
      init(board, Draw, {score, setGameOver, setScore, setDrop, setMountControl});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, Draw]);

  useEffect(() => {
    //do domething on game over
  }, [isGameOver]);

  function startGame () {
    if(mountControl) {
      mountControl()
    }
    if(drop) {
      drop();
      setDrop(null);
      setMountControl(null)
    }
  }

  useEffect(() => {
    //do domething on game over
    if(socket) {
      socket.on('start_game', () => {
        console.log('please start game ooo');
        startGame();
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, mountControl, drop])


  const handleStartGame = () => {
    startGame();
  }

  return (
    <>
    <div className="lg:w-8/12 lg:mx-auto px-5 md:px-12 grid grid-cols-3 gap-y-2 h-full text-white bg-black">
      <div className="col-span-3 py-5 grid grid-cols-3 gap-3">
        {/* score and pause/play, restart and quit comes here */}
        <section className="col-span-2 border grid grid-cols-2 text-center py-2">
          <p>
            <small className="block">Score</small>
            <b className="block">{score}</b>
          </p>
          <p>
            <small className="block">Highest Score</small>
            <b className="block">{score}</b>
          </p>
        </section>
        <section className="text-center border-2 py-2">
          <button ref={btnRef} onClick={handleStartGame}>start/pause</button>
        </section>
      </div>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="relative border-4 shadow border-white rounded col-span-2"
      ></canvas>

      <div className="border-2 px-5 py-0 col-span-1 w-full grid grid-cols-1">
        <div className="mt-14 text-black md:text-2xl text-lg self-end hidden md:block">
            <div className="md:w-16 md:h-16 w-5 h-5 bg-white rounded-b-full mx-auto flex justify-center items-center">
              <FontAwesomeIcon icon={faAngleUp} />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="md:w-16 md:h-16 w-5 h-5 bg-white rounded-r-full flex justify-center items-center justify-self-end">
                <FontAwesomeIcon icon={faAngleLeft} />
              </div>
              <div className="md:w-16 md:h-16 w-5 h-5 bg-white rounded-l-full flex justify-center items-center">
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
            </div>
            <div className="md:w-16 md:h-16 w-5 h-5 bg-white rounded-t-full mx-auto flex justify-center items-center">
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
        </div>
      </div>
      <div className="col-span-3 grid grid-cols-3 p-1 text-black items-center md:hidden gap-5 sm:w-8/12">
        <div className="md:text-2xl text-lg col-span-2 justify-self-start">
            <div className="grid grid-cols-2 gap-5">
              <div className="w-14 h-14 bg-white rounded-r-full flex justify-center items-center justify-self-end">
                <FontAwesomeIcon icon={faAngleLeft} />
              </div>
              <div className="w-14 h-14 bg-white rounded-l-full flex justify-center items-center">
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
            </div>
            <div className="w-14 h-14 bg-white rounded-t-full mx-auto flex justify-center items-center">
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
        </div>
        <div className="bg-white w-14 h-14 flex justify-center items-center p-4 justify-self-start">
            <FontAwesomeIcon icon={faUndo} />
          </div>
      </div>
    </div>
    </>
  )
}

export default Tetris;


// faAngleLeft
// faAngleDown
// faAngleRight