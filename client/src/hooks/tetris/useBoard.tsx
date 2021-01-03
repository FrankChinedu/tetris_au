import {
  useEffect,
  useState,
} from 'react';

import { 
  VACANT,
  ROW, 
  COLUMN 
} from '../../utils/tetris/constants'

function useBoard () {
  const [board, setBoard] = useState(null) as any; 

  useEffect(() => {
    class Board {
      public board: any;
      public row: number;
      public col: number;
    
      constructor(row:number, col:number) {
        this.row = row;
        this.col = col;
        this.board = [];
        for (let r = 0; r < row; r++){
          this.board[r] = [];
          for (let c = 0; c < col; c++) {
            this.board[r][c] = VACANT;
          }
        }
      }
    }
    const { board } = new Board(ROW, COLUMN);
    setBoard(board)
  }, [])

  return [board]
}

export default useBoard;
