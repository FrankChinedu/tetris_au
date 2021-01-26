import Joi from 'joi';
import { NextFunction, Response, Request } from 'express';
import { throwIfUndefined } from '../utils';
import { verify } from '../utils/jwt';
import { ValidationError, BaseError } from '../exceptions';

export async function authenticate (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  let { authorization } = req.headers;

  if (req.justUserName) {
    return next();
  }

  const schema = Joi.object()
    .keys({
      authorization: Joi.string()
        .regex(/^Bearer [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
        .required()
        .label('authorization [header]')
    })
    .unknown(true);

  const { error } = schema.validate({ authorization });

  if (error) {
    return next(new ValidationError('validation error', error));
  }

  try {
    authorization = throwIfUndefined(authorization, 'authorization');

    const [, token] = authorization.split('Bearer ');

    let decoded;

    try {
      decoded = await verify(token);
    } catch (error) {
      return next(new ValidationError('validation error', error));
    }

    const user = {
      id: decoded.id,
      username: decoded.username,
      email: decoded?.email
    };

    req.user = user;

    return next();
  } catch (error) {
    return next(new BaseError('Internal Server Error', error));
  }
}

export async function hasOnlyUserName (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> {
  const { authorization } = req.headers;

  const schema = Joi.object()
    .keys({
      authorization: Joi.string()
        .regex(/^Bearer [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
        .required()
        .label('authorization [header]')
    })
    .unknown(true);

  const { error } = schema.validate({ authorization });

  if (!error) {
    return next();
  }

  const nextSchema = Joi.object().keys({
    username: Joi.string().required().min(2).trim().pattern(/^\S*$/)
  });

  const { error: err, value } = nextSchema.validate({ ...req.query }, { abortEarly: false });

  if (err) {
    return next(new ValidationError('validation error', err));
  }

  req.justUserName = true;
  req.query.username = value.username;

  return next();
}
