import { Request, Response } from 'express';
import { responseTransform } from '../../utils/responseTransform';

const Twitter = {
  log: async (req: Request, res: Response): Promise<void | Response> => {
    responseTransform(res, {} as any);
  }
};

export default Twitter;
