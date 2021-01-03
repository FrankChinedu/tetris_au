import {
  useEffect,
} from 'react';

// import { 
//   VACANT,
//   ROW, 
//   COLUMN 
// } from '../../utils/tetris/constants';

function usePiece() {

  useEffect(() => {
    // class Piece{
    //   public tetromino:any;
    //   public color:string;
    //   public tetrominoN:number;
    //   public activeTetromino:any;
    //   public x:number;
    //   public y:number;
    
    //   constructor(tetromino:any, color:string){
    //     this.tetromino = tetromino;
    //     this.color = color;
    
    //     this.tetrominoN = 0; //tetromino number we start from the first pattern
    //     this.activeTetromino = this.tetromino[this.tetrominoN];
    
    //     //we need to control the pieces
    //     this.x = 3; // os tetrimino stays in the middle
    //     this.y = -2
    //   }
    
    //   fill(color:string) {
    //     for (let r = 0; r < this.activeTetromino.length; r++) {
    //       for (let c = 0; c < this.activeTetromino.length; c++) {
    //           // we draw only occupied squares
    //           if (this.activeTetromino[r][c]) {
    //               // Draw.drawSquare(this.x + c, this.y + r, color);
    //           }
    //       }
    //     }
    //   }
    
    //   draw () {
    //     this.fill(this.color) 
    //   }
    
    //   unDraw () {
    //     this.fill(VACANT)
    //   }
    
    //   moveDown () {
    //     if(!this.collision(0,1,this.activeTetromino)){
    //       this.unDraw();
    //       this.y++;
    //       this.draw();
    //     }else {
    //       this.lock();
    //       p = randomPiece();
    //     }
    //   }
    
    //   moveRight () {
    //     if (!this.collision(1, 0, this.activeTetromino)) {
    //       this.unDraw();
    //       this.x++;
    //       this.draw();
    //     }
    //   }
    
    //   moveLeft () {
    //     if (!this.collision(-1, 0, this.activeTetromino)) {
    //       this.unDraw();
    //       this.x--;
    //       this.draw();
    //     }
    //   }
    
    //   rotate () {
    //     let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length]
    //     let kick = 0;
    
    //     if (this.collision(0, 0, nextPattern)){
    //         if(this.x > COLUMN/2){
    //             //its the right wall 
    //             kick = -1 //kick piece to the left
    //         }else{
    //             kick = 1 //kick piece to the right
    //             //its the left wall
    //         }
    //     }
    //     if (!this.collision(kick, 0, nextPattern)) {
    //         this.unDraw();
    //         this.x += kick;
    //         this.tetrominoN = (this.tetrominoN + 1)%this.tetromino.length;
    //         this.activeTetromino = this.tetromino[this.tetrominoN];
    //         this.draw();
    //     }
    //   }
    
    //   lock () {
    //     for (let r = 0; r < this.activeTetromino.length; r++) {
    //       for (let c = 0; c < this.activeTetromino.length; c++) {
    //           // we skip vacant squares
    //           if (!this.activeTetromino[r][c]) {
    //               continue;
    //           }
    //           if(this.y + r < 0){
    //               alert("Game Over");
    //               //stop request animation frame
    //               gameOver = true;
    //               break; 
    //           }
    //           //we lock the piece
    //           board[this.y + r][this.x + c] = this.color
    //       }
    //   }
    
    //   for(let r = 0; r < ROW; r++){
    //       let isRowFull = true;
    //       for(let c=0; c < COLUMN; c++){
    //           isRowFull = isRowFull && (board[r][c] !== VACANT)
    //       }
    //       if (isRowFull) {
    //           for(let y = r; y > 1; y--){
    //               for (let c = 0; c < COLUMN; c++){
    //                   board[y][c] = board[y - 1][c]
    //               }
    //           }
    //           for (let c = 0; c < COLUMN; c++) {
    //               board[0][c] = VACANT
    //           }
    //           // increment the score
    //           // score += 10;
    //       }
    //   }
    //   //update the board
    //    Draw.drawBoard(ROW, COLUMN, board);
    //   }
    
    //   collision (x: number, y:number , piece: any) {
    //     for (let r = 0; r < piece.length; r++) {
    //       for (let c = 0; c < piece.length; c++) {
    //           // if the square is empty, skip it
    //           if(!piece[r][c]){
    //               continue;
    //           }
    //           // coordinate of the piece after the movement
    //           let newX = this.x + c + x
    //           let newY = this.y + r + y
    
    //           //conditions
    //           if(newX < 0 || newX >= COLUMN || newY >= ROW){
    //               return true;
    //           }
    //           //skip newY < 0; board[-1] will crash the game
    //           if(newY < 0){
    //               continue;
    //           }
    //           //check if there is a locked piece  already in play
    //           if(board[newY][newX] !== VACANT){
    //               return true;
    //           }
    //       }
    //   }
    //     return false;
    //   }
    // }
  })
  return []
}

export default usePiece;
