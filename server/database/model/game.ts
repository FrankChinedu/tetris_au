import mongoose from 'mongoose';

type GameType = 'TETRIS';

interface IGame {
  gameId: string;
  type: GameType;
}

export interface GameDoc extends mongoose.Document {
  gameId: string;
  type: GameType;
}

interface gameModelInterface extends mongoose.Model<GameDoc> {
  build(attr: IGame): GameDoc;
}

const gamesSchema = new mongoose.Schema({
  gameId: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  }
});

gamesSchema.statics.build = (attr: IGame) => {
  return new Game(attr);
};

const Game = mongoose.model<GameDoc, gameModelInterface>('User', gamesSchema);

Game.build({
  gameId: 'user ip',
  type: 'TETRIS'
});

export { Game };
