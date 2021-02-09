import { Tetris as TetrisModel, User, UserDoc, TetrisDoc } from '../../database/model';
import { ResponseDataI, IcreateGame } from '../../interfaces';
import { createRandomTetrimonioes, randomGameCode } from './utils';
import EVENT_TYPES from '../../Events/constant';

import EventEmitter from './../../Events';

const Tetris = {
  createGameSession: async (creatorId:string, body:any, username: string): Promise<ResponseDataI> => {
    try {
      const user = creatorId && await User.findById(creatorId) as UserDoc;

      if (!user && !username) {
        return {
          status: 404,
          message: 'user not found',
          data: user
        };
      }

      const tetriminoes = createRandomTetrimonioes();
      const gameId = randomGameCode();
      const gameSession = await TetrisModel.create({ ...body, tetriminoes, creatorId, gameId }) as TetrisDoc;

      user && user.tetris?.push(gameSession._id);
      user && await user.save();

      const gameData = {
        type: gameSession.type,
        ended: gameSession.ended,
        started: gameSession.started,
        mode: gameSession.mode,
        allowedPlayers: gameSession.allowedPlayers,
        criteria: gameSession.criteria,
        baseScore: gameSession.baseScore,
        winScore: gameSession.winScore,
        winTime: gameSession.winTime,
        tetriminoes: gameSession.tetriminoes,
        creatorId: gameSession.creatorId,
        username: user && user.username ? user.username : username,
        gameId: gameSession.gameId,
        id: gameSession._id
      };
      const gameCreatorUsername: string = user ? user.username : username;

      const createGameData = {
        gameCreatorUsername, gameData
      } as unknown as IcreateGame;

      EventEmitter.emit(EVENT_TYPES.CREATE_GAME_DATA, createGameData);

      return {
        status: 200,
        message: 'success',
        data: gameData
      };
    } catch (error) {
      return {
        status: 500,
        message: 'an Error must have occured'
      };
    };
  },
  getGames: async (params: any) => {
    const limit = params.limit;
    const page = params.page;
    const tetrisData = await TetrisModel.find({}, 'ended started players').limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await TetrisModel.countDocuments();

    return {
      status: 200,
      message: 'success',
      data: {
        tetris: tetrisData,
        total: Math.ceil(count / limit),
        currentPage: page
      }
    };
  }
};

export default Tetris;
