import React, {
  useRef,
  useEffect,
  useState,
} from 'react'

import {init} from '../../utils/tetris'

const Tetris: React.FC = () => {
  const canvasRef = useRef(null);
  const [ctx, setContext] = useState(null) as any;
  const [width] = useState(400);
  const [height] = useState(800);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    const ctx = canvas.getContext('2d');
    setContext(ctx);
  }, []);

  useEffect(()=>{
    if(ctx) {
      init(ctx);
    }
    console.log('ctx', ctx)
  }, [ctx])

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
