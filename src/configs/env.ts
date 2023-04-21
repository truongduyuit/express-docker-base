import { g_logENV, g_logLevel } from './../constants/logger';
import dotenv from 'dotenv';
dotenv.config();

export const g_appENV = {
  port: process.env.PORT || 1999,
  host: process.env.HOST || 'http:localhost',

  consoleLogLevel: process.env.LOG_LEVEL || g_logLevel.all,
  fileLogLevel: process.env.LOG_LEVEL || g_logLevel.trace,
  logRes: process.env.LOG_RESPONSE_ENV || g_logENV.console,
  logError: process.env.LOG_ERROR_ENV || g_logENV.file,

  mongodbUri: process.env.MONGO_CONNECTION_STRING || '',
  mongoUser: process.env.MONGO_USER,
  mongoPassword: process.env.MONGO_PASSWORD,
};
