import { Request } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useMorgan = (morgan: any) => {
  morgan.token('reqId', (req: Request) => `${req.headers['reqId']}: `);
  return morgan(':reqId :method :url :status :res[content-length] - :response-time ms');
};
