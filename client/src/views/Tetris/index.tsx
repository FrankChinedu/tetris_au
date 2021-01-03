import React, {
  useEffect,
  useState,
} from 'react'
import useCanvas from '../../hooks/tetris/useCanvas';
import useBoard from '../../hooks/tetris/useBoard';

import {init} from '../../utils/tetris'

const Tetris: React.FC = () => {
  const [width] = useState(400);
  const [height] = useState(800);
  const [canvasRef, ctx] = useCanvas();
  const [board] = useBoard();

  useEffect(()=>{
    if(ctx) {
      init(ctx, board);
    }
    console.log('ctx', ctx)
  }, [ctx, board])

  return (
    <>
    <div className="grid grid-cols-7 gap-x-3 mt-4">
      <canvas ref={canvasRef}
      className="col-start-3 col-span-3"
      width={width} height={height}
      ></canvas>
      <div className="w-8 h-8 bg-yellow-200"></div>
    </div>
    </>
  )

}

export default Tetris;
