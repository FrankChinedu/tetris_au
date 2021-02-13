import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

interface ILeaderBoard {
  username: string;
  score: number,
  twitterUrl: string,
}

export interface LeaderBoardDoc extends mongoose.Document {
  username: string;
  score: number;
  twitterUrl: string;
}

interface Pagainate {
    aggregatePaginate: (...params: any) => any
}

interface leaderBoardModelInterface extends mongoose.Model<LeaderBoardDoc>, Pagainate {
  build(attr: ILeaderBoard): LeaderBoardDoc;
}

const leaderBoardSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  twitterUrl: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
}, { timestamps: true });

leaderBoardSchema.statics.build = (attr: ILeaderBoard) => {
  return new LeaderBoard(attr);
};

leaderBoardSchema.plugin(aggregatePaginate);

const LeaderBoard = mongoose.model<LeaderBoardDoc, leaderBoardModelInterface>('LeaderBoard', leaderBoardSchema);

export { LeaderBoard };