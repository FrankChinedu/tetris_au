import { Request, Response } from 'express';
import Processor from './processor';
import { responseTransform } from '../../utils/responseTransform';

const Tetris = {
  createGameSession: async (req: Request, res: Response): Promise<void | Response> => {
    const body = req.body;
    const userId = req?.user?.id;
    const username = req?.query?.username;
    const response = await Processor.createGameSession(userId as string, body, username as string);
    responseTransform(res, response);
  },

  get: async (req:Request, res:Response): Promise<void | Response> => {
    const page = req.query.page ? req.query.page : 1;
    let limit = req.query.limit ? req.query.limit : 100;
    limit = limit > 100 ? 100 : limit;
    const response = await Processor.getGames({ page, limit });
    responseTransform(res, response);
  }
};

export default Tetris;
