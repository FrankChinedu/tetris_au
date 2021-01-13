import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import { ValidationError } from '../exceptions';

const user = {
  create: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined | void> => {
    const schema = Joi.object().keys({
      username: Joi.string().required().min(3),
      email: Joi.string().email(),
      password: Joi.string().min(6).required(),
      confirm: Joi.ref('password')
    });

    const { error, value } = schema.validate({ ...req.body }, { abortEarly: false });

    if (error) {
      return next(new ValidationError('validation error', error));
    }
    req.body = value;
    next();
  },
  login: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined | void> => {
    const schema = Joi.object().keys({
      username: Joi.string().required().min(3),
      password: Joi.string().min(6).required()
    });

    const { error, value } = schema.validate({ ...req.body }, { abortEarly: false });

    if (error) {
      return next(new ValidationError('validation error', error));
    }
    req.body = value;
    next();
  }
};

export default user;
