import {
  useEffect,
  useState
} from 'react';

import {
  SQUARE
} from '../../utils/tetris/constants'

const useDraw = (ctx: any) => {
  const [draw, setDraw] = useState(null) as any;

  useEffect(() => {

    if(ctx && !draw) {

      class Draw {
        static ctx = ctx;
        static drawSquare(x: number, y: number, color: string){
          Draw.ctx.fillStyle = color;
          Draw.ctx.fillRect(x * SQUARE, y * SQUARE, SQUARE, SQUARE)
      
          Draw.ctx.strokeStyle = 'BLACK';
          Draw.ctx.strokeRect(x * SQUARE, y * SQUARE, SQUARE, SQUARE)
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

  }, [ctx, draw])
  return [draw];
}

export default useDraw;
