/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseError from './base-error';

export default class ValidationError extends BaseError {
  constructor (message: string, data: any) {
    super(message, data);

    this.name = 'ValidationError';
    this.statusCode = 400;

    if (!message) {
      this.message = 'Validation Errors';
    }

    Error.captureStackTrace(this, this.constructor);
  }
}
