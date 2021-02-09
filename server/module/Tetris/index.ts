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
    let page = +req.params.page;
    let limit = +req.params.limit;
    page = page || 1;
    limit = limit || 20;
    const response = await Processor.getGames({ page, limit });
    responseTransform(res, response);
  }
};

export default Tetris;
