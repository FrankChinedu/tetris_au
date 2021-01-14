import mongoose from 'mongoose';

type GameType = 'TETRIS';
type IGameMode = 'STRAIGHT' | 'LAST_MAN_STANDING' | 'CHAMPIONSHIP';
type ICriteria = 'SCORE' | 'TIME';

interface ITetris {
  gameId: string;
  type: GameType;
  ended: Boolean;
  mode: IGameMode;
  allowedPlayers: number;
  criteria: ICriteria;
  baseScore: number; // score to inscrement by
  winScore: number; // if criteria is score win score is the score to determine who the winner is
  winTime: number; // if criteria is tome win time is time to determine who winner is in seconds
  creatorId?: mongoose.Types.ObjectId;
  tetriminoes: string;
}

export interface TetrisDoc extends mongoose.Document {
  gameId: string;
  type: GameType;
  ended: Boolean;
  mode: IGameMode;
  allowedPlayers: number;
  criteria: ICriteria;
  baseScore: number;
  winScore: number;
  winTime: number;
  creatorId?: mongoose.Types.ObjectId;
  tetriminoes: string;
}

interface tettisModelInterface extends mongoose.Model<TetrisDoc> {
  build(attr: ITetris): TetrisDoc;
}

const tetrisSchema = new mongoose.Schema({
  gameId: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    default: 'TETRIS'
  },
  ended: {
    type: Boolean,
    required: true,
    default: false
  },
  mode: {
    type: String,
    required: true,
    default: 'STRAIGHT'
  },
  allowedPlayers: {
    type: Number,
    required: true,
    default: '2'
  },
  criteria: {
    type: String,
    required: true,
    default: 'SCORE'
  },
  baseScore: {
    type: Number,
    required: true,
    default: 10
  },
  winScore: {
    type: Number,
    required: true,
    default: 200
  },
  winTime: {
    type: Number,
    required: true,
    default: 60 // in seconds
  },
  creatorId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  tetriminoes: {
    type: String,
    required: true
  }
});

tetrisSchema.statics.build = (attr: ITetris) => {
  return new Tetris(attr);
};

const Tetris = mongoose.model<TetrisDoc, tettisModelInterface>('Tetris', tetrisSchema);

export { Tetris };
