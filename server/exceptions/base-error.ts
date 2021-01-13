export default class BaseError extends Error {
  public statusCode;
  public data;
  public message;

  constructor (
    message: string,
    data?: any
  ) {
    super();

    this.name = 'BaseError';
    this.message = message;
    this.statusCode = 500;
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }
}
