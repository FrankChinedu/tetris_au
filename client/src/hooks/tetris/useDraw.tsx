import {
  useEffect,
  useState
} from 'react';

import useWindowSize from '../useWindowSize';

const useDraw = (ctx: any) => {
  const [draw, setDraw] = useState(null) as any;
  const [square, setSquare] = useState(30) as any;
  const { width } = useWindowSize();

  useEffect(() => {
    if (width !== null && width <= 420) {
      setSquare(20)
    }
    
    if (width !== null && width < 300) {
      setSquare(15)
    }

    if (width !== null && width < 250) {
      setSquare(10)
      console.log('width', width);
    }
  }, [width]);

  useEffect(() => {

    if(ctx && !draw) {

      class Draw {
        static ctx = ctx;
        static drawSquare(x: number, y: number, color: string){
          Draw.ctx.fillStyle = color;
          Draw.ctx.fillRect(x * square, y * square, square, square)
      
          // Draw.ctx.strokeStyle = STROKE_COLOR;
          // Draw.ctx.strokeRect(x * square, y * square, square, square)
        }
      
        static drawBoard(row:number, col:number, board: any) {
          for (let r = 0; r < row; r++) {
            for (let c = 0; c < col; c++) {
                Draw.drawSquare(c, r, board[r][c])
            }
          }
          
        }
      }

      const draw = {
        drawSquare: Draw.drawSquare,
        drawBoard: Draw.drawBoard,
      }

      setDraw(draw)
    }

    if(draw) {
      setDraw(draw);
    }

  }, [ctx, draw, square])
  return [draw, square];
}

export default useDraw;
