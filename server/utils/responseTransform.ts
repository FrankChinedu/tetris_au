import { Response } from 'express';
import { ResponseDataI } from '../interfaces';

export const responseTransform = (
  res: Response,
  data: ResponseDataI
): Response | void => {
  const jsonData = {
    statusCode: data.status,
    responseText: data.message,
    error: data.error,
    data: data.data
  };
  if (data.error === null) delete jsonData.error;

  return res.status(data.status).json(jsonData);
};
