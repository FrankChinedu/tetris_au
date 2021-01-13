/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ResponseDataI {
  status: number;
  message: string | null;
  error?: any;
  data?: any;
}
