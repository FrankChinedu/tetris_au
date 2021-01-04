import React, {
  useEffect,
  useState,
} from 'react'

import useCanvas from '../../hooks/tetris/useCanvas';
import useBoard from '../../hooks/tetris/useBoard';
import useDraw from '../../hooks/tetris/useDraw';

import {init} from '../../utils/tetris';

const Tetris: React.FC = () => {
  const [width] = useState(400);
  const [height] = useState(800);
  const [canvasRef, ctx] = useCanvas();
  const [Draw] = useDraw(ctx);
  const [board] = useBoard();
  const [isGameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(()=>{
    if(Draw) {
      init(board, Draw, {score, setGameOver, setScore});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, Draw]);

  useEffect(() => {
    //do domething on game over
  }, [isGameOver])

  return (
    <>
    <div className="grid grid-cols-7 gap-x-3 mt-4">
      <canvas ref={canvasRef}
      className="col-start-3 col-span-3"
      width={width} height={height}
      ></canvas>
      <div className="w-8 h-8 bg-yellow-200">{score}</div>
    </div>
    </>
  )

}

export default Tetris;
