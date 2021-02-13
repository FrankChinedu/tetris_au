import { LeaderBoard as LeaderBoardModel, LeaderBoardDoc } from '../../database/model';
import { ResponseDataI } from '../../interfaces';

const LeaderBoard = {
  post: async (body:any): Promise<ResponseDataI> => {
    let username = body.username as string;
    let score = body.score as number;
    username = username.toLowerCase();
    score = +score;
    body.username = username;
    console.log('username', username);
    try {
      let leaderBoard = await LeaderBoardModel.findOne({
        username
      }) as LeaderBoardDoc;
      if (leaderBoard) {
        if (score > leaderBoard.score) {
          leaderBoard.score = score;
          leaderBoard = await leaderBoard.save();
        }
      } else {
        body.twitterUrl = `https://twitter.com/${username}`;
        leaderBoard = await LeaderBoardModel.create(body) as LeaderBoardDoc;
      }
      return {
        status: 200,
        message: 'success',
        data: leaderBoard
      };
    } catch (error) {
      console.log('error', error);
      return {
        status: 500,
        message: 'an Error must have occured'
      };
    }
  },

  get: async (params: any): Promise<ResponseDataI> => {
    try {
      const limit = params.limit;
      const page = params.page;
      const aggregateQuery = LeaderBoardModel.aggregate();
      const leaderBoard = await LeaderBoardModel.aggregatePaginate(aggregateQuery,
        { page, limit, sort: { score: 'descending' } }) as LeaderBoardDoc;

      return {
        status: 200,
        message: 'success',
        data: leaderBoard
      };
    } catch (error) {
      return {
        status: 500,
        message: 'an Error must have occured'
      };
    }
  }
};

export default LeaderBoard;
