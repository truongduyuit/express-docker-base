import { g_logENV } from '../../constants';
import log4js from 'log4js';
import log4jsConfig from './log4js';

log4js.configure(log4jsConfig);

export const Logger = (logEnv: g_logENV = g_logENV.console): log4js.Logger => {
  return log4js.getLogger(logEnv);
};
