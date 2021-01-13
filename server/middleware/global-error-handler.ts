import { Request, Response, NextFunction } from 'express';

import { ResponseDataI } from '../interfaces';
import BaseError from '../exceptions/base-error';
import { responseTransform } from '../utils/responseTransform';

const globalError = {
  handler: function (
    err: BaseError,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ): Response | void {
    let data: ResponseDataI;
    if (err instanceof BaseError) {
      data = {
        status: err.statusCode,
        error: err?.data?.toString(),
        message: err.name,
        data: err.data?.error || err.data
      };
    } else {
      data = {
        status: 500,
        error: 'Internal server Error',
        message: 'An Error must have Occured'
      };
    }

    responseTransform(res, data);
    next();
  }
};

export default globalError;
