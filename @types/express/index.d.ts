// eslint-disable-next-line no-unused-vars
declare namespace Express {
  export interface Request {
    justUserName: Boolean | null | undefined;
    user?: {
      id: string;
      username: string,
      email?:string
    };
  }
}
