import { Tetris as TetrisModel } from '../../database/model';
import { ResponseDataI } from '../../interfaces';
import { createRandomTetrimonioes, randomGameCode } from './utils';

const Tetris = {
  createGameSession: async (creatorId:string, body:any): Promise<ResponseDataI> => {
    try {
      const tetriminoes = createRandomTetrimonioes();
      const gameId = randomGameCode();
      const gameSession = await TetrisModel.create({ ...body, tetriminoes, creatorId, gameId });
      return {
        status: 200,
        message: 'success',
        data: gameSession
      };
    } catch (error) {
      return {
        status: 500,
        message: 'an Error must have occured'
      };
    }
  }
};

export default Tetris;
