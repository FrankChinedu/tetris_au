import {
  I, J, L, Z, T, S, O
} from './tetriminos'
const ROW = 20;
const COLUMN = 10;
const SQUARE =  30;
const VACANT = 'WHITE'; // color of an empty square

export const init = (ctx: any, board: any, Draw:any) => {

Draw.drawBoard(ROW, COLUMN, board);

const PIECES = [
  [Z, "red"],
  [S, "green"],
  [T, "yellow"],
  [O, "blue"],
  [L, "purple"],
  [I, "cyan"],
  [J, "orange"],
];

// Piece -> Draw board
class Piece{
  public tetromino:any;
  public color:string;
  public tetrominoN:number;
  public activeTetromino:any;
  public x:number;
  public y:number;

  constructor(tetromino:any, color:string){
    this.tetromino = tetromino;
    this.color = color;

    this.tetrominoN = 0; //tetromino number we start from the first pattern
    this.activeTetromino = this.tetromino[this.tetrominoN];

    //we need to control the pieces
    this.x = 3; // os tetrimino stays in the middle
    this.y = -2
  }

  fill(color:string) {
    for (let r = 0; r < this.activeTetromino.length; r++) {
      for (let c = 0; c < this.activeTetromino.length; c++) {
          // we draw only occupied squares
          if (this.activeTetromino[r][c]) {
              Draw.drawSquare(this.x + c, this.y + r, color);
          }
      }
    }
  }

  draw () {
    this.fill(this.color) 
  }

  unDraw () {
    this.fill(VACANT)
  }

  moveDown () {
    if(!this.collision(0,1,this.activeTetromino)){
      this.unDraw();
      this.y++;
      this.draw();
    }else {
      this.lock();
      p = randomPiece();
    }
  }

  moveRight () {
    if (!this.collision(1, 0, this.activeTetromino)) {
      this.unDraw();
      this.x++;
      this.draw();
    }
  }

  moveLeft () {
    if (!this.collision(-1, 0, this.activeTetromino)) {
      this.unDraw();
      this.x--;
      this.draw();
    }
  }

  rotate () {
    let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length]
    let kick = 0;

    if (this.collision(0, 0, nextPattern)){
        if(this.x > COLUMN/2){
            //its the right wall 
            kick = -1 //kick piece to the left
        }else{
            kick = 1 //kick piece to the right
            //its the left wall
        }
    }
    if (!this.collision(kick, 0, nextPattern)) {
        this.unDraw();
        this.x += kick;
        this.tetrominoN = (this.tetrominoN + 1)%this.tetromino.length;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.draw();
    }
  }

  lock () {
    for (let r = 0; r < this.activeTetromino.length; r++) {
      for (let c = 0; c < this.activeTetromino.length; c++) {
          // we skip vacant squares
          if (!this.activeTetromino[r][c]) {
              continue;
          }
          if(this.y + r < 0){
              alert("Game Over");
              //stop request animation frame
              gameOver = true;
              break; 
          }
          //we lock the piece
          board[this.y + r][this.x + c] = this.color
      }
  }

  for(let r = 0; r < ROW; r++){
      let isRowFull = true;
      for(let c=0; c < COLUMN; c++){
          isRowFull = isRowFull && (board[r][c] !== VACANT)
      }
      if (isRowFull) {
          for(let y = r; y > 1; y--){
              for (let c = 0; c < COLUMN; c++){
                  board[y][c] = board[y - 1][c]
              }
          }
          for (let c = 0; c < COLUMN; c++) {
              board[0][c] = VACANT
          }
          // increment the score
          // score += 10;
      }
  }
  //update the board
   Draw.drawBoard(ROW, COLUMN, board);
  }

  collision (x: number, y:number , piece: any) {
    for (let r = 0; r < piece.length; r++) {
      for (let c = 0; c < piece.length; c++) {
          // if the square is empty, skip it
          if(!piece[r][c]){
              continue;
          }
          // coordinate of the piece after the movement
          let newX = this.x + c + x
          let newY = this.y + r + y

          //conditions
          if(newX < 0 || newX >= COLUMN || newY >= ROW){
              return true;
          }
          //skip newY < 0; board[-1] will crash the game
          if(newY < 0){
              continue;
          }
          //check if there is a locked piece  already in play
          if(board[newY][newX] !== VACANT){
              return true;
          }
      }
  }
    return false;
  }
}


function randomPiece(){
  console.log('i have been called ')
  let r = Math.floor(Math.random() * PIECES.length); // returns number between 0 and 6
  return  new Piece(PIECES[r][0], PIECES[r][1] as string);
}

let p = randomPiece();

document.addEventListener("keydown", control);

function control(event: any){
    if(event.keyCode === 37){
        p.moveLeft();
        // dropStart = Date.now()
    }
    else if (event.keyCode === 38){
        p.rotate()
        // dropStart = Date.now()
    }
    else if (event.keyCode === 39){
        p.moveRight();
        // dropStart = Date.now()
    }
    else if (event.keyCode === 40){
        p.moveDown()
    }
}

//control the piece

let dropStart = Date.now()
let gameOver = false;

// drop the piece every 1sec
function drop(){
    let now = Date.now();
    let delta = now - dropStart;
    if(delta > 1000){
        p.moveDown();
        dropStart = Date.now();
    }
    if(!gameOver) {
        // requestAnimationFrame(drop);
    }
}

  drop();

}
