import { Request, Response } from 'express';
import Processor from './processor';
import { responseTransform } from '../../utils/responseTransform';

const LeaderBoard = {
  post: async (req: Request, res: Response): Promise<void | Response> => {
    const body = req.body;
    const response = await Processor.post(body);
    responseTransform(res, response);
  },

  get: async (req:Request, res:Response): Promise<void | Response> => {
    const page = req.query.page ? req.query.page : 1;
    let limit = req.query.limit ? req.query.limit : 100;
    limit = limit > 100 ? 100 : limit;
    const response = await Processor.get({ page, limit });
    responseTransform(res, response);
  }
};

export default LeaderBoard;
