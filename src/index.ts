import { NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotEnv from 'dotenv';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { g_appENV } from './configs';
import { g_errorCode } from './constants';
import { injectRequestId, useMorgan } from './middlewares';
import { CustomError, ErrorBuilder, ResponseBuilder } from './services';

dotEnv.config();

const app = express();

// apply middlewares
app.use(cors());
app.use(helmet());
app.use(injectRequestId);
app.use(useMorgan(morgan));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.get('/', (_: Request, res: Response) => {
  return ResponseBuilder.send(res, {
    data: {
      alive: true,
    },
  });
});

app.get('*', (_: Request, res: Response) => {
  return ErrorBuilder.send(res, {
    code: g_errorCode.NOT_FOUND,
  });
});

// error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: CustomError, _: Request, res: Response, __: NextFunction) => {
  return ErrorBuilder.send(res, err.error);
});

app.listen(g_appENV.port, () => {
  // eslint-disable-next-line no-console
  console.log(`[⚡️]: Server is running at ${g_appENV.host}:${g_appENV.port}`);
});
