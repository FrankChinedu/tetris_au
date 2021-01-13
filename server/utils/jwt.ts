import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';

export const sign = async (data: any): Promise<string> => {
  const token = await jwt.sign({ ...data }, JWT_SECRET, { expiresIn: '1h' });
  return token;
};

export const verify = async (token: string): Promise<any> => {
  const val = await jwt.verify(token, JWT_SECRET);
  return val;
};

export const decode = async (token: string): Promise<any> => {
  const val = await jwt.decode(token, { complete: true });
  return val;
};
