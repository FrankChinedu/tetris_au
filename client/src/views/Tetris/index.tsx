import React, {
  useRef,
  useEffect,
  useState,
} from 'react';

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

  useEffect(() => {
    //do domething on game over
    if(socket) {
      socket.on('start_game', () => {
        console.log('please start game ooo');
        if(mountControl) {
          mountControl()
        }
        if(drop) {
          drop();
          setDrop(null);
          setMountControl(null)
        }
      })
    }
    console.log('socket we made it', socket);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, mountControl, drop])


  const handleStartGame = () => {
    if(mountControl) {
      mountControl()
    }
    if(drop) {
      drop();
      setDrop(null);
      setMountControl(null)
    }
  }

  return (
    <>
    <div className="mt-4 lg:w-8/12 lg:mx-auto px-5 md:px-12 grid grid-cols-2">
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="relative border border-gray-700 shadow"
      ></canvas>
      <div className="justify-self-end md:justify-self-center">
        <div className="w-8 h-8 bg-yellow-200">{score}</div>
        <button ref={btnRef} onClick={handleStartGame}>start game</button>
      </div>
    </div>
    </>
  )

}

export default Tetris;
