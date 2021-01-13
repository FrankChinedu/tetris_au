import { Request, Response } from 'express';
import Processor from './processor';
import { responseTransform } from '../../utils/responseTransform';

const Tetris = {
  createGameSession: async (req: Request, res: Response): Promise<void | Response> => {
    const body = req.body;
    const userId = req?.user && req?.user.id;
    const response = await Processor.createGameSession(userId as string, body);
    responseTransform(res, response);
  }
};

export default Tetris;
