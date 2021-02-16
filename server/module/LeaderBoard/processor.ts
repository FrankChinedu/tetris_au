import { LeaderBoard as LeaderBoardModel, LeaderBoardDoc } from '../../database/model';
import { ResponseDataI } from '../../interfaces';

const LeaderBoard = {
  post: async (body:any): Promise<ResponseDataI> => {
    let username = body.username as string;
    let score = body.score as number;
    username = username.toLowerCase();
    score = +score;
    body.username = username;
    try {
      let leaderBoard = await LeaderBoardModel.findOne({
        username
      }) as LeaderBoardDoc;
      if (leaderBoard) {
        if (score > leaderBoard.score) {
          leaderBoard.score = score;
          leaderBoard.totalGamesPlayed += 1;
          leaderBoard = await leaderBoard.save();
        } else {
          leaderBoard.totalGamesPlayed += 1;
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
      const limit = +params.limit;
      const page = +params.page;
      const username = params.username;

      const aggregateQuery = await LeaderBoardModel.aggregate([
        {
          $sort: {
            score: -1
          }
        },
        {
          $facet: {
            data: [
              {
                $skip: (page * limit)
              },
              {
                $limit: limit
              }
            ],
            rank: [
              {
                $group: {
                  _id: null,
                  elements: {
                    $push: '$username'
                  }
                }
              },
              {
                $project: {
                  index: {
                    $indexOfArray: [
                      '$elements',
                      username
                    ]
                  }
                }
              }
            ]
          }
        }
      ]) as any;

      const leaderBoard = await LeaderBoardModel.aggregatePaginate(LeaderBoardModel.aggregate(), {
        page: page + 1, limit
      }) as LeaderBoardDoc;

      const docs = aggregateQuery.length ? aggregateQuery[0].data : [];
      const rank = aggregateQuery.length ? aggregateQuery[0].rank[0] : null;
      leaderBoard.docs = docs;
      leaderBoard.rank = null;

      if (rank && rank.index >= 0) {
        let user = await LeaderBoardModel.findOne({ username }) as any;
        user = user.toObject();
        user.rank = rank.index + 1;
        leaderBoard.rank = user;
      }

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
