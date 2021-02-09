import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import { ValidationError } from '../exceptions';

const Tetris = {
  create: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined | void> => {
    const schema = Joi.object().keys({
      allowedPlayers: Joi.number().min(2),
      baseScore: Joi.number().min(10),
      winScore: Joi.number().min(200),
      winTime: Joi.number().min(60),
      criteria: Joi.string().valid('SCORE', 'TIME'),
      mode: Joi.string().valid('STRAIGHT') // STRAIGHT' | 'LAST_MAN_STANDING' | 'CHAMPIONSHIP'
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

    const { error } = schema.validate({ ...req.params }, { abortEarly: false });

    if (error) {
      return next(new ValidationError('validation error', error));
    }
    next();
  }
};

export default Tetris;
