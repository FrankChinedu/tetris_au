// eslint-disable-next-line no-unused-vars
declare namespace Express {
  export interface Request {
    justUserName: Boolean | null | undefined;
    session: any;
    user?: {
      id: string;
      username: string,
      email?:string
    };
  }
}
declare module 'login-with-twitter';
