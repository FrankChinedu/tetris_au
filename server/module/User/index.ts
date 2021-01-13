import { Request, Response } from 'express';
import UserProcessor from './processor';
import { responseTransform } from '../../utils/responseTransform';
import { sign } from '../../utils/jwt';

const User = {
  signup: async (req: Request, res: Response): Promise<void | Response> => {
    const body = req.body;
    const response = await UserProcessor.signup(body);
    let token: string;
    if (response.data) {
      token = await sign(response.data);
      response.data.token = token;
    }
    responseTransform(res, response);
  },
  login: async (req: Request, res: Response): Promise<void | Response> => {
    const body = req.body;
    const response = await UserProcessor.login(body);
    let token: string;
    if (response.data) {
      token = await sign(response.data);
      response.data.token = token;
    }

    responseTransform(res, response);
  }
};

export default User;
