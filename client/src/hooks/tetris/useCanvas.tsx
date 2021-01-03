import {
  useRef,
  useState,
  useEffect,
} from 'react'

function useCanvas() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    const canvas: any = canvasRef.current
    const ctx = canvas.getContext('2d');
    setCtx(ctx);
  }, [setCtx])
  return [canvasRef, ctx]
}

export default useCanvas;
