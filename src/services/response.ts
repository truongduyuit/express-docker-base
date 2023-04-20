import { g_appENV } from './../configs/env';
import { Response } from 'express';
import { g_httpStatus, g_logENV } from '../constants';
import { IData, IError } from '../interfaces';
import { Logger } from './logger';

export class CustomError extends Error {
  error: IError;

  constructor(error: IError) {
    super();

    this.error = error;
  }
}

export class ResponseBuilder {
  static send(res: Response, data: IData) {
    Logger().info(data);
    return res.status(g_httpStatus.Ok).json(data);
  }
}

export class ErrorBuilder {
  static send(res: Response, error: IError) {
    Logger(g_appENV.logError as g_logENV).error(res.req.url, error);
    return res.status(g_httpStatus.Ok).json(error);
  }
}
