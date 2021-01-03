import React, {
  useRef,
  useEffect,
  useState,
} from 'react'

const Tetris: React.FC = () => {
  const canvasRef = useRef(null);
  const [ctx, setContext] = useState(null) as any;

  useEffect(() => {
    // const canvas: any = canvasRef.current;
    // const ctx = canvas.getContext('2d');
    // setContext(ctx);
  }, []);

  return (
    <>
    <div className="grid grid-cols-7 gap-x-3 mt-4">
      <canvas ref={canvasRef}
      className="w-full h-200 bg-red-400 col-start-3 col-span-3"
      ></canvas>
      <div className="w-8 h-8 bg-yellow-200"></div>
    </div>
    </>
  )

}

export default Tetris;
