import { g_appENV } from '../../configs';

export default {
  appenders: {
    console: {
      type: 'console',
    },
    file: {
      type: 'dateFile',
      filename: `log/error.log`,
      maxLogSize: 10485760,
      backups: 3,
      compress: true,
    },
  },
  categories: {
    default: {
      appenders: ['console'],
      level: g_appENV.consoleLogLevel,
    },
    file: {
      appenders: ['file', 'console'],
      level: g_appENV.fileLogLevel,
    },
  },
};
