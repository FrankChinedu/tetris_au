import { Tetris as TetrisModel, User, UserDoc, TetrisDoc } from '../../database/model';
import { ResponseDataI, IcreateGame } from '../../interfaces';
import { createRandomTetrimonioes, randomGameCode } from './utils';
import EVENT_TYPES from '../../Events/constant';

import EventEmitter from './../../Events';

const Tetris = {
  createGameSession: async (creatorId:string, body:any): Promise<ResponseDataI> => {
    try {
      const user = await User.findById(creatorId) as UserDoc;

      if (!user) {
        return {
          status: 404,
          message: 'user not found',
          data: user
        };
      }

      const tetriminoes = createRandomTetrimonioes();
      const gameId = randomGameCode();
      const gameSession = await TetrisModel.create({ ...body, tetriminoes, creatorId, gameId }) as TetrisDoc;

      user.tetris?.push(gameSession._id);
      await user.save();

      const gameData = {
        type: gameSession.type,
        ended: gameSession.ended,
        mode: gameSession.mode,
        allowedPlayers: gameSession.allowedPlayers,
        criteria: gameSession.criteria,
        baseScore: gameSession.baseScore,
        winScore: gameSession.winScore,
        winTime: gameSession.winTime,
        tetriminoes: gameSession.tetriminoes,
        creatorId: gameSession.creatorId,
        gameId: gameSession.gameId
      };

      const createGameData = {
        creatorId, gameData
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
  }
};

export default Tetris;
