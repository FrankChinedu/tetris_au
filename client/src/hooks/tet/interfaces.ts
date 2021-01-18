export interface IupdatePlayerPos {
  x: number;
  y: number;
  collided?: boolean;
}

export interface IPlayer {
  pos: {
    x: number,
    y: number
  }
  tetromino: Array<[]>;
  // tetromino: any;
  collided: boolean;
}

export interface IUseStage {
  player: IPlayer,
  resetPlayer?: any
}