import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import { ValidationError } from '../exceptions';

const leaderBoard = {
  post: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined | void> => {
    const schema = Joi.object().keys({
      username: Joi.string().required().min(2),
      score: Joi.number().required()
    });

    const { error, value } = schema.validate({ ...req.body }, { abortEarly: false });

    if (error) {
      return next(new ValidationError('validation error', error));
    }
    req.body = value;
    next();
  },

  get: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined | void> => {
    const schema = Joi.object().keys({
      page: Joi.number().min(1).optional(),
      limit: Joi.number().min(1).optional()
    });

    const { error } = schema.validate({ ...req.query }, { abortEarly: false });

    if (error) {
      return next(new ValidationError('validation error', error));
    }
    next();
  }
};

export default leaderBoard;
