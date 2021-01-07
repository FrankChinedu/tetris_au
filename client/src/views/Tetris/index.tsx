import React, {
  useEffect,
  useState,
} from 'react'

import useCanvas from '../../hooks/tetris/useCanvas';
import useBoard from '../../hooks/tetris/useBoard';
import useDraw from '../../hooks/tetris/useDraw';

import {init} from '../../utils/tetris';
import socketClient from 'socket.io-client';
const SOCKET_SERVER_URL = "http://localhost:4004";


const Tetris: React.FC = () => {
  const [width] = useState(400);
  const [height] = useState(800);
  const [canvasRef, ctx] = useCanvas();
  const [Draw] = useDraw(ctx);
  const [board] = useBoard();
  const [isGameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [drop, setDrop] = useState() as any;
  const [mountControl, setMountControl] = useState() as any;

  const socket = socketClient(SOCKET_SERVER_URL);
  socket.on('connection', () => {
    console.log('wahala be like bycycle');
  });

  useEffect(()=>{
    if(Draw) {
      init(board, Draw, {score, setGameOver, setScore, setDrop, setMountControl});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, Draw]);

  useEffect(() => {
    //do domething on game over
  }, [isGameOver])


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
    <div className="grid grid-cols-7 gap-x-3 mt-4">
      <canvas ref={canvasRef}
      className="col-start-3 col-span-3"
      width={width} height={height}
      ></canvas>
      <div>
        <div className="w-8 h-8 bg-yellow-200">{score}</div>
        <button onClick={handleStartGame}>start game</button>
      </div>
    </div>
    </>
  )

}

export default Tetris;
