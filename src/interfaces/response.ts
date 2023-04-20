import { g_errorCode, g_httpStatus } from '../constants';

export interface IError {
  code: g_errorCode;
  message?: string;
  status?: g_httpStatus;
}

export interface IData {
  data: any;
  message?: string;
  status?: g_httpStatus;
}
